window.G = window.G || {};
G.ui = {};
var E = G.escape;

/* ============ helpers ============ */
G.ui.rangBadge = function(r, m){
  if (r === null || r === undefined || r < 0) return '<span class="rg" title="Non gradé">—</span>';
  return '<span class="rg r' + r + '">' + G.RANGS[r] + (m || "") + '</span>';
};
G.ui.barre = function(v, max, seuils){
  var p = G.clamp(v / max * 100, 0, 100);
  var c = p < (seuils ? seuils[0] : 30) ? "bas" : p < (seuils ? seuils[1] : 60) ? "moy" : "";
  return '<div class="barre"><i class="' + c + '" style="width:' + p.toFixed(0) + '%"></i></div>';
};
G.ui.selRang = function(id, val){
  var h = '<select data-champ="' + id + '">';
  for (var i=0;i<8;i++) h += '<option value="' + i + '"' + (i===val?' selected':'') + '>' + G.RANGS[i] + '</option>';
  return h + '</select>';
};
G.ui.selModif = function(id, val){
  var h = '<select data-champ="' + id + '">';
  ["-","","+"].forEach(function(m){
    h += '<option value="' + m + '"' + (m===val?' selected':'') + '>' + (m===""?"neutre":m) + '</option>';
  });
  return h + '</select>';
};
G.ui.modale = function(html){
  document.getElementById("modaleBoite").innerHTML = html;
  document.getElementById("modale").classList.remove("cache");
};
G.ui.fermer = function(){ document.getElementById("modale").classList.add("cache"); };
G.ui.msg = null;
G.ui.erreur = function(t){ if (t){ G.ui.msg = t; G.log("⚠️ " + t, "mauvais"); } };

/* ============ REQUÊTES ============ */
G.ui.panRequetes = function(){
  var l = G.etat.requetes;
  var h = '<h2>Requêtes</h2><div class="sous">Des clients se présentent. À vous de juger si l\'affaire vaut le risque, et de lui attribuer un rang.</div>';
  if (!l.length) return h + '<div class="vide">Personne au comptoir pour le moment.</div>';
  h += '<div class="cartes">';
  l.forEach(function(q){
    var est = G.req.estimation(q);
    var ind = G.req.indice(q);
    var rangDef = q.rangJoueur !== null ? q.rangJoueur : Math.round((est.bas + est.haut) / 2);
    var modDef  = q.modifJoueur !== null ? q.modifJoueur : "";
    var part = q.partMembres;
    var reste = Math.round(q.offre * (1 - part));
    h += '<div class="carte" data-nat="' + q.nature + '" data-q="' + q.id + '">';
    h += '<h4>' + E(q.titre) + '</h4>';
    h += '<div class="cli">' + E(q.client.charAt(0).toUpperCase() + q.client.slice(1)) +
         ' · ' + E(G.NATURES[q.nature].lib) + '</div>';
    h += '<div class="dit">« ' + E(q.txt) + ' »</div>';
    h += '<div class="lignes">';
    h += '<div class="li"><span>Estimation</span><span>' +
         (est.precis ? G.ui.rangBadge(est.bas) + ' <span class="tag ok">confirmé</span>'
                     : 'entre ' + G.RANGS[est.bas] + ' et ' + G.RANGS[est.haut]) + '</span></div>';
    h += '<div class="li"><span>Offre du client</span><span class="val or">' + G.fmtOr(q.offre) +
         (ind ? ' <span class="tag ' + (ind==="mal payé"?"mal":ind==="généreux"?"ok":"") + '">' + ind + '</span>' : '') +
         '</span></div>';
    h += '<div class="li"><span>Durée estimée</span><span>' + G.fmtDuree(q.duree) +
         ' + ' + G.fmtDuree(q.trajet * 2) + ' de trajet</span></div>';
    h += '<div class="li"><span>Le client patiente</span><span>' +
         (q.delai > G.etat.jour ? G.fmtDuree(q.delai - G.etat.jour) : '<span class="tag mal">il s\'impatiente</span>') + '</span></div>';
    if (q.pourri) h += '<div class="avert">La situation a déjà empiré ' + q.pourri + ' fois.</div>';
    h += '</div>';
    h += '<div style="margin-top:10px">';
    h += '<div style="margin-bottom:6px">Votre grade : ' + G.ui.selRang("rang", rangDef) + ' ' + G.ui.selModif("modif", modDef) + '</div>';
    h += '<div style="font-size:12px;color:var(--doux)">Part des membres : <b data-part>' + Math.round(part*100) + '%</b> — ' +
         'ils touchent ' + G.fmtOr(q.offre*part) + ', la guilde garde <b class="val or">' + G.fmtOr(reste) + '</b></div>';
    h += '<input type="range" min="20" max="90" value="' + Math.round(part*100) + '" data-champ="part">';
    h += '</div>';
    h += '<div>';
    h += '<button class="bt pri" data-act="req-accept" data-id="' + q.id + '">Accepter</button>';
    h += '<button class="bt" data-act="req-scout" data-id="' + q.id + '">Enquêter</button>';
    h += '<button class="bt dang" data-act="req-refuse" data-id="' + q.id + '">Refuser</button>';
    h += '</div></div>';
  });
  return h + '</div>';
};

