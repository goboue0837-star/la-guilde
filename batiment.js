window.G = window.G || {};
G.bat = {};

G.bat.niveauMax = 3;

G.bat.coutProchain = function(cle){
  var n = G.salle(cle);
  if (n >= G.bat.niveauMax) return null;
  return G.SALLES[cle].cout[n];
};

G.bat.construire = function(cle){
  var cout = G.bat.coutProchain(cle);
  if (cout === null) return "Cette salle est déjà au maximum.";
  if (G.etat.or < cout) return "Il manque " + G.fmtOr(cout - G.etat.or) + ".";
  G.etat.or -= cout; G.etat.stats.orDepense += cout;
  G.etat.salles[cle] = G.salle(cle) + 1;
  G.log("🏗️ " + G.SALLES[cle].nom + " — niveau " + G.etat.salles[cle] + ".", "ok");
  return null;
};

/* ---------- Employés ---------- */
G.emp = {};

G.emp.disponible = function(poste){
  var p = G.POSTES[poste];
  return G.salle(p.salle) > 0;
};

G.emp.engager = function(poste){
  var p = G.POSTES[poste];
  if (!G.emp.disponible(poste)) return "Il faut d'abord construire : " + G.SALLES[p.salle].nom + ".";
  if (G.aEmploye(poste)) return "Ce poste est déjà pourvu.";
  var prime = p.salaire * 4;
  if (G.etat.or < prime) return "Prime d'embauche : " + G.fmtOr(prime) + ". Il manque " + G.fmtOr(prime - G.etat.or) + ".";
  G.etat.or -= prime; G.etat.stats.orDepense += prime;
  G.etat.employes.push({ id:G.uid("e"), poste:poste, nom:G.mem.nomAleatoire(), depuis:G.etat.jour });
  G.log("👔 " + p.nom + " engagé (prime " + G.fmtOr(prime) + ", salaire " + p.salaire + " po / mois).", "ok");
  return null;
};

G.emp.renvoyer = function(id){
  var e = G.etat.employes.filter(function(x){ return x.id === id; })[0];
  if (!e) return;
  G.etat.employes = G.etat.employes.filter(function(x){ return x.id !== id; });
  G.log("👋 " + G.POSTES[e.poste].nom + " renvoyé.", "info");
};

G.emp.masseSalariale = function(){
  return G.etat.employes.reduce(function(s,e){ return s + G.POSTES[e.poste].salaire; }, 0);
};

G.emp.entretien = function(){
  var t = 0;
  for (var k in G.etat.salles) t += G.etat.salles[k] * 4;
  return t;
};

G.emp.paie = function(){
  var total = G.emp.masseSalariale() + G.emp.entretien();
  if (total <= 0){ G.etat.prochainePaie += 30; return; }
  if (G.etat.or >= total){
    G.etat.or -= total; G.etat.stats.orDepense += total;
    G.log("💵 Paie du mois versée : " + G.fmtOr(total) + " (salaires + entretien).", "info");
  } else {
    var manque = total - G.etat.or;
    G.etat.or = 0;
    G.etat.reputation = Math.max(0, G.etat.reputation - 12);
    G.log("🔥 PAIE IMPAYÉE — il manquait " + G.fmtOr(manque) + ". La guilde perd la face.", "mort");
    G.etat.membres.forEach(function(m){ m.moral = G.clamp(m.moral - 16, 0, 100); });
    if (G.etat.employes.length && Math.random() < 0.55){
      var parti = G.pick(G.etat.employes);
      G.emp.renvoyer(parti.id);
      G.log("👋 Un employé claque la porte, faute d'être payé.", "mauvais");
    }
  }
  G.etat.prochainePaie += 30;
  G.pauseSi("paie", "Jour de paie.");
};
