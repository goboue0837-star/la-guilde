window.G = window.G || {};
G.equip = {};

G._idxArme = null; G._idxArmure = null;
G.equip.parId = function(id){
  if (!G._idxArme){
    G._idxArme = {}; G._idxArmure = {};
    G.ARMES.forEach(function(a){ G._idxArme[a.id] = a; });
    G.ARMURES.forEach(function(a){ G._idxArmure[a.id] = a; });
  }
  return G._idxArme[id] || G._idxArmure[id] || null;
};
G.equip.arme   = function(m){ return m.arme ? G.equip.parId(m.arme) : null; };
G.equip.armure = function(m){ return m.armure ? G.equip.parId(m.armure) : null; };

G.equip.armesDe = function(classe, tierMax){
  return G.ARMES.filter(function(a){
    return a.classe === classe && (tierMax === undefined || a.tier <= tierMax);
  });
};
G.equip.armuresDe = function(classe, tierMax){
  var types = G.CLASSES[classe].arm;
  return G.ARMURES.filter(function(a){
    return types.indexOf(a.type) >= 0 && (tierMax === undefined || a.tier <= tierMax);
  });
};

/* prix d'un équipement */
G.equip.prix = function(it){
  var t = it.tier;
  return Math.round(18 * Math.pow(2.15, t - 1));
};

/* coût d'amélioration au niveau n (1..5) */
G.equip.COUT_AMELIO = [1, 2.5, 6, 14, 32];
G.equip.MAT_AMELIO  = [2, 4, 8, 14, 24];
G.equip.coutAmelio = function(it, n){
  return Math.round(G.equip.prix(it) * G.equip.COUT_AMELIO[n-1]);
};
G.equip.amelioMax = function(){
  if (!G.salle("forge")) return 0;
  var base = G.salle("forge") + 1;             // forge 1 -> +2, forge 3 -> +4
  if (G.aEmploye("forgeron")) base += 1;
  return Math.min(5, base);
};

/* matériaux disponibles en stock */
G.equip.materiaux = function(){
  return G.etat.stock.filter(function(o){ return o.cat === "materiau"; })
                     .reduce(function(s,o){ return s + o.qte; }, 0);
};
G.equip.consommerMat = function(n){
  var reste = n;
  for (var i=0;i<G.etat.stock.length && reste>0;i++){
    var o = G.etat.stock[i];
    if (o.cat !== "materiau") continue;
    var pris = Math.min(o.qte, reste);
    o.qte -= pris; reste -= pris;
  }
  G.etat.stock = G.etat.stock.filter(function(o){ return o.qte > 0; });
  return reste === 0;
};

G.equip.ameliorer = function(membre, quoi){
  var it = quoi === "arme" ? G.equip.arme(membre) : G.equip.armure(membre);
  if (!it) return "Rien à améliorer.";
  var cle = quoi === "arme" ? "ameliorationArme" : "ameliorationArmure";
  var n = (membre[cle] || 0) + 1;
  if (n > G.equip.amelioMax()) return "Votre forge ne va pas au-delà de +" + G.equip.amelioMax() + ".";
  var cout = G.equip.coutAmelio(it, n), mat = G.equip.MAT_AMELIO[n-1];
  if (G.etat.or < cout) return "Il manque " + G.fmtOr(cout - G.etat.or) + ".";
  if (G.equip.materiaux() < mat) return "Il manque " + (mat - G.equip.materiaux()) + " matériaux.";
  G.etat.or -= cout; G.etat.stats.orDepense += cout;
  G.equip.consommerMat(mat);
  membre[cle] = n;
  G.log("🔨 " + it.nom + " de " + membre.nom + " amélioré en +" + n + ".", "ok");
  return null;
};

/* achat d'équipement pour un membre (marchand extérieur) */
G.equip.acheter = function(membre, itemId){
  var it = G.equip.parId(itemId);
  if (!it) return "Objet inconnu.";
  var prix = Math.round(G.equip.prix(it) * 1.35);
  if (G.etat.or < prix) return "Il manque " + G.fmtOr(prix - G.etat.or) + ".";
  G.etat.or -= prix; G.etat.stats.orDepense += prix;
  if (it.PUI !== undefined){ membre.arme = it.id; membre.ameliorationArme = 0; }
  else { membre.armure = it.id; membre.ameliorationArmure = 0; }
  G.log("🛒 " + membre.nom + " équipe " + it.nom + " (" + G.fmtOr(prix) + ").", "info");
  return null;
};

/* tier d'équipement disponible à l'achat selon la réputation */
G.equip.tierDispo = function(){
  var r = G.etat.reputation;
  if (r < 30) return 2;
  if (r < 80) return 3;
  if (r < 160) return 4;
  if (r < 300) return 5;
  if (r < 520) return 6;
  if (r < 800) return 7;
  return 8;
};