/* ============ TABLEAU ============ */
G.ui.panTableau = function(){
  var l = G.etat.missions.filter(function(m){ return m.etat === "tableau"; });
  var h = '<h2>Table des missions</h2><div class="sous">' + l.length + ' / ' + G.capaciteTableau() +
          ' contrats affichés. Assignez vos membres, ou laissez-les se porter volontaires.</div>';
  if (!l.length) return h + '<div class="vide">Aucun contrat au tableau.</div>';
  h += '<div class="cartes">';
  l.forEach(function(mi){
    var eq = G.mis.equipe(mi);
    var est = G.calc.reussiteEstimee(eq, mi);
    var minRang = Math.max(0, mi.rangJoueur - 1);
    h += '<div class="carte" data-nat="' + mi.nature + '">';
    h += '<h4>' + E(mi.titre) + ' ' + G.ui.rangBadge(mi.rangJoueur, mi.modifJoueur) + '</h4>';
    h += '<div class="cli">' + E(G.NATURES[mi.nature].lib) + ' · ' + G.fmtDuree(mi.duree + mi.trajet*2) +
         ' · accessible dès le rang ' + G.RANGS[minRang] + '</div>';
    h += '<div class="lignes">';
    h += '<div class="li"><span>Récompense</span><span class="val or">' + G.fmtOr(mi.offre) +
         ' (part membres ' + Math.round(mi.partMembres*100) + '%)</span></div>';
    var ref = G.TAILLE[mi.rangJoueur];
    h += '<div class="li"><span>Équipe</span><span>' + eq.length + ' / ' + ref +
         ' conseillés' + (eq.length && eq.length < ref * 0.6 ? ' <span class="tag mal">trop peu</span>' : '') + '</span></div>';
    if (eq.length){
      h += '<div class="li"><span>Réussite estimée</span><span>' +
           (est >= 60 ? '<span class="tag ok">' : est >= 35 ? '<span class="tag">' : '<span class="tag mal">') +
           Math.round(est) + ' %</span> <span style="color:var(--doux);font-size:11px">selon VOTRE grade</span></span></div>';
    }
    h += '</div>';
    if (eq.length){
      h += '<div style="margin:8px 0">';
      eq.forEach(function(m){
        h += '<span class="tag act">' + E(m.nom.split(" ")[0]) + ' · ' + E(m.classe) +
             ' <b data-act="mis-remove" data-id="' + mi.id + '" data-m="' + m.id + '" style="cursor:pointer">×</b></span>';
      });
      h += '</div>';
    }
    if (eq.length && eq.length < ref * 0.6)
      h += '<div class="avert">Une mission de ce rang demande environ ' + ref +
           ' membres. Partir à ' + eq.length + ' est un pari.</div>';
    h += '<div>';
    h += '<button class="bt" data-act="mis-pick" data-id="' + mi.id + '">Assigner…</button>';
    h += '<button class="bt" data-act="mis-vol" data-id="' + mi.id + '">Volontaires</button>';
    h += '<button class="bt pri" data-act="mis-launch" data-id="' + mi.id + '"' + (eq.length?'':' disabled') + '>Envoyer</button>';
    h += '</div></div>';
  });
  return h + '</div>';
};

