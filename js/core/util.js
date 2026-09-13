window.G = window.G || {};

G.uid = (function(){ var n = 0; return function(p){ return (p||"x") + (++n) + "_" + Math.floor(Math.random()*1e6); }; })();
G.rnd   = function(a,b){ return a + Math.random()*(b-a); };
G.rndi  = function(a,b){ return Math.floor(a + Math.random()*(b-a+1)); };
G.pick  = function(t){ return t[Math.floor(Math.random()*t.length)]; };
G.clamp = function(v,a,b){ return v<a?a:(v>b?b:v); };
G.round = function(v,d){ var p = Math.pow(10,d||0); return Math.round(v*p)/p; };

G.fmtOr = function(v){ return Math.round(v).toLocaleString("fr-FR") + " po"; };

G.fmtJour = function(j){
  var jour = Math.floor(j), h = Math.floor((j - jour) * 24);
  return "Jour " + (jour+1) + " — " + (h<10?"0":"") + h + "h";
};

G.fmtDuree = function(j){
  if (j < 1) return Math.round(j*24) + " h";
  if (j < 14) return G.round(j,1) + " j";
  return G.round(j/7,1) + " sem.";
};

G.rangLabel = function(r, m){ return G.RANGS[r] + (m||""); };

G.escape = function(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
};

/* tirage gaussien tronqué, pour générer des niveaux plausibles */
G.gauss = function(moy, ec, min, max){
  var u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  var g = Math.sqrt(-2*Math.log(u)) * Math.cos(2*Math.PI*v);
  return G.clamp(Math.round(moy + g*ec), min, max);
};
