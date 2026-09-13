window.G = window.G || {};
G.mis = {};

G.mis.assigner = function(mission, membreId){
  var m = G.membre(membreId);
  if (!m) return "Membre introuvable.";
  if (mission.etat !== "tableau") return "Ce contrat n'est plus au tableau.";
  if (m.enMission) return m.nom + " est déjà occupé.";
  if (m.blessure) return m.nom + " est en convalescence.";
  if (mission.equipe.indexOf(membreId) >= 0) return null;
  if (!G.mem.peutPartir(m, mission))
    return m.nom + " n'a pas le rang requis (il faut au moins " + G.RANGS[Math.max(0, mission.rangJoueur - 1)] + ").";
  if (mission.equipe.length >= 12) return "Équipe au complet.";
  mission.equipe.push(membreId);
  return null;
};

G.mis.retirer = function(mission, membreId){
  mission.equipe = mission.equipe.filter(function(x){ return x !== membreId; });
};

G.mis.equipe = function(mission){
  return mission.equipe.map(function(id){ return G.membre(id); }).filter(Boolean);
};

G.mis.lancer = function(mission){
  var eq = G.mis.equipe(mission);
  if (!eq.length) return "Aucun membre assigné.";
  eq.forEach(function(m){
    m.enMission = mission.id;
    m.joursSansMission = 0;
  });
  mission.etat = "encours";
  mission.jourDepart = G.etat.jour;
  mission.jourRetour = G.etat.jour + mission.duree + mission.trajet * 2;
  G.log("🚩 " + eq.length + " membre(s) partent pour « " + mission.titre + " » (retour vers J" +
        (Math.floor(mission.jourRetour) + 1) + ").", "info");
  G.pauseSi("depart", "Départ en mission.");
  return null;
};

/* les membres se portent volontaires tout seuls */
G.mis.volontaires = function(mission){
  var cand = G.dispos().filter(function(m){
    return G.mem.peutPartir(m, mission) && mission.equipe.indexOf(m.id) < 0;
  });
  cand.sort(function(a,b){
    var aa = (G.NATURES[mission.nature].aff[a.classe]||1) * (0.5 + a.moral/100) * (1 + a.niveau/50);
    var bb = (G.NATURES[mission.nature].aff[b.classe]||1) * (0.5 + b.moral/100) * (1 + b.niveau/50);
    return bb - aa;
  });
  var cible = G.TAILLE[mission.rangJoueur];
  var n = 0;
  for (var passe=0; passe<2 && mission.equipe.length < cible; passe++){
    for (var i=0;i<cand.length && mission.equipe.length < cible;i++){
      var m = cand[i];
      if (mission.equipe.indexOf(m.id) >= 0) continue;
      var envie = 0.55 + m.moral/150 + (m.joursSansMission > 3 ? 0.35 : 0);
      if (Math.random() < envie){ mission.equipe.push(m.id); n++; }
    }
  }
  return n;
};