G.ui.picker = function(missionId){
  var mi = G.mission(missionId);
  if (!mi) return;
  var minRang = Math.max(0, mi.rangJoueur - 1);
  var h = '<h2>' + E(mi.titre) + ' ' + G.ui.rangBadge(mi.rangJoueur, mi.modifJoueur) + '</h2>';
  h += '<div class="sous">Nature : ' + E(G.NATURES[mi.nature].lib) +
       '. Seuls les membres de rang ' + G.RANGS[minRang] + ' et au-dessus peuvent partir.</div>';
  h += '<div class="tbl"><table><tr><th>Membre</th><th>Classe</th><th>Rang</th><th>Niveau</th><th>Affinité</th><th>Moral</th><th></th></tr>';
  G.etat.membres.forEach(function(m){
    var dans = mi.equipe.indexOf(m.id) >= 0;
    var dispo = !m.enMission && !m.blessure;
    var ok = G.mem.peutPartir(m, mi);
    var aff = G.NATURES[mi.nature].aff[m.classe] || 1;
    h += '<tr><td>' + E(m.nom) + '</td><td>' + E(m.classe) + '</td><td>' + G.ui.rangBadge(m.rang) + '</td>';
    h += '<td>' + (m.evalue ? m.niveau : '<span style="color:var(--doux)">?</span>') + '</td>';
    h += '<td>' + (aff >= 1.3 ? '<span class="tag ok">' + aff.toFixed(1) + '</span>'
                 : aff <= 0.8 ? '<span class="tag mal">' + aff.toFixed(1) + '</span>'
                 : '<span class="tag">' + aff.toFixed(1) + '</span>') + '</td>';
    h += '<td>' + Math.round(m.moral) + '</td><td>';
    if (dans) h += '<button class="bt p dang" data-act="mis-remove" data-id="' + mi.id + '" data-m="' + m.id + '">Retirer</button>';
    else if (!dispo) h += '<span class="tag">' + (m.blessure ? "blessé" : "en mission") + '</span>';
    else if (!ok) h += '<span class="tag mal">rang insuffisant</span>';
    else h += '<button class="bt p" data-act="mis-add" data-id="' + mi.id + '" data-m="' + m.id + '">Assigner</button>';
    h += '</td></tr>';
  });
  h += '</table></div><div style="margin-top:16px"><button class="bt pri" data-act="fermer">Terminé</button></div>';
  G.ui.modale(h);
};

/* ============ EN COURS ============ */
G.ui.panEnCours = function(){
  var l = G.etat.missions.filter(function(m){ return m.etat === "encours"; });
  var enq = G.etat.membres.filter(function(m){ return m.retourEnquete; });
  var h = '<h2>Missions en cours</h2><div class="sous">Elles se déroulent loin d\'ici. Vous saurez au retour.</div>';
  if (!l.length && !enq.length) return h + '<div class="vide">Personne sur le terrain.</div>';
  h += '<div class="cartes">';
  l.forEach(function(mi){
    var total = mi.jourRetour - mi.jourDepart;
    var fait = G.clamp((G.etat.jour - mi.jourDepart) / total, 0, 1);
    h += '<div class="carte" data-nat="' + mi.nature + '"><h4>' + E(mi.titre) + ' ' + G.ui.rangBadge(mi.rangJoueur, mi.modifJoueur) + '</h4>';
    h += '<div class="cli">' + G.mis.equipe(mi).map(function(m){ return E(m.nom.split(" ")[0]); }).join(", ") + '</div>';
    h += G.ui.barre(fait * 100, 100, [101,102]);
    h += '<div class="cli" style="margin-top:6px">Retour dans ' + G.fmtDuree(Math.max(0, mi.jourRetour - G.etat.jour)) + '</div>';
    h += '</div>';
  });
  enq.forEach(function(m){
    h += '<div class="carte"><h4>🔍 Reconnaissance</h4><div class="cli">' + E(m.nom) +
         ' — retour dans ' + G.fmtDuree(Math.max(0, m.retourEnquete - G.etat.jour)) + '</div></div>';
  });
  return h + '</div>';
};

