window.G = window.G || {};
G.com = {};

/* prix du marché : fluctue selon l'offre récente */
G.com.prix = function(nomButin){
  var b = G.BUTINS.filter(function(x){ return x.nom === nomButin; })[0];
  if (!b) return 10;
  var mult = G.etat.marche[nomButin];
  if (mult === undefined){ mult = 1; G.etat.marche[nomButin] = 1; }
  return Math.max(2, Math.round(b.base * mult));
};

G.com.saturer = function(nomButin, qte){
  var m = G.etat.marche[nomButin] || 1;
  G.etat.marche[nomButin] = Math.max(0.35, m - 0.045 * qte);
};

G.com.tick = function(dt){
  for (var k in G.etat.marche){
    var m = G.etat.marche[k];
    m += (1 - m) * 0.06 * dt + G.rnd(-0.02, 0.02) * dt;
    G.etat.marche[k] = G.clamp(m, 0.35, 1.9);
  }
};

/* valeur réelle d'un objet, connue ou non */
G.com.valeur = function(obj){
  var p = G.com.prix(obj.nom);
  if (obj.cat === "curio" && !G.aEmploye("estimateur") && !obj.estime){
    return null;  // valeur inconnue
  }
  return p;
};

/* rachat du butin d'une mission : le joueur propose un prix */
G.com.racheter = function(mission, offreParUnite){
  var butin = mission.butinAttente || [];
  if (!butin.length) return "Rien à racheter.";
  var total = 0, refus = [];
  butin.forEach(function(o){
    var marche = G.com.prix(o.nom);
    var offre = Math.round(marche * offreParUnite);
    var cout = offre * o.qte;
    /* l'aventurier accepte si l'offre est décente, ou s'il est désespéré */
    var seuilAccept = G.rnd(0.42, 0.66);
    if (offreParUnite >= seuilAccept){
      if (G.etat.or >= cout){
        G.etat.or -= cout; G.etat.stats.orDepense += cout;
        total += cout;
        G.com.ajouterStock(o.nom, o.cat, o.qte, offre);
      } else refus.push(o.nom + " (pas assez d'or)");
    } else refus.push(o.nom);
  });
  /* moral : lowballer se paie */
  var eq = G.mis.equipe(mission);
  var delta = offreParUnite < 0.5 ? -7 : offreParUnite < 0.65 ? -2 : offreParUnite > 0.85 ? 5 : 2;
  G.etat.membres.forEach(function(m){
    if (mission.equipe.indexOf(m.id) >= 0) m.moral = G.clamp(m.moral + delta, 0, 100);
  });
  mission.butinAttente = null;
  if (total) G.log("💰 Butin racheté pour " + G.fmtOr(total) + ".", "info");
  if (refus.length) G.log("🙅 Refusé de vendre : " + refus.join(", ") + ".", "info");
  return null;
};

G.com.ajouterStock = function(nom, cat, qte, achat){
  if (G.com.qteStock() + qte > G.capaciteStock()){
    G.log("📦 Entrepôt plein, une partie du butin est perdue.", "mauvais");
    qte = Math.max(0, G.capaciteStock() - G.com.qteStock());
    if (!qte) return;
  }
  var ex = G.etat.stock.filter(function(o){ return o.nom === nom; })[0];
  if (ex){ ex.qte += qte; ex.achat = Math.round((ex.achat + achat)/2); }
  else G.etat.stock.push({ id:G.uid("o"), nom:nom, cat:cat, qte:qte, achat:achat, estime:false });
  G.com.saturer(nom, qte);
};

G.com.qteStock = function(){
  return G.etat.stock.reduce(function(s,o){ return s + o.qte; }, 0);
};

G.com.estimer = function(obj){
  var cout = 8;
  if (G.etat.or < cout) return "Pas assez d'or.";
  G.etat.or -= cout;
  obj.estime = true;
  return null;
};

/* revente */
G.com.vendreMarchand = function(obj, qte){
  qte = Math.min(qte, obj.qte);
  var p = Math.round(G.com.prix(obj.nom) * 0.78);
  var gain = p * qte;
  G.etat.or += gain; G.etat.stats.orGagne += gain;
  obj.qte -= qte;
  G.etat.stock = G.etat.stock.filter(function(o){ return o.qte > 0; });
  G.com.saturer(obj.nom, qte);
  G.log("🏪 Vendu " + qte + " × " + obj.nom + " au marchand pour " + G.fmtOr(gain) + ".", "info");
  return null;
};

G.com.vendreBoutique = function(obj, qte){
  if (!G.salle("boutique")) return "Vous n'avez pas de boutique.";
  qte = Math.min(qte, obj.qte);
  var p = Math.round(G.com.prix(obj.nom) * (1.25 + 0.12 * G.salle("boutique")));
  /* la vente prend du temps : on met en vitrine */
  obj.qte -= qte;
  G.etat.stock = G.etat.stock.filter(function(o){ return o.qte > 0; });
  G.etat.vitrine = G.etat.vitrine || [];
  G.etat.vitrine.push({ id:G.uid("v"), nom:obj.nom, qte:qte, prix:p, pose:G.etat.jour });
  G.log("🪧 " + qte + " × " + obj.nom + " mis en vitrine à " + G.fmtOr(p) + " l'unité.", "info");
  return null;
};

G.com.tickVitrine = function(dt){
  if (!G.etat.vitrine) return;
  var vendus = [];
  G.etat.vitrine.forEach(function(v){
    var chance = 0.28 * dt * (G.aEmploye("vendeur") ? 2.1 : 1) * (0.6 + G.etat.reputation/300);
    if (Math.random() < chance){
      var n = Math.min(v.qte, G.rndi(1, 2));
      var gain = n * v.prix;
      G.etat.or += gain; G.etat.stats.orGagne += gain;
      v.qte -= n;
      G.log("🪙 Vendu " + n + " × " + v.nom + " en boutique (" + G.fmtOr(gain) + ").", "ok");
      if (v.qte <= 0) vendus.push(v.id);
    }
  });
  G.etat.vitrine = G.etat.vitrine.filter(function(v){ return vendus.indexOf(v.id) < 0; });
};
