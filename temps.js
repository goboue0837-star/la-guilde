window.G = window.G || {};
G.temps = {};

G.temps.VITESSES = [0, 1, 3];      // pause, accéléré 1, accéléré 2
G.temps.JOURS_PAR_SEC = 0.18;      // vitesse 1 : ~5,5 s de temps réel par jour de jeu

G.temps.avancer = function(dtReel){
  var v = G.temps.VITESSES[G.etat.vitesse] || 0;
  if (!v) return 0;
  var dt = dtReel * G.temps.JOURS_PAR_SEC * v;
  var avant = Math.floor(G.etat.jour);
  G.etat.jour += dt;
  var apres = Math.floor(G.etat.jour);

  /* systèmes continus */
  G.req.tick(dt);
  G.rec.tick(dt);
  G.com.tick(dt);
  G.com.tickVitrine(dt);
  G.mis.tick();

  /* retours d'enquête */
  G.etat.membres.forEach(function(m){
    if (m.retourEnquete && G.etat.jour >= m.retourEnquete) G.req.resoudreEnquete(m);
  });

  /* arrivée de requêtes */
  var tauxReq = 0.55 + G.salle("bureau") * 0.35 + (G.aEmploye("receptionniste") ? 0.6 : 0);
  tauxReq *= (0.55 + Math.min(2, G.etat.reputation / 130));
  if (Math.random() < tauxReq * dt && G.etat.requetes.length < 9){
    var q = G.req.generer();
    G.etat.requetes.push(q);
    G.log("🔔 " + q.client.charAt(0).toUpperCase() + q.client.slice(1) + " se présente : « " + q.titre + " ».", "client");
    G.pauseSi("client", "Un client se présente.");
  }

  /* passage de jour */
  for (var j = avant; j < apres; j++){
    G.mem.tickJour();
    if (G.etat.jour >= G.etat.prochainePaie) G.emp.paie();
  }
  return dt;
};
