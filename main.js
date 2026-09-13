window.G = window.G || {};

/* ---------- démarrage ---------- */
G.demarrer = function(neuf){
  if (!neuf && G.charger()){
    G.log("Partie chargée.", "ok");
  } else {
    G.etat = G.nouvelEtat();
    G.log("⚜ Vous ouvrez votre guilde. Une salle nue, un registre, et personne.", "info");
    G.log("Commencez par recruter, puis attribuez un rang à vos recrues : sans rang, personne ne peut partir en mission.", "info");
    for (var i=0;i<4;i++) G.etat.candidats.push(G.rec.generer());
    for (var j=0;j<3;j++){
      var q = G.req.generer();
      G.etat.requetes.push(q);
    }
    G.etat.selection.onglet = "recrutement";
  }
  G.ui.render();
};

/* ---------- boucle ---------- */
G.derniere = 0;
G.tickRendu = 0;
G.boucle = function(t){
  if (!G.derniere) G.derniere = t;
  var dt = Math.min(0.25, (t - G.derniere) / 1000);
  G.derniere = t;
  if (G.etat.vitesse > 0) G.temps.avancer(dt);
  G.tickRendu += dt;
  if (G.tickRendu > 0.4){
    G.tickRendu = 0;
    var pan = document.getElementById("panneau");
    var sc = pan.scrollTop;
    G.ui.render();
    pan.scrollTop = sc;
  }
  requestAnimationFrame(G.boucle);
};

/* ---------- actions ---------- */
G.actions = {
  "req-accept": function(d){
    var q = G.etat.requetes.filter(function(x){ return x.id === d.id; })[0];
    if (!q) return;
    var rang = q.rangJoueur !== null ? q.rangJoueur : Math.round((G.req.estimation(q).bas + G.req.estimation(q).haut)/2);
    G.ui.erreur(G.req.accepter(q, rang, q.modifJoueur || "", q.partMembres));
  },
  "req-refuse": function(d){
    var q = G.etat.requetes.filter(function(x){ return x.id === d.id; })[0];
    if (q) G.req.refuser(q);
  },
  "req-scout": function(d){
    var q = G.etat.requetes.filter(function(x){ return x.id === d.id; })[0];
    if (!q) return;
    var dispo = G.dispos();
    if (!dispo.length) return G.ui.erreur("Personne de disponible pour enquêter.");
    var h = '<h2>Envoyer enquêter</h2><div class="sous">Coût : ' + G.fmtOr(10 + q.rangReel*8) +
            '. Un éclaireur revient avec des informations bien plus fiables.</div><div class="tbl"><table><tr><th>Membre</th><th>Classe</th><th>Niveau</th><th></th></tr>';
    dispo.forEach(function(m){
      h += '<tr><td>' + G.escape(m.nom) + '</td><td>' + G.escape(m.classe) + '</td><td>' +
           (m.evalue ? m.niveau : "?") + '</td><td><button class="bt p pri" data-act="req-scout-go" data-id="' +
           q.id + '" data-m="' + m.id + '">Envoyer</button></td></tr>';
    });
    G.ui.modale(h + '</table></div><div style="margin-top:16px"><button class="bt" data-act="fermer">Annuler</button></div>');
  },
  "req-scout-go": function(d){
    var q = G.etat.requetes.filter(function(x){ return x.id === d.id; })[0];
    if (q) G.ui.erreur(G.req.enqueter(q, d.m));
    G.ui.fermer();
  },
  "mis-pick":   function(d){ G.ui.picker(d.id); },
  "mis-add":    function(d){ var mi = G.mission(d.id); if (mi){ G.ui.erreur(G.mis.assigner(mi, d.m)); G.ui.picker(d.id); } },
  "mis-remove": function(d){ var mi = G.mission(d.id); if (mi){ G.mis.retirer(mi, d.m);
                  if (!document.getElementById("modale").classList.contains("cache")) G.ui.picker(d.id); } },
  "mis-vol":    function(d){ var mi = G.mission(d.id); if (mi){ var n = G.mis.volontaires(mi);
                  G.log(n ? "🙋 " + n + " membre(s) se portent volontaires pour « " + mi.titre + " »."
                          : "Personne ne se porte volontaire pour « " + mi.titre + " ».", n ? "info" : "mauvais"); } },
  "mis-launch": function(d){ var mi = G.mission(d.id); if (mi) G.ui.erreur(G.mis.lancer(mi)); },
  "rap-buy":    function(d){ var mi = G.mission(d.id); if (mi)
                  G.ui.erreur(G.com.racheter(mi, (mi.offreRachat === undefined ? 60 : mi.offreRachat)/100)); },
  "rap-skip":   function(d){ var mi = G.mission(d.id); if (mi){ mi.butinAttente = null;
                  G.log("Le butin est vendu ailleurs.", "info"); } },
  "mem-up":     function(d){ var m = G.membre(d.m); if (m) G.ui.erreur(G.mem.promouvoir(m)); },
  "mem-down":   function(d){ var m = G.membre(d.m); if (m) G.ui.erreur(G.mem.retrograder(m)); },
  "mem-eq":     function(d){ G.ui.equiper(d.m); },
  "mem-buy":    function(d){ var m = G.membre(d.m); if (m){ G.ui.erreur(G.equip.acheter(m, d.it)); G.ui.equiper(d.m); } },
  "mem-amelio": function(d){ var m = G.membre(d.m); if (m){ G.ui.erreur(G.equip.ameliorer(m, d.q)); G.ui.equiper(d.m); } },
  "rec-hire":   function(d){ var c = G.etat.candidats.filter(function(x){ return x.id === d.id; })[0];
                  if (c) G.ui.erreur(G.rec.recruter(c)); },
  "rec-no":     function(d){ var c = G.etat.candidats.filter(function(x){ return x.id === d.id; })[0];
                  if (c) G.rec.refuser(c); },
  "bat-build":  function(d){ G.ui.erreur(G.bat.construire(d.k)); },
  "emp-hire":   function(d){ G.ui.erreur(G.emp.engager(d.k)); },
  "emp-fire":   function(d){ G.emp.renvoyer(d.id); },
  "com-est":    function(d){ var o = G.etat.stock.filter(function(x){ return x.id === d.id; })[0];
                  if (o) G.ui.erreur(G.com.estimer(o)); },
  "com-marchand": function(d){ var o = G.etat.stock.filter(function(x){ return x.id === d.id; })[0];
                  if (o) G.com.vendreMarchand(o, o.qte); },
  "com-boutique": function(d){ var o = G.etat.stock.filter(function(x){ return x.id === d.id; })[0];
                  if (o) G.ui.erreur(G.com.vendreBoutique(o, o.qte)); },
  "fermer":     function(){ G.ui.fermer(); }
};