/* ---------- Résolution ---------- */
G.mis.resoudre = function(mission){
  var eq = G.mis.equipe(mission);
  var taux = G.calc.reussite(eq, mission);
  var jet = Math.random() * 100;
  var reussi = jet < taux;
  var marge = taux - jet;              // positif = confortable, très négatif = désastre

  var puiss = G.calc.puissance(eq, mission);
  var ratio = puiss / G.calc.seuil(mission);
  var protection = G.calc.protection(eq);

  var rapport = {
    titre: mission.titre, jour: G.etat.jour, reussi: reussi,
    taux: Math.round(taux), ratio: G.round(ratio, 2),
    rangReel: mission.rangReel, modifReel: mission.modifReel,
    rangJoueur: mission.rangJoueur, modifJoueur: mission.modifJoueur,
    partiel: false, or: 0, lignes: [], butin: []
  };

  /* réussite partielle si c'est passé de justesse */
  if (reussi && marge < 8 && Math.random() < 0.45) rapport.partiel = true;

  /* gains */
  if (reussi){
    var gain = mission.offre * (rapport.partiel ? 0.55 : 1);
    var partMembres = gain * mission.partMembres;
    var commission = gain - partMembres;
    if (G.aEmploye("comptable")) commission *= 1.08;
    G.etat.or += commission;
    G.etat.stats.orGagne += commission;
    G.etat.stats.missionsReussies++;
    rapport.or = Math.round(commission);
    rapport.partMembres = Math.round(partMembres);
    var repGain = 3 + mission.rangReel * 2.6;
    if (rapport.partiel) repGain *= 0.4;
    G.etat.reputation += repGain;
    rapport.reputation = G.round(repGain, 1);
    /* moral : la part compte */
    eq.forEach(function(m){
      var juste = mission.partMembres >= 0.55;
      m.moral = G.clamp(m.moral + (juste ? 9 : 2) + (rapport.partiel ? -3 : 3), 0, 100);
      m.histo.reussites++;
    });
    /* butin */
    var nbutin = G.rndi(1, 2 + Math.floor(mission.rangReel / 2));
    for (var b=0;b<nbutin;b++){
      var pool = G.BUTINS.filter(function(x){
        return x.base <= 20 * Math.pow(1.9, mission.rangReel);
      });
      var it = G.pick(pool.length ? pool : G.BUTINS);
      rapport.butin.push({ nom: it.nom, cat: it.cat, base: it.base, qte: G.rndi(1, 3) });
    }
  } else {
    G.etat.stats.missionsEchouees++;
    var repPerte = 0.8 + mission.rangReel * 1.0;
    G.etat.reputation = Math.max(0, G.etat.reputation - repPerte);
    rapport.reputation = -G.round(repPerte, 1);
    eq.forEach(function(m){ m.moral = G.clamp(m.moral - 11, 0, 100); m.histo.echecs++; });
  }

  /* conséquences humaines */
  var severite = 0;
  if (!reussi) severite = G.clamp((-marge) / 45 + 0.35, 0.15, 1.4);
  else if (marge < 5) severite = 0.18;
  severite *= (0.55 + mission.rangReel * 0.12);
  severite *= (1 - protection / 100);

  eq.forEach(function(m){
    m.histo.missions++;
    m.enMission = null;
    /* liens de coéquipiers */
    eq.forEach(function(autre){
      if (autre.id !== m.id) m.coequipiers[autre.id] = (m.coequipiers[autre.id] || 0) + 1;
    });
    /* XP */
    var xp = G.calc.xp(m, mission, reussi);
    var avant = m.niveau;
    G.mem.gagnerXp(m, xp);
    m.evalue = true;

    /* fragilité par classe et par armure */
    var frag = { "Mage":1.5, "Nécromancien":1.45, "Archer":1.3, "Guérisseur":1.25, "Barde":1.2,
                 "Voleur":1.1, "Éclaireur":1.05, "Ingénieur":1.0, "Dompteur":0.95,
                 "Guerrier":0.85, "Porte-bouclier":0.6 }[m.classe] || 1;
    var risque = severite * frag;
    var tirage = Math.random();
    var ligne = { nom: m.nom, classe: m.classe, xp: Math.round(xp),
                  monte: m.niveau > avant ? m.niveau : null, sort: "indemne" };

    if (tirage < risque * 0.09 && mission.rangReel >= 2){
      ligne.sort = "mort";
    } else if (tirage < risque * 0.32){
      ligne.sort = "grave"; G.mem.blesser(m, "grave");
    } else if (tirage < risque * 0.78){
      ligne.sort = "legere"; G.mem.blesser(m, "legere");
    } else if (tirage < risque * 1.1){
      ligne.sort = "fatigue"; m.moral = G.clamp(m.moral - 6, 0, 100);
    }
    rapport.lignes.push(ligne);
  });

  /* application des morts après coup (pour le calcul du choc) */
  rapport.lignes.filter(function(l){ return l.sort === "mort"; }).forEach(function(l){
    var m = G.etat.membres.filter(function(x){ return x.nom === l.nom; })[0];
    if (m) G.mem.tuer(m, mission);
  });

  /* stockage du butin */
  if (rapport.butin.length && G.salle("rachat")){
    rapport.butinEnAttente = true;
    mission.butinAttente = rapport.butin;
  }

  mission.etat = "terminee";
  mission.rapport = rapport;
  mission.jourFin = G.etat.jour;

  var icone = reussi ? (rapport.partiel ? "🟡" : "✅") : "❌";
  G.log(icone + " Retour de « " + mission.titre + " » — " +
        (reussi ? (rapport.partiel ? "réussite partielle" : "réussite") : "échec") +
        " (rang réel " + G.RANGS[mission.rangReel] + mission.modifReel + ").",
        reussi ? "ok" : "mauvais");
  G.pauseSi("retour", "Une équipe est rentrée.");
  return rapport;
};

/* tick : retours de mission */
G.mis.tick = function(){
  G.etat.missions.forEach(function(mi){
    if (mi.etat === "encours" && G.etat.jour >= mi.jourRetour) G.mis.resoudre(mi);
  });
  /* le répartiteur envoie tout seul */
  if (G.aEmploye("repartiteur")){
    G.etat.missions.filter(function(mi){ return mi.etat === "tableau"; }).forEach(function(mi){
      if (mi.equipe.length === 0 && G.etat.jour - (mi.jourAffichage||0) > 0.5){
        G.mis.volontaires(mi);
        if (mi.equipe.length >= Math.max(1, Math.floor(G.TAILLE[mi.rangJoueur] * 0.7))) G.mis.lancer(mi);
      }
    });
  }
  /* le client retire son contrat s'il attend trop longtemps au tableau */
  var retires = [];
  G.etat.missions.forEach(function(mi){
    if (mi.etat === "tableau" && G.etat.jour - (mi.jourAffichage || 0) > 8 + mi.rangReel * 2){
      retires.push(mi);
    }
  });
  retires.forEach(function(mi){
    G.etat.missions = G.etat.missions.filter(function(x){ return x.id !== mi.id; });
    G.etat.reputation = Math.max(0, G.etat.reputation - 2);
    G.log("⌛ Faute d'équipe, le contrat « " + mi.titre + " » est retiré du tableau.", "mauvais");
  });

  /* nettoyage : on ne garde que les rapports récents */
  G.etat.missions = G.etat.missions.filter(function(mi){
    return !(mi.etat === "terminee" && mi.lu && G.etat.jour - mi.jourFin > 3 && !mi.butinAttente);
  });
  var finis = G.etat.missions.filter(function(mi){ return mi.etat === "terminee"; })
              .sort(function(a,b){ return b.jourFin - a.jourFin; });
  if (finis.length > 14){
    var aJeter = finis.slice(14).filter(function(mi){ return !mi.butinAttente; })
                      .map(function(mi){ return mi.id; });
    G.etat.missions = G.etat.missions.filter(function(mi){ return aJeter.indexOf(mi.id) < 0; });
  }
};