/* ============ RAPPORTS ============ */
G.ui.panRapports = function(){
  var l = G.etat.missions.filter(function(m){ return m.etat === "terminee"; })
          .sort(function(a,b){ return b.jourFin - a.jourFin; });
  var h = '<h2>Rapports de mission</h2><div class="sous">Ce qui s\'est réellement passé.</div>';
  if (!l.length) return h + '<div class="vide">Aucun rapport.</div>';
  h += '<div class="cartes">';
  l.forEach(function(mi){
    var r = mi.rapport;
    mi.lu = true;
    var erreur = mi.rangReel - mi.rangJoueur;
    h += '<div class="carte" data-nat="' + mi.nature + '" data-r="' + mi.id + '"><h4>' + (r.reussi ? (r.partiel ? "🟡" : "✅") : "❌") + ' ' + E(mi.titre) + '</h4>';
    h += '<div class="cli">Jour ' + (Math.floor(r.jour)+1) + ' · ' +
         (r.reussi ? (r.partiel ? "Réussite partielle" : "Réussite") : "Échec") + '</div>';
    h += '<div class="lignes">';
    h += '<div class="li"><span>Votre grade</span><span>' + G.ui.rangBadge(r.rangJoueur, r.modifJoueur) + '</span></div>';
    h += '<div class="li"><span>Rang réel</span><span>' + G.ui.rangBadge(r.rangReel, r.modifReel) +
         (erreur > 0 ? ' <span class="tag mal">sous-évalué de ' + erreur + '</span>'
          : erreur < 0 ? ' <span class="tag">surévalué</span>' : ' <span class="tag ok">juste</span>') + '</span></div>';
    h += '<div class="li"><span>Chances réelles</span><span>' + r.taux + ' %</span></div>';
    if (r.reussi){
      h += '<div class="li"><span>Commission guilde</span><span class="val or">+' + G.fmtOr(r.or) + '</span></div>';
      h += '<div class="li"><span>Versé aux membres</span><span>' + G.fmtOr(r.partMembres) + '</span></div>';
    }
    h += '<div class="li"><span>Réputation</span><span>' + (r.reputation >= 0 ? "+" : "") + r.reputation + '</span></div>';
    h += '</div><div style="margin-top:8px">';
    r.lignes.forEach(function(li){
      var t = { indemne:"", fatigue:"épuisé", legere:"blessé", grave:"gravement blessé", mort:"MORT" }[li.sort];
      var cl = li.sort === "mort" ? "mal" : li.sort === "grave" ? "mal" : li.sort === "indemne" ? "ok" : "";
      h += '<div style="font-size:12.5px;padding:2px 0">' + E(li.nom) +
           ' <span style="color:var(--doux)">' + E(li.classe) + '</span> ' +
           (t ? '<span class="tag ' + cl + '">' + t + '</span>' : '') +
           ' <span class="tag">+' + li.xp + ' xp</span>' +
           (li.monte ? ' <span class="tag ok">niveau ' + li.monte + '</span>' : '') + '</div>';
    });
    h += '</div>';
    if (mi.butinAttente && mi.butinAttente.length){
      h += '<div class="info">Butin rapporté — ils veulent le vendre à la guilde.<br>';
      mi.butinAttente.forEach(function(o){
        var p = G.com.prix(o.nom);
        h += '<div style="margin-top:4px">' + o.qte + ' × ' + E(o.nom) +
             ' <span class="tag">marché : ' + p + ' po/u</span></div>';
      });
      var off = mi.offreRachat === undefined ? 60 : mi.offreRachat;
      h += '<div style="margin-top:8px">Votre offre : <b data-offre>' + off + '</b> % du prix du marché' +
           '<input type="range" min="30" max="100" value="' + off + '" data-champ="offre">' +
           '<button class="bt pri" data-act="rap-buy" data-id="' + mi.id + '">Racheter</button>' +
           '<button class="bt" data-act="rap-skip" data-id="' + mi.id + '">Laisser</button></div>';
      h += '</div>';
    }
    h += '</div>';
  });
  return h + '</div>';
};

