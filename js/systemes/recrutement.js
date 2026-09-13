window.G = window.G || {};
G.rec = {};

G.rec.VANTARDISES = [
 "J'ai servi six ans dans la garde de Vareth.",
 "J'ai tué un ours à mains nues. Deux témoins.",
 "On m'a formé au monastère du col. Je n'en dirai pas plus.",
 "J'ai fait trois campagnes. Vous ne trouverez pas mieux.",
 "Je viens d'une guilde qui a fermé. Ce n'était pas ma faute.",
 "Je sais me battre. C'est tout ce que je sais faire.",
 "Mon père était aventurier. Ça compte, non ?",
 "J'ai besoin de travail. Je ne poserai pas de questions.",
 "Je suis meilleur que j'en ai l'air.",
 "Je cherche un endroit où on ne me demandera pas d'où je viens.",
 "J'ai déjà survécu à pire que ce que vous pouvez imaginer.",
 "Donnez-moi une chance et vous ne le regretterez pas."
];

G.rec.niveauMax = function(){
  var r = G.etat.reputation;
  if (r < 25)  return 6;
  if (r < 60)  return 11;
  if (r < 120) return 17;
  if (r < 240) return 24;
  if (r < 420) return 33;
  if (r < 700) return 44;
  return 58;
};

G.rec.generer = function(){
  var max = G.rec.niveauMax();
  var niv = G.clamp(G.gauss(max * 0.58, max * 0.26, 2, max), 2, 100);
  var c = G.mem.creer(niv);

  /* ce que le candidat prétend : biaisé, parfois mensonger */
  var honnetete = Math.random();
  var facteur;
  if (honnetete < 0.14) facteur = G.rnd(1.6, 2.6);   // menteur
  else if (honnetete < 0.34) facteur = G.rnd(1.15, 1.5);
  else if (honnetete < 0.82) facteur = G.rnd(0.9, 1.15);
  else facteur = G.rnd(0.65, 0.9);                   // modeste

  c.pretendu = G.clamp(Math.round(niv * facteur), 1, 100);
  c.phrase = G.pick(G.rec.VANTARDISES);
  c.honnete = honnetete >= 0.34;
  c.evalue = false;

  /* passé caché */
  c.secret = null;
  var s = Math.random();
  if (s < 0.05) c.secret = "voleur";
  else if (s < 0.08) c.secret = "espion";
  else if (s < 0.11) c.secret = "deserteur";

  c.jourArrivee = G.etat.jour;
  c.expire = G.etat.jour + G.rnd(3, 8);
  return c;
};

/* estimation visible par le joueur */
G.rec.impression = function(c){
  var precis = G.aEmploye("recruteur");
  var ecart = Math.abs(c.pretendu - c.niveau);
  if (precis && ecart > c.niveau * 0.35) return "Ses références ne tiennent pas debout.";
  if (precis && c.secret) return "Quelque chose cloche dans son parcours.";
  if (precis) return "Le parcours semble cohérent.";
  return null;
};

G.rec.recruter = function(c){
  if (G.etat.membres.length >= G.capaciteEffectif())
    return "Votre dortoir ne peut pas loger davantage de monde (" + G.capaciteEffectif() + " places).";
  G.etat.candidats = G.etat.candidats.filter(function(x){ return x.id !== c.id; });
  c.rang = -1;
  G.etat.membres.push(c);
  G.log("🤝 " + c.nom + " (" + c.classe + ") rejoint la guilde.", "ok");
  return null;
};

G.rec.refuser = function(c){
  G.etat.candidats = G.etat.candidats.filter(function(x){ return x.id !== c.id; });
};

G.rec.tick = function(dt){
  G.etat.candidats = G.etat.candidats.filter(function(c){ return G.etat.jour < c.expire; });
  var taux = 0.30 + (G.salle("taverne") * 0.18) + (G.aEmploye("recruteur") ? 0.45 : 0);
  taux *= (0.5 + Math.min(1.6, G.etat.reputation / 160));
  if (Math.random() < taux * dt && G.etat.candidats.length < 8){
    G.etat.candidats.push(G.rec.generer());
  }
  /* méfaits des membres à secret */
  G.etat.membres.forEach(function(m){
    if (m.secret === "voleur" && Math.random() < 0.012 * dt){
      var vol = Math.round(G.etat.or * G.rnd(0.03, 0.09));
      if (vol > 3){
        G.etat.or -= vol;
        G.log("🕵️ Il manque " + G.fmtOr(vol) + " dans la caisse. Personne n'a rien vu.", "mauvais");
      }
    }
  });
};
