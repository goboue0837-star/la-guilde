window.G = window.G || {};
G.calc = {};

/* Coefficient de position : rendements décroissants sur le nombre */
G.calc.COEF = [1, 1, 1, 0.85, 0.7, 0.6, 0.5, 0.45, 0.4, 0.36, 0.32, 0.3];
G.calc.coefPos = function(i){ return G.calc.COEF[i] !== undefined ? G.calc.COEF[i] : 0.28; };

/* Seuil réel d'une mission */
G.calc.seuil = function(mission){
  return G.SEUILS[mission.rangReel] * G.MODIF[mission.modifReel];
};

/* Niveau moyen attendu pour la mission (sert à la règle du poids mort) */
G.calc.nivAttendu = function(mission){
  return G.calc.seuil(mission) / G.TAILLE[mission.rangReel];
};

/* Puissance apportée par un membre sur une mission donnée */
G.calc.contribution = function(m, mission, index){
  var arme = G.equip.arme(m);
  var pui = m.niveau;
  if (arme){
    var p = arme.PUI;
    if (m.niveau < arme.nivMin) p = p * (m.niveau / arme.nivMin);
    pui += p * (1 + 0.085 * (m.ameliorationArme||0));
  }
  var aff = G.NATURES[mission.nature].aff[m.classe] || 1;
  aff *= G.CLASSES[m.classe].pui;

  /* règle du poids mort */
  var attendu = G.calc.nivAttendu(mission);
  var ratioNiv = m.niveau / attendu;
  var penalite = 1;
  if (ratioNiv < 0.4) penalite = 0.25 + ratioNiv;      // contribue à peine
  else if (ratioNiv < 0.7) penalite = 0.75 + (ratioNiv - 0.4);

  /* moral */
  var moral = 0.85 + (m.moral / 100) * 0.3;

  return pui * aff * penalite * moral * G.calc.coefPos(index);
};

/* Synergie de groupe : missions partagées entre les membres de l'équipe */
G.calc.synergie = function(equipe){
  if (equipe.length < 2) return 0;
  var total = 0, paires = 0;
  for (var i=0;i<equipe.length;i++){
    for (var j=i+1;j<equipe.length;j++){
      var n = (equipe[i].coequipiers[equipe[j].id] || 0);
      total += Math.min(n, 12);
      paires++;
    }
  }
  if (!paires) return 0;
  var moy = total / paires;               // 0..12
  return Math.min(0.20, moy * 0.017);     // jusqu'à +20 %
};

/* Puissance effective totale */
G.calc.puissance = function(equipe, mission){
  var tri = equipe.slice().sort(function(a,b){
    return G.calc.contribution(b, mission, 0) - G.calc.contribution(a, mission, 0);
  });
  var p = 0;
  for (var i=0;i<tri.length;i++) p += G.calc.contribution(tri[i], mission, i);
  return p * (1 + G.calc.synergie(equipe));
};

/* Précision moyenne apportée par l'équipement */
G.calc.precision = function(equipe){
  if (!equipe.length) return 0;
  var s = 0;
  for (var i=0;i<equipe.length;i++){
    var m = equipe[i], arme = G.equip.arme(m), armure = G.equip.armure(m);
    var pre = arme ? arme.PRE : -3;
    if (arme && m.niveau < arme.nivMin) pre -= 10;
    if (armure) pre -= armure.ENC * 0.12;
    s += pre;
  }
  return s / equipe.length;
};

/* Courbe ratio -> réussite */
G.calc.courbe = function(R){
  if (R <= 0) return 3;
  if (R < 0.5)  return 6 + R * 32;                   //  6 -> 22
  if (R < 0.75) return 22 + (R - 0.5) * 64;         // 22 -> 38
  if (R < 1.0)  return 38 + (R - 0.75) * 88;        // 38 -> 60
  if (R < 1.5)  return 60 + (R - 1.0) * 40;         // 60 -> 80
  if (R < 2.0)  return 80 + (R - 1.5) * 16;         // 80 -> 88
  if (R < 3.0)  return 88 + (R - 2.0) * 4;          // 88 -> 92
  return 92;
};

/* Taux de réussite final d'une mission avec une équipe donnée */
G.calc.reussite = function(equipe, mission){
  if (!equipe.length) return 0;
  var p = G.calc.puissance(equipe, mission);
  var R = p / G.calc.seuil(mission);
  var base = G.calc.courbe(R);
  base += G.calc.precision(equipe);
  return G.clamp(base, 3, 92);
};

/* Le joueur ne connaît que SON grade : estimation affichée avant départ */
G.calc.reussiteEstimee = function(equipe, mission){
  if (!equipe.length) return null;
  var faux = Object.create(mission);
  faux.rangReel = mission.rangJoueur;
  faux.modifReel = mission.modifJoueur;
  return G.calc.reussite(equipe, faux);
};

/* Protection moyenne de l'équipe (armures + guérisseurs + porte-boucliers) */
G.calc.protection = function(equipe){
  var pro = 0, soin = 0, tank = 0;
  for (var i=0;i<equipe.length;i++){
    var m = equipe[i], a = G.equip.armure(m);
    if (a) pro += a.PRO * (1 + 0.085 * (m.ameliorationArmure||0));
    if (m.classe === "Guérisseur") soin += 18 + m.niveau * 0.35;
    if (m.classe === "Porte-bouclier") tank += 10 + m.niveau * 0.2;
  }
  pro = equipe.length ? pro / equipe.length : 0;
  if (G.etat.employes.some(function(e){ return e.poste === "docteur"; })) soin += 8;
  return G.clamp(pro + soin + tank, 0, 90);
};

/* XP gagnée : dépend de l'écart entre le niveau et la difficulté affrontée */
G.calc.xp = function(m, mission, reussi){
  var attendu = G.calc.nivAttendu(mission);
  var ratio = attendu / Math.max(1, m.niveau);
  var base = G.SEUILS[mission.rangReel] * 2.5;
  var gain = base * G.clamp(ratio, 0.05, 2.2);
  if (!reussi) gain *= 0.45;
  if (m.niveau >= 60) gain *= 0.12;    // le mur
  if (m.niveau >= 75) gain *= 0.25;
  return Math.max(0, gain);
};

G.calc.xpRequis = function(niv){
  return Math.round(10 * Math.pow(niv, 1.35));
};
