window.G = window.G || {};

G.nouvelEtat = function(){
  return {
    jour: 0,
    vitesse: 0,
    or: 400,
    reputation: 5,
    membres: [],
    candidats: [],
    requetes: [],
    missions: [],
    employes: [],
    salles: { bureau:1, table:1, dortoir:1 },
    stock: [],
    marche: {},
    journal: [],
    prochainePaie: 30,
    stats: { missionsReussies:0, missionsEchouees:0, morts:0, orGagne:0, orDepense:0 },
    autoPause: { retour:true, mort:true, depart:false, paie:true, client:false },
    selection: { mission:null, membre:null, onglet:"tableau" }
  };
};

G.etat = G.nouvelEtat();

/* ---------- accès ---------- */
G.membre   = function(id){ return G.etat.membres.filter(function(m){ return m.id===id; })[0]; };
G.mission  = function(id){ return G.etat.missions.filter(function(m){ return m.id===id; })[0]; };
G.salle    = function(k){ return G.etat.salles[k] || 0; };
G.aEmploye = function(p){ return G.etat.employes.some(function(e){ return e.poste===p; }); };

G.dispos = function(){
  return G.etat.membres.filter(function(m){
    return !m.enMission && !m.blessure;
  });
};

G.capaciteEffectif = function(){ return 4 + G.salle("dortoir") * 4; };
G.capaciteStock    = function(){ return 6 + G.salle("entrepot") * 8 + (G.aEmploye("intendant") ? 6 : 0); };
G.capaciteTableau  = function(){ return 2 + G.salle("table") * 2; };

/* ---------- journal ---------- */
G.log = function(txt, type){
  G.etat.journal.unshift({ jour: G.etat.jour, txt: txt, type: type || "info" });
  if (G.etat.journal.length > 300) G.etat.journal.pop();
};

G.pauseSi = function(cle, raison){
  if (G.etat.autoPause[cle] && G.etat.vitesse > 0){
    G.etat.vitesse = 0;
    G.log("⏸ Temps arrêté — " + raison, "pause");
  }
};

/* ---------- sauvegarde ---------- */
G.CLE_SAVE = "guilde_save_v1";

G.sauvegarder = function(silencieux){
  try {
    var copie = JSON.parse(JSON.stringify(G.etat));
    copie.vitesse = 0;
    localStorage.setItem(G.CLE_SAVE, JSON.stringify(copie));
    if (!silencieux) G.log("Partie sauvegardée.", "ok");
    return true;
  } catch(e){
    if (!silencieux) G.log("Sauvegarde impossible dans ce navigateur.", "mauvais");
    return false;
  }
};

G.charger = function(){
  try {
    var s = localStorage.getItem(G.CLE_SAVE);
    if (!s) return false;
    var d = JSON.parse(s);
    var base = G.nouvelEtat();
    for (var k in d) base[k] = d[k];
    base.vitesse = 0;
    G.etat = base;
    return true;
  } catch(e){ return false; }
};

G.effacerSave = function(){
  try { localStorage.removeItem(G.CLE_SAVE); } catch(e){}
};

G.exporter = function(){
  var blob = new Blob([JSON.stringify(G.etat)], {type:"application/json"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "guilde-sauvegarde.json";
  a.click();
};