/* ============ MEMBRES ============ */
G.ui.panMembres = function(){
  var h = '<h2>Membres de la guilde</h2><div class="sous">' + G.etat.membres.length + ' / ' +
          G.capaciteEffectif() + ' places. C\'est vous qui décidez des promotions.</div>';
  if (!G.etat.membres.length) return h + '<div class="vide">La guilde est vide. Allez voir les candidats.</div>';
  h += '<div class="tbl"><table><tr><th>Nom</th><th>Classe</th><th>Rang</th><th>Niveau</th><th>Moral</th><th>État</th><th>Équipement</th><th>Missions</th><th></th></tr>';
  G.etat.membres.slice().sort(function(a,b){ return b.rang - a.rang || b.niveau - a.niveau; }).forEach(function(m){
    var att = G.mem.rangAttendu(m.niveau);
    var arme = G.equip.arme(m), armure = G.equip.armure(m);
    h += '<tr><td>' + E(m.nom) + '</td><td><span class="cls c-' +
         G.CLASSES[m.classe].role + '">' + E(m.classe) + '</span></td>';
    h += '<td>' + G.ui.rangBadge(m.rang) +
         (m.evalue && m.rang > att + 1 ? ' <span class="tag mal" title="Surgradé">!</span>' : '') + '</td>';
    h += '<td>' + (m.evalue ? m.niveau + '<span style="color:var(--doux);font-size:11px"> (' + G.RANGS[att] + ')</span>'
                            : '<span style="color:var(--doux)">non évalué</span>') + '</td>';
    h += '<td>' + Math.round(m.moral) + G.ui.barre(m.moral, 100) + '</td>';
    h += '<td>' + (m.blessure ? '<span class="tag mal">' +
           (m.blessure.gravite === "legere" ? "blessé" : "grave") + ' ' +
           G.fmtDuree(Math.max(0, m.blessure.fin - G.etat.jour)) + '</span>'
         : m.enMission ? '<span class="tag act">en mission</span>'
         : '<span class="tag ok">disponible</span>') + '</td>';
    h += '<td style="font-size:11.5px;color:var(--doux)">' +
         (arme ? E(arme.nom) + (m.ameliorationArme ? ' <b class="tag act">+' + m.ameliorationArme + '</b>' : '') : '—') + '<br>' +
         (armure ? E(armure.nom) + (m.ameliorationArmure ? ' <b class="tag act">+' + m.ameliorationArmure + '</b>' : '') : '—') + '</td>';
    h += '<td>' + m.histo.missions + ' <span style="color:var(--doux);font-size:11px">(' + m.histo.reussites + '✓)</span></td>';
    h += '<td style="white-space:nowrap">';
    h += '<button class="bt p" data-act="mem-up" data-m="' + m.id + '"' + (m.rang>=7?' disabled':'') + '>▲</button>';
    h += '<button class="bt p" data-act="mem-down" data-m="' + m.id + '"' + (m.rang<0?' disabled':'') + '>▼</button>';
    h += '<button class="bt p" data-act="mem-eq" data-m="' + m.id + '">Équiper</button>';
    h += '</td></tr>';
  });
  return h + '</table></div>';
};