/* ---------- événements ---------- */
document.addEventListener("click", function(ev){
  var b = ev.target.closest("[data-act]");
  if (b){
    var f = G.actions[b.dataset.act];
    if (f){ f(b.dataset); G.ui.render(); }
    return;
  }
  var v = ev.target.closest(".vit");
  if (v){ G.etat.vitesse = +v.dataset.v; G.ui.render(); return; }
  var o = ev.target.closest("#onglets button");
  if (o){ G.etat.selection.onglet = o.dataset.o; G.ui.render(); return; }
  if (ev.target.id === "modale") G.ui.fermer();
});

/* selects et sliders : on écrit directement dans le modèle */
function majChamp(el){
  var champ = el.dataset.champ;
  if (!champ) return;
  var carteQ = el.closest("[data-q]"), carteR = el.closest("[data-r]");
  if (carteQ){
    var q = G.etat.requetes.filter(function(x){ return x.id === carteQ.dataset.q; })[0];
    if (!q) return;
    if (champ === "rang")  q.rangJoueur = +el.value;
    if (champ === "modif") q.modifJoueur = el.value;
    if (champ === "part"){
      q.partMembres = +el.value / 100;
      var lb = carteQ.querySelector("[data-part]");
      if (lb) lb.textContent = el.value + "%";
    }
  } else if (carteR && champ === "offre"){
    var mi = G.mission(carteR.dataset.r);
    if (mi){
      mi.offreRachat = +el.value;
      var lo = carteR.querySelector("[data-offre]");
      if (lo) lo.textContent = el.value;
    }
  }
}
document.addEventListener("input",  function(ev){ if (ev.target.dataset.champ){ G.ui.gele = true; majChamp(ev.target); } });
document.addEventListener("change", function(ev){ if (ev.target.dataset.champ){ majChamp(ev.target); G.ui.gele = false; G.ui.render(); } });
document.addEventListener("pointerup", function(){ if (G.ui.gele){ G.ui.gele = false; } });

/* raccourcis */
document.addEventListener("keydown", function(ev){
  if (ev.target.tagName === "INPUT" || ev.target.tagName === "SELECT") return;
  if (ev.code === "Space"){ ev.preventDefault(); G.etat.vitesse = G.etat.vitesse ? 0 : 1; G.ui.render(); }
  if (ev.key === "1") { G.etat.vitesse = 1; G.ui.render(); }
  if (ev.key === "2") { G.etat.vitesse = 2; G.ui.render(); }
  if (ev.key === "Escape") G.ui.fermer();
});

/* barre */
document.getElementById("btnSave").addEventListener("click", function(){ G.sauvegarder(); G.ui.render(); });
document.getElementById("btnOptions").addEventListener("click", function(){
  var a = G.etat.autoPause;
  var lignes = [["retour","Une équipe rentre"],["mort","Un membre meurt"],["depart","Départ en mission"],
                ["paie","Jour de paie"],["client","Un client se présente"]];
  var h = '<h2>Options</h2><div class="sous">Pause automatique — le temps s\'arrête sur ces événements.</div>';
  lignes.forEach(function(l){
    h += '<div style="padding:4px 0"><label><input type="checkbox" data-pause="' + l[0] + '"' +
         (a[l[0]] ? " checked" : "") + '> ' + l[1] + '</label></div>';
  });
  h += '<div style="margin-top:16px"><button class="bt" data-act="fermer">Fermer</button>' +
       '<button class="bt" id="btnExport">Exporter la sauvegarde</button>' +
       '<button class="bt dang" id="btnNeuf">Nouvelle partie</button></div>';
  G.ui.modale(h);
  document.querySelectorAll("[data-pause]").forEach(function(c){
    c.addEventListener("change", function(){ G.etat.autoPause[c.dataset.pause] = c.checked; });
  });
  document.getElementById("btnExport").addEventListener("click", G.exporter);
  document.getElementById("btnNeuf").addEventListener("click", function(){
    if (confirm("Effacer la partie en cours ?")){ G.effacerSave(); G.demarrer(true); G.ui.fermer(); }
  });
});

/* sauvegarde auto */
setInterval(function(){ if (G.etat.jour > 0) G.sauvegarder(true); }, 30000);

G.demarrer(false);
requestAnimationFrame(G.boucle);
