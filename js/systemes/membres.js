window.G = window.G || {};
G.mem = {};

G.mem.nomAleatoire = function(){
  return G.pick(G.PRENOMS) + " " + G.pick(G.NOMS);
};

G.mem.creer = function(niveau, classe){
  var cls = classe || G.pick(Object.keys(G.CLASSES));
  var m = {
    id: G.uid("m"),
    nom: G.mem.nomAleatoire(),
    classe: cls,
    niveau: niveau,
    xp: 0,
    rang: -1,                 // -1 = non gradé, le joueur doit le promouvoir
    moral: G.rndi(62, 88),
    blessure: null,
    enMission: null,
    arme: null, armure: null,
    ameliorationArme: 0, ameliorationArmure: 0,
    coequipiers: {},
    histo: { missions:0, reussites:0, echecs:0 },
    jourArrivee: G.etat.jour,
    joursSansMission: 0,
    evalue: false             // le joueur a-t-il vu son niveau réel ?
  };
  /* chacun arrive avec son propre matériel de fortune */
  var tierDep = G.clamp(G.mem.rangAttendu(niveau) - 1, 0, 7) + 1;
  var armes = G.equip.armesDe(cls, tierDep).filter(function(a){ return a.nivMin <= niveau; });
  var armures = G.equip.armuresDe(cls, tierDep).filter(function(a){ return a.nivMin <= niveau; });
  if (armes.length)   m.arme   = armes[armes.length - 1].id;
  if (armures.length) m.armure = armures[armures.length - 1].id;
  return m;
};

/* rang typique attendu pour un niveau donné — repère pour le joueur */
G.mem.rangAttendu = function(niv){
  for (var i = G.NIVT.length - 1; i >= 0; i--){
    if (niv >= G.NIVT[i]) return i;
  }
  return 0;
};

/* accès autorisé : mission de rang R accessible à partir du rang R-1 */
G.mem.peutPartir = function(m, mission){
  if (m.rang < 0) return false;
  return m.rang >= mission.rangJoueur - 1;
};

G.mem.promouvoir = function(m){
  if (m.rang >= 7) return "Déjà au rang S.";
  m.rang += 1;
  m.moral = G.clamp(m.moral + 14, 0, 100);
  G.log("⬆️ " + m.nom + " est promu au rang " + G.RANGS[m.rang] + ".", "ok");
  return null;
};

G.mem.retrograder = function(m){
  if (m.rang <= -1) return "Déjà sans rang.";
  m.rang -= 1;
  m.moral = G.clamp(m.moral - 22, 0, 100);
  G.log("⬇️ " + m.nom + " est rétrogradé.", "mauvais");
  return null;
};

G.mem.gagnerXp = function(m, gain){
  m.xp += gain;
  var monte = 0;
  while (m.xp >= G.calc.xpRequis(m.niveau + 1) && m.niveau < 100){
    m.xp -= G.calc.xpRequis(m.niveau + 1);
    m.niveau += 1;
    monte++;
  }
  if (monte > 0){
    G.log("✨ " + m.nom + " atteint le niveau " + m.niveau + ".", "ok");
    m.evalue = true;
  }
  return monte;
};

G.mem.blesser = function(m, gravite){
  var jours = { legere: G.rnd(1.5, 4), grave: G.rnd(7, 18), critique: G.rnd(20, 40) }[gravite];
  var armure = G.equip.armure(m);
  if (armure) jours *= (1 - Math.min(0.45, armure.END / 70));
  if (G.aEmploye("docteur")) jours *= 0.55;
  if (G.salle("infirmerie")) jours *= (1 - 0.12 * G.salle("infirmerie"));
  m.blessure = { gravite: gravite, fin: G.etat.jour + jours };
  m.moral = G.clamp(m.moral - (gravite === "legere" ? 5 : gravite === "grave" ? 14 : 26), 0, 100);
};

G.mem.tuer = function(m, mission){
  G.etat.membres = G.etat.membres.filter(function(x){ return x.id !== m.id; });
  G.etat.stats.morts++;
  G.etat.reputation = Math.max(0, G.etat.reputation - 4);
  G.log("💀 " + m.nom + " (" + m.classe + ", niv. " + m.niveau + ") n'est pas revenu de « " + mission.titre + " ».", "mort");
  /* choc pour les coéquipiers proches */
  G.etat.membres.forEach(function(autre){
    var lien = m.coequipiers[autre.id] || 0;
    if (lien > 0){
      var choc = Math.min(38, 6 + lien * 3);
      autre.moral = G.clamp(autre.moral - choc, 0, 100);
      if (lien >= 5 && Math.random() < 0.18){
        G.log("😔 " + autre.nom + " ne s'en remet pas et quitte la guilde.", "mauvais");
        G.etat.membres = G.etat.membres.filter(function(x){ return x.id !== autre.id; });
      }
    }
  });
  G.pauseSi("mort", m.nom + " est mort.");
};

/* tick quotidien sur les membres */
G.mem.tickJour = function(){
  var partants = [];
  G.etat.membres.forEach(function(m){
    if (m.blessure && G.etat.jour >= m.blessure.fin){
      G.log("🩹 " + m.nom + " est rétabli.", "info");
      m.blessure = null;
    }
    if (!m.enMission && !m.blessure){
      m.joursSansMission += 1;
      if (m.joursSansMission > 6) m.moral = G.clamp(m.moral - 1.6, 0, 100);
    }
    /* confort et entraînement */
    if (G.salle("dortoir")) m.moral = G.clamp(m.moral + 0.35 * G.salle("dortoir"), 0, 100);
    if (G.salle("taverne")) m.moral = G.clamp(m.moral + 0.3 * G.salle("taverne"), 0, 100);
    if (G.aEmploye("instructeur") && !m.enMission && !m.blessure && m.niveau < 45){
      G.mem.gagnerXp(m, G.calc.xpRequis(m.niveau + 1) * 0.022 * G.salle("entrainement"));
    }
    /* départ pour moral au plancher */
    if (m.moral <= 6 && !m.enMission && Math.random() < 0.22) partants.push(m);
  });
  partants.forEach(function(m){
    G.log("🚪 " + m.nom + " quitte la guilde, faute de travail et de considération.", "mauvais");
    G.etat.membres = G.etat.membres.filter(function(x){ return x.id !== m.id; });
    G.etat.reputation = Math.max(0, G.etat.reputation - 2);
  });
};