G.ui.equiper = function(id){
  var m = G.membre(id);
  if (!m) return;
  var tmax = G.equip.tierDispo();
  var arme = G.equip.arme(m), armure = G.equip.armure(m);
  var h = '<h2>' + E(m.nom) + '</h2><div class="sous">' + E(m.classe) + ' · rang ' +
          (m.rang < 0 ? "non gradé" : G.RANGS[m.rang]) + (m.evalue ? ' · niveau ' + m.niveau : '') +
          ' · marché accessible jusqu\'au tier ' + tmax + '</div>';

  if (arme || armure){
    if (!G.salle("forge")){
      h += '<div class="info"><b>Forge</b> — construisez une forge pour améliorer l\'équipement de +1 à +5.</div>';
    } else {
      h += '<div class="info"><b>Forge</b> — amélioration maximale : +' + G.equip.amelioMax() +
           ' · matériaux en stock : ' + G.equip.materiaux() + '<br>';
      if (arme) h += '<button class="bt p" data-act="mem-amelio" data-m="' + m.id + '" data-q="arme">Améliorer l\'arme (+' +
                     ((m.ameliorationArme||0)+1) + ')</button>';
      if (armure) h += '<button class="bt p" data-act="mem-amelio" data-m="' + m.id + '" data-q="armure">Améliorer l\'armure (+' +
                     ((m.ameliorationArmure||0)+1) + ')</button>';
      h += '</div>';
    }
  }

  h += '<h3>Armes</h3>';
  h += '<div class="tbl"><table><tr><th>Arme</th><th>Tier</th><th>Profil</th><th>PUI</th><th>PRE</th><th>Niv. min</th><th>Spécial</th><th>Prix</th><th></th></tr>';
  G.equip.armesDe(m.classe, tmax).slice().reverse().slice(0, 14).forEach(function(a){
    var trop = m.evalue && m.niveau < a.nivMin;
    h += '<tr><td>' + E(a.nom) + '</td><td>' + a.tier + '</td><td>' + E(a.profil) + '</td><td class="num">' + a.PUI + '</td>';
    h += '<td class="num">' + (a.PRE > 0 ? "+" : "") + a.PRE + '</td>';
    h += '<td>' + (trop ? '<span class="tag mal">' + a.nivMin + '</span>' : a.nivMin) + '</td>';
    h += '<td style="font-size:11px;color:var(--doux)">' + E(a.spe || "—") + '</td>';
    h += '<td class="num val or">' + Math.round(G.equip.prix(a)*1.35) + ' po</td>';
    h += '<td>' + (m.arme === a.id ? '<span class="tag act">équipée</span>' :
         '<button class="bt p" data-act="mem-buy" data-m="' + m.id + '" data-it="' + a.id + '">Acheter</button>') + '</td></tr>';
  });
  h += '</table></div>';

  h += '<h3>Armures</h3>';
  h += '<div class="tbl"><table><tr><th>Armure</th><th>Type</th><th>Tier</th><th>PRO</th><th>ENC</th><th>END</th><th>Niv. min</th><th>Spécial</th><th>Prix</th><th></th></tr>';
  G.equip.armuresDe(m.classe, tmax).slice().reverse().slice(0, 14).forEach(function(a){
    h += '<tr><td>' + E(a.nom) + '</td><td>' + E(a.type) + '</td><td>' + a.tier + '</td>';
    h += '<td>' + a.PRO + '</td><td>' + a.ENC + '</td><td>' + a.END + '</td><td>' + a.nivMin + '</td>';
    h += '<td style="font-size:11px;color:var(--doux)">' + E(a.spe || "—") + '</td>';
    h += '<td class="num val or">' + Math.round(G.equip.prix(a)*1.35) + ' po</td>';
    h += '<td>' + (m.armure === a.id ? '<span class="tag act">équipée</span>' :
         '<button class="bt p" data-act="mem-buy" data-m="' + m.id + '" data-it="' + a.id + '">Acheter</button>') + '</td></tr>';
  });
  h += '</table></div><div style="margin-top:16px"><button class="bt pri" data-act="fermer">Fermer</button></div>';
  G.ui.modale(h);
};

/* ============ RECRUTEMENT ============ */
G.ui.panRecrutement = function(){
  var h = '<h2>Candidatures</h2><div class="sous">Ils viennent chercher du travail. Ils ne demandent pas de salaire — ' +
          'ils sont payés sur les contrats. Ce qu\'ils racontent n\'engage qu\'eux.</div>';
  if (G.etat.membres.length >= G.capaciteEffectif())
    h += '<div class="avert">Votre dortoir est plein (' + G.capaciteEffectif() + ' places). Agrandissez-le pour recruter.</div>';
  if (!G.etat.candidats.length) return h + '<div class="vide">Aucun candidat ne se présente.</div>';
  h += '<div class="cartes">';
  G.etat.candidats.forEach(function(c){
    var imp = G.rec.impression(c);
    h += '<div class="carte"><h4>' + E(c.nom) + '</h4>';
    h += '<div class="cli">' + E(c.classe) + '</div>';
    h += '<div class="dit">« ' + E(c.phrase) + ' »</div>';
    h += '<div class="lignes">';
    h += '<div class="li"><span>Se dit de niveau</span><span>' + c.pretendu + '</span></div>';
    h += '<div class="li"><span>Rang correspondant</span><span>' +
         G.ui.rangBadge(G.mem.rangAttendu(c.pretendu)) + '</span></div>';
    h += '<div class="li"><span>Repart dans</span><span>' + G.fmtDuree(Math.max(0, c.expire - G.etat.jour)) + '</span></div>';
    h += '</div>';
    if (imp) h += '<div class="info" style="margin-top:8px">' + E(imp) + '</div>';
    h += '<div><button class="bt pri" data-act="rec-hire" data-id="' + c.id + '">Recruter</button>';
    h += '<button class="bt dang" data-act="rec-no" data-id="' + c.id + '">Éconduire</button></div></div>';
  });
  return h + '</div>';
};

