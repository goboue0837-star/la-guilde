window.G = window.G || {};
G.req = {};

/* rang maximal des requêtes reçues selon la réputation */
G.req.rangMax = function(){
  var r = G.etat.reputation;
  if (r < 25)  return 1;
  if (r < 60)  return 2;
  if (r < 120) return 3;
  if (r < 240) return 4;
  if (r < 420) return 5;
  if (r < 700) return 6;
  return 7;
};

G.req.generer = function(){
  var max = G.req.rangMax();
  var modeles = G.MODELES.filter(function(m){ return m.min <= max; });
  var mod = G.pick(modeles);
  var rang = G.rndi(mod.min, Math.min(mod.max, max));
  var modif = G.pick(["-", "", "", "+"]);

  var seuil = G.SEUILS[rang] * G.MODIF[modif];
  /* le client propose un prix approximatif, souvent mal calibré */
  var juste = Math.round(seuil * 2.4 + 12);
  var biais = G.rnd(0.55, 1.35);
  var offre = Math.max(6, Math.round(juste * biais));

  var duree = G.DUREE[rang] * G.rnd(0.85, 1.2);
  var trajet = G.rnd(0.1, 1) * (1 + rang * 0.55);

  return {
    id: G.uid("q"),
    titre: mod.titre,
    txt: mod.txt,
    client: mod.client,
    nature: mod.nature,
    rangReel: rang,
    modifReel: modif,
    rangJoueur: null,
    modifJoueur: null,
    offre: offre,
    partMembres: 0.6,
    duree: duree,
    trajet: trajet,
    arrivee: G.etat.jour,
    delai: G.etat.jour + G.rnd(2, 6) + rang * 0.7,
    enquete: null,          // résultat d'un éclaireur envoyé en reconnaissance
    etat: "requete",
    equipe: [],
    pourri: 0
  };
};

/* indice donné par la réceptionniste */
G.req.indice = function(q){
  if (!G.aEmploye("receptionniste")) return null;
  var juste = G.SEUILS[q.rangReel] * G.MODIF[q.modifReel] * 2.4 + 12;
  var ratio = q.offre / juste;
  if (ratio < 0.72) return "mal payé";
  if (ratio > 1.25) return "généreux";
  return "correct";
};

/* estimation floue du rang, affichée au joueur */
G.req.estimation = function(q){
  if (q.enquete) return q.enquete;
  var flou = G.aEmploye("receptionniste") ? 1 : 2;
  var bas = G.clamp(q.rangReel - flou, 0, 7);
  var haut = G.clamp(q.rangReel + flou, 0, 7);
  return { bas: bas, haut: haut, precis: false };
};

/* envoyer un éclaireur en reconnaissance */
G.req.enqueter = function(q, membreId){
  var m = G.membre(membreId);
  if (!m) return "Membre introuvable.";
  if (m.enMission || m.blessure) return "Ce membre n'est pas disponible.";
  var cout = 10 + q.rangReel * 8;
  if (G.etat.or < cout) return "Il manque " + G.fmtOr(cout - G.etat.or) + ".";
  G.etat.or -= cout; G.etat.stats.orDepense += cout;

  var qualite = (m.classe === "Éclaireur" ? 1.6 : m.classe === "Voleur" ? 1.15 : 0.7)
              * (0.45 + m.niveau / 40);
  m.enMission = "enquete:" + q.id;
  m.retourEnquete = G.etat.jour + q.trajet * 1.4;
  m.enqueteCible = q.id;
  m.enqueteQualite = qualite;
  G.log("🔍 " + m.nom + " part enquêter sur « " + q.titre + " ».", "info");
  return null;
};

G.req.resoudreEnquete = function(m){
  var q = G.etat.requetes.filter(function(x){ return x.id === m.enqueteCible; })[0]
       || G.etat.missions.filter(function(x){ return x.id === m.enqueteCible; })[0];
  m.enMission = null; m.retourEnquete = null;
  var cible = m.enqueteCible; m.enqueteCible = null;
  if (!q){ G.log("🔍 " + m.nom + " revient : le contrat n'existe plus.", "info"); return; }

  var qual = m.enqueteQualite || 0.7;
  if (qual >= 1.4 || Math.random() < qual * 0.45){
    q.enquete = { bas: q.rangReel, haut: q.rangReel, precis: true, nature: q.nature };
    G.log("🔍 " + m.nom + " rapporte : « " + q.titre + " » est du rang " + G.RANGS[q.rangReel] + q.modifReel + ".", "ok");
  } else {
    var marge = qual > 1 ? 1 : 2;
    q.enquete = { bas: G.clamp(q.rangReel - G.rndi(0,marge), 0, 7),
                  haut: G.clamp(q.rangReel + G.rndi(0,marge), 0, 7), precis: false };
    G.log("🔍 " + m.nom + " revient avec des informations partielles sur « " + q.titre + " ».", "info");
  }
  G.mem.gagnerXp(m, 8 + q.rangReel * 4);
};

/* accepter une requête : elle devient une mission au tableau */
G.req.accepter = function(q, rangJoueur, modifJoueur, partMembres){
  if (G.etat.missions.filter(function(m){ return m.etat === "tableau"; }).length >= G.capaciteTableau())
    return "Votre table des missions est pleine.";
  q.rangJoueur = rangJoueur;
  q.modifJoueur = modifJoueur;
  q.partMembres = partMembres;
  q.etat = "tableau";
  q.jourAffichage = G.etat.jour;
  G.etat.requetes = G.etat.requetes.filter(function(x){ return x.id !== q.id; });
  G.etat.missions.push(q);
  G.etat.reputation += 1;
  G.log("📋 Contrat accepté : « " + q.titre + " », gradé " + G.RANGS[rangJoueur] + modifJoueur + ".", "info");
  return null;
};

G.req.refuser = function(q){
  G.etat.requetes = G.etat.requetes.filter(function(x){ return x.id !== q.id; });
  G.etat.reputation = Math.max(0, G.etat.reputation - 0.5);
  G.log("✖️ Requête refusée : « " + q.titre + " ».", "info");
};

/* pourrissement : les requêtes non traitées empirent ou partent */
G.req.tick = function(dt){
  var partis = [];
  G.etat.requetes.forEach(function(q){
    if (G.etat.jour > q.delai){
      if (Math.random() < 0.35 * dt){
        partis.push(q);
      } else if (Math.random() < 0.20 * dt && q.rangReel < 7){
        q.rangReel += 1;
        q.pourri += 1;
        q.duree *= 1.15;
        G.log("⚠️ La situation empire : « " + q.titre + " » est devenue plus dangereuse.", "mauvais");
      }
    }
  });
  partis.forEach(function(q){
    G.etat.requetes = G.etat.requetes.filter(function(x){ return x.id !== q.id; });
    G.etat.reputation = Math.max(0, G.etat.reputation - 1.5);
    G.log("⌛ Plus personne au comptoir pour « " + q.titre + " » : le client est allé voir ailleurs.", "mauvais");
  });
};