/* ============ BÂTIMENT ============ */
G.ui.panBatiment = function(){
  var h = '<h2>Bâtiment de guilde</h2><div class="sous">Chaque employé exige sa salle. ' +
          'Entretien mensuel actuel : ' + G.fmtOr(G.emp.entretien()) + '.</div><div class="cartes">';
  Object.keys(G.SALLES).forEach(function(k){
    var s = G.SALLES[k], n = G.salle(k), cout = G.bat.coutProchain(k);
    h += '<div class="carte"><h4>' + E(s.nom) + ' ' +
         (n ? '<span class="tag act">niveau ' + n + '</span>' : '<span class="tag mal">non construite</span>') + '</h4>';
    h += '<div class="cli">' + E(s.desc) + '</div>';
    h += '<div>' + (cout === null
        ? '<span class="tag ok">niveau maximal</span>'
        : '<button class="bt' + (G.etat.or >= cout ? ' pri' : '') + '" data-act="bat-build" data-k="' + k + '"' +
          (G.etat.or >= cout ? '' : ' disabled') + '>' + (n ? "Améliorer" : "Construire") + ' — ' + G.fmtOr(cout) + '</button>')
        + '</div></div>';
  });
  return h + '</div>';
};

/* ============ EMPLOYÉS ============ */
G.ui.panEmployes = function(){
  var h = '<h2>Employés</h2><div class="sous">Seul coût fixe du jeu. Masse salariale : ' +
          G.fmtOr(G.emp.masseSalariale()) + ' / mois · entretien ' + G.fmtOr(G.emp.entretien()) +
          ' · prochaine paie jour ' + Math.ceil(G.etat.prochainePaie) + '.</div>';
  var total = G.emp.masseSalariale() + G.emp.entretien();
  if (total > G.etat.or) h += '<div class="avert">Votre trésorerie ne couvre pas la prochaine paie (' + G.fmtOr(total) + ').</div>';
  h += '<div class="cartes">';
  Object.keys(G.POSTES).forEach(function(k){
    var p = G.POSTES[k], pris = G.aEmploye(k), dispo = G.emp.disponible(k);
    var e = G.etat.employes.filter(function(x){ return x.poste === k; })[0];
    h += '<div class="carte"><h4>' + E(p.nom) + ' ' +
         (pris ? '<span class="tag ok">en poste</span>' : dispo ? '' : '<span class="tag mal">salle manquante</span>') + '</h4>';
    h += '<div class="cli">' + E(p.desc) + '</div>';
    h += '<div class="lignes"><div class="li"><span>Salaire</span><span>' + p.salaire + ' po / mois</span></div>';
    h += '<div class="li"><span>Salle requise</span><span>' + E(G.SALLES[p.salle].nom) + '</span></div></div>';
    h += '<div>' + (pris
      ? '<span class="tag">' + E(e.nom) + '</span><button class="bt dang p" data-act="emp-fire" data-id="' + e.id + '">Renvoyer</button>'
      : '<button class="bt' + (dispo ? ' pri' : '') + '" data-act="emp-hire" data-k="' + k + '"' + (dispo?'':' disabled') +
        '>Engager — prime ' + G.fmtOr(p.salaire*4) + '</button>') + '</div></div>';
  });
  return h + '</div>';
};

/* ============ COMMERCE ============ */
G.ui.panCommerce = function(){
  var h = '<h2>Commerce</h2>';
  if (!G.salle("rachat"))
    return h + '<div class="sous">Construisez un comptoir de rachat pour acheter le butin de vos membres.</div>' +
           '<div class="vide">Aucune activité commerciale.</div>';
  h += '<div class="sous">Stock : ' + G.com.qteStock() + ' / ' + G.capaciteStock() +
       ' · matériaux pour la forge : ' + G.equip.materiaux() + '</div>';

  if (!G.etat.stock.length) h += '<div class="vide">Entrepôt vide.</div>';
  else {
    h += '<div class="tbl"><table><tr><th>Objet</th><th>Qté</th><th>Acheté</th><th>Marché</th><th>Tendance</th><th></th></tr>';
    G.etat.stock.forEach(function(o){
      var val = G.com.valeur(o);
      var mult = G.etat.marche[o.nom] || 1;
      h += '<tr><td>' + E(o.nom) + '</td><td>' + o.qte + '</td><td>' + o.achat + ' po</td>';
      h += '<td>' + (val === null ? '<span class="tag mal">inconnue</span>' : '<span class="val or">' + val + ' po</span>') + '</td>';
      h += '<td>' + (mult > 1.1 ? '<span class="tag ok">↑ ' + mult.toFixed(2) + '</span>'
                   : mult < 0.9 ? '<span class="tag mal">↓ ' + mult.toFixed(2) + '</span>'
                   : '<span class="tag">= ' + mult.toFixed(2) + '</span>') + '</td>';
      h += '<td style="white-space:nowrap">';
      if (val === null) h += '<button class="bt p" data-act="com-est" data-id="' + o.id + '">Estimer (8 po)</button>';
      h += '<button class="bt p" data-act="com-marchand" data-id="' + o.id + '">Marchand</button>';
      if (G.salle("boutique")) h += '<button class="bt p pri" data-act="com-boutique" data-id="' + o.id + '">Boutique</button>';
      h += '</td></tr>';
    });
    h += '</table></div>';
  }

  if (G.etat.vitrine && G.etat.vitrine.length){
    h += '<h3>En vitrine</h3><div class="tbl"><table><tr><th>Objet</th><th>Qté</th><th>Prix demandé</th></tr>';
    G.etat.vitrine.forEach(function(v){
      h += '<tr><td>' + E(v.nom) + '</td><td>' + v.qte + '</td><td class="val or">' + v.prix + ' po</td></tr>';
    });
    h += '</table></div>';
  }
  return h;
};

/* ============ RENDU ============ */
G.ui.PANS = {
  requetes: G.ui.panRequetes, tableau: G.ui.panTableau, encours: G.ui.panEnCours,
  rapports: G.ui.panRapports, membres: G.ui.panMembres, recrutement: G.ui.panRecrutement,
  batiment: G.ui.panBatiment, employes: G.ui.panEmployes, commerce: G.ui.panCommerce
};

G.ui.render = function(){
  var e = G.etat;
  document.getElementById("horloge").textContent = G.fmtJour(e.jour);
  document.getElementById("jOr").textContent = G.fmtOr(e.or);
  document.getElementById("jRep").textContent = Math.round(e.reputation);
  document.getElementById("jMem").textContent = e.membres.length + " / " + G.capaciteEffectif();
  document.getElementById("jPaie").textContent = "J" + Math.ceil(e.prochainePaie);

  var b = { nReq:e.requetes.length, nCand:e.candidats.length,
    nTab:e.missions.filter(function(m){return m.etat==="tableau";}).length,
    nCours:e.missions.filter(function(m){return m.etat==="encours";}).length,
    nRap:e.missions.filter(function(m){return m.etat==="terminee" && !m.lu;}).length,
    nMem:e.membres.length };
  for (var k in b){ var el = document.getElementById(k); if (el) el.textContent = b[k] || ""; }

  document.querySelectorAll(".vit").forEach(function(x){
    x.classList.toggle("on", +x.dataset.v === e.vitesse);
  });
  document.querySelectorAll("#onglets button").forEach(function(x){
    x.classList.toggle("on", x.dataset.o === e.selection.onglet);
  });

  var pan = document.getElementById("panneau");
  if (!G.ui.gele) pan.innerHTML = (G.ui.PANS[e.selection.onglet] || G.ui.panTableau)();

  var lg = e.journal.slice(0, 70).map(function(l){
    return '<div class="lg lg-' + l.type + '"><span class="j">J' + (Math.floor(l.jour)+1) + '</span>' + E(l.txt) + '</div>';
  }).join("");
  document.getElementById("logs").innerHTML = lg;
};
