window.G = window.G || {};

/* ---------- Rangs & tiers ---------- */
G.RANGS   = ["G","F","E","D","C","B","A","S"];
G.SEUILS  = [3, 7, 15, 30, 62, 122, 245, 500];      // puissance requise
G.NIVT    = [1, 4, 8, 13, 19, 27, 36, 50];          // niveau de référence
G.TAILLE  = [1, 2, 2, 3, 4, 5, 7, 10];              // équipe de référence
G.DUREE   = [0.25, 1, 2, 3.5, 7, 14, 24, 45];       // durée en jours
G.MODIF   = { "-": 0.78, "": 1.0, "+": 1.35 };      // multiplicateur de seuil

/* ---------- Classes ---------- */
G.CLASSES = {
  "Guerrier":       { role:"combat",  arm:["Moyenne","Lourde"],  pui:1.00 },
  "Archer":         { role:"combat",  arm:["Légère"],            pui:1.05 },
  "Mage":           { role:"combat",  arm:["Tissu"],             pui:1.15 },
  "Guérisseur":     { role:"soutien", arm:["Tissu"],             pui:0.55 },
  "Porte-bouclier": { role:"tank",    arm:["Lourde","Moyenne"],  pui:0.82 },
  "Éclaireur":      { role:"utilite", arm:["Légère","Furtive"],  pui:0.88 },
  "Voleur":         { role:"utilite", arm:["Furtive","Légère"],  pui:0.90 },
  "Barde":          { role:"soutien", arm:["Légère","Tissu"],    pui:0.72 },
  "Ingénieur":      { role:"utilite", arm:["Moyenne"],           pui:0.90 },
  "Dompteur":       { role:"combat",  arm:["Moyenne","Légère"],  pui:0.95 },
  "Nécromancien":   { role:"combat",  arm:["Tissu"],             pui:1.20 }
};

/* ---------- Natures de mission : affinité par classe ---------- */
G.NATURES = {
  "extermination": { lib:"Extermination", aff:{ "Guerrier":1.3,"Mage":1.5,"Archer":1.2,"Porte-bouclier":1.1,"Nécromancien":1.3,"Dompteur":1.0,"Ingénieur":0.9,"Voleur":0.6,"Éclaireur":0.7,"Barde":0.7,"Guérisseur":0.5 } },
  "chasse":        { lib:"Chasse",        aff:{ "Archer":1.5,"Dompteur":1.4,"Éclaireur":1.2,"Voleur":1.1,"Guerrier":1.0,"Mage":0.9,"Ingénieur":1.0,"Porte-bouclier":0.7,"Nécromancien":0.8,"Barde":0.6,"Guérisseur":0.5 } },
  "escorte":       { lib:"Escorte",       aff:{ "Porte-bouclier":1.5,"Guerrier":1.2,"Barde":1.3,"Guérisseur":1.1,"Archer":1.0,"Éclaireur":1.1,"Dompteur":0.9,"Mage":0.9,"Ingénieur":0.8,"Voleur":0.7,"Nécromancien":0.5 } },
  "enquete":       { lib:"Enquête",       aff:{ "Voleur":1.5,"Éclaireur":1.4,"Barde":1.4,"Mage":1.0,"Guérisseur":0.9,"Ingénieur":0.9,"Archer":0.8,"Guerrier":0.6,"Dompteur":0.8,"Nécromancien":0.9,"Porte-bouclier":0.5 } },
  "exploration":   { lib:"Exploration",   aff:{ "Éclaireur":1.6,"Dompteur":1.2,"Voleur":1.1,"Archer":1.1,"Ingénieur":1.0,"Guerrier":0.9,"Barde":0.9,"Mage":0.9,"Guérisseur":0.9,"Nécromancien":0.7,"Porte-bouclier":0.6 } },
  "siege":         { lib:"Siège",         aff:{ "Ingénieur":1.6,"Mage":1.4,"Guerrier":1.2,"Porte-bouclier":1.3,"Archer":1.0,"Nécromancien":1.0,"Dompteur":0.7,"Barde":0.6,"Éclaireur":0.6,"Voleur":0.6,"Guérisseur":0.5 } },
  "recuperation":  { lib:"Récupération",  aff:{ "Voleur":1.6,"Éclaireur":1.2,"Ingénieur":1.2,"Archer":0.9,"Barde":1.0,"Guerrier":0.8,"Mage":1.0,"Dompteur":0.8,"Nécromancien":0.9,"Porte-bouclier":0.6,"Guérisseur":0.6 } },
  "purification":  { lib:"Purification",  aff:{ "Guérisseur":1.4,"Mage":1.4,"Nécromancien":1.5,"Guerrier":1.1,"Porte-bouclier":1.1,"Barde":0.9,"Archer":0.8,"Éclaireur":0.7,"Voleur":0.6,"Ingénieur":0.7,"Dompteur":0.6 } }
};

/* ---------- Modèles de requêtes : le texte du client ---------- */
/* rangIndic = ce que la description laisse deviner ; ecart = biais possible sur le vrai rang */
G.MODELES = [
 { nature:"extermination", min:0, max:2, titre:"Nuisibles dans la cave",
   txt:"Y'a des rats dans ma cave, des gros. Je peux plus descendre chercher mes conserves.", client:"un aubergiste" },
 { nature:"extermination", min:0, max:3, titre:"Loups aux abords",
   txt:"Une meute rôde autour des enclos. On a déjà perdu trois chèvres cette semaine.", client:"un éleveur" },
 { nature:"extermination", min:2, max:5, titre:"Nid de gobelins",
   txt:"Ils sont installés dans la carrière abandonnée. Ils descendent la nuit.", client:"un chef de village" },
 { nature:"extermination", min:4, max:7, titre:"La chose sous le moulin",
   txt:"Trois hommes sont descendus. Aucun n'est remonté. On entend encore des bruits.", client:"un meunier" },
 { nature:"chasse", min:1, max:4, titre:"Sanglier enragé",
   txt:"Il a éventré deux chiens et un gamin. Il faut l'abattre avant qu'il recommence.", client:"un garde-chasse" },
 { nature:"chasse", min:3, max:6, titre:"La bête des tourbières",
   txt:"Quelque chose prend les voyageurs sur la route du nord. On ne retrouve que les sacs.", client:"un marchand" },
 { nature:"chasse", min:5, max:7, titre:"Prime sur le Dévoreur",
   txt:"La couronne met une prime. On ne sait pas exactement ce que c'est. On sait ce que ça laisse.", client:"un héraut royal" },
 { nature:"escorte", min:1, max:4, titre:"Convoi de grain",
   txt:"Trois chariots jusqu'à la ville basse. La route est mauvaise depuis les pluies.", client:"une marchande" },
 { nature:"escorte", min:2, max:5, titre:"Protection d'un notable",
   txt:"Mon commanditaire souhaite voyager discrètement. Et rentrer vivant.", client:"un intendant" },
 { nature:"escorte", min:4, max:7, titre:"Traversée des cols",
   txt:"Une caravane entière, deux semaines de route, et des choses qui suivent la nuit.", client:"un chef de caravane" },
 { nature:"enquete", min:1, max:4, titre:"Vols au marché",
   txt:"On me vide mes étals et personne ne voit rien. Ça dure depuis un mois.", client:"un commerçant" },
 { nature:"enquete", min:3, max:6, titre:"Disparitions au quartier bas",
   txt:"Six personnes en trois semaines. La garde dit que ce sont des fugues.", client:"une veuve" },
 { nature:"enquete", min:5, max:7, titre:"Le sceau brisé",
   txt:"Quelqu'un a pénétré les archives scellées. Nous devons savoir qui, et ce qui manque.", client:"un archiviste" },
 { nature:"exploration", min:0, max:3, titre:"Cartographier le vallon",
   txt:"Personne n'y est allé depuis des années. On veut savoir ce qu'il y a.", client:"un géomètre" },
 { nature:"exploration", min:3, max:6, titre:"Les ruines du plateau",
   txt:"On voit des murs depuis la crête. Il faut savoir si c'est habité.", client:"une érudite" },
 { nature:"exploration", min:5, max:7, titre:"Sous la cité morte",
   txt:"Les galeries descendent bien plus bas que ce que les plans indiquent.", client:"une société savante" },
 { nature:"siege", min:2, max:5, titre:"Démolir la tour penchée",
   txt:"Elle va tomber sur les maisons. Il faut la faire tomber du bon côté.", client:"un bailli" },
 { nature:"siege", min:4, max:7, titre:"Le fort des pillards",
   txt:"Ils ont pris l'ancien poste de garde. Ils y sont retranchés depuis l'automne.", client:"un capitaine" },
 { nature:"recuperation", min:1, max:4, titre:"Récupérer un bien volé",
   txt:"Ils ont pris le coffre de ma mère. Je sais où ils logent. Je n'irai pas seul.", client:"un artisan" },
 { nature:"recuperation", min:3, max:6, titre:"Le chargement perdu",
   txt:"Le bateau s'est échoué. La cargaison est encore là-bas. D'autres la cherchent aussi.", client:"un armateur" },
 { nature:"recuperation", min:5, max:7, titre:"Reprendre l'étendard",
   txt:"Ils l'ont pris sur le champ de bataille. L'humiliation coûte plus cher que l'or.", client:"un noble" },
 { nature:"purification", min:2, max:5, titre:"Le cimetière agité",
   txt:"On enterre, et le lendemain la terre est retournée. Plus personne ne veut y aller.", client:"un fossoyeur" },
 { nature:"purification", min:4, max:7, titre:"La chapelle profanée",
   txt:"Ce qui a été fait là-bas ne peut pas rester. Envoyez des gens qui tiennent debout.", client:"un prêtre" },
 { nature:"purification", min:6, max:7, titre:"Le charnier qui respire",
   txt:"Trois guildes ont déjà refusé. Je suis venu jusqu'ici parce qu'il ne reste que vous.", client:"un survivant" }
];

/* ---------- Butin ---------- */
G.BUTINS = [
 { nom:"Peaux de loup", base:8, cat:"materiau" }, { nom:"Crocs de bête", base:12, cat:"materiau" },
 { nom:"Minerai brut", base:15, cat:"materiau" }, { nom:"Herbes rares", base:20, cat:"materiau" },
 { nom:"Cuir tanné", base:25, cat:"materiau" },   { nom:"Écailles", base:40, cat:"materiau" },
 { nom:"Essence d'os", base:60, cat:"materiau" }, { nom:"Cristal brut", base:95, cat:"materiau" },
 { nom:"Fragment runique", base:150, cat:"materiau" }, { nom:"Cœur de monstre", base:240, cat:"materiau" },
 { nom:"Bijou terni", base:30, cat:"curio" },     { nom:"Statuette ancienne", base:70, cat:"curio" },
 { nom:"Sceau inconnu", base:130, cat:"curio" },  { nom:"Relique mineure", base:300, cat:"curio" }
];

/* ---------- Salles ---------- */
G.SALLES = {
  bureau:     { nom:"Bureau",              cout:[0, 250, 700],    desc:"Débloque réceptionniste, répartiteur et comptable. Augmente le nombre de requêtes reçues." },
  table:      { nom:"Table des missions",  cout:[0, 180, 500],    desc:"Nombre de contrats affichables simultanément." },
  dortoir:    { nom:"Dortoir",             cout:[150, 400, 1100], desc:"Capacité d'effectif. Améliore le moral et la récupération." },
  infirmerie: { nom:"Infirmerie",          cout:[300, 900, 2400], desc:"Débloque le docteur. Réduit les convalescences." },
  entrainement:{nom:"Terrain d'entraînement",cout:[350, 1000, 2600],desc:"Débloque l'instructeur. Entraînement sans risque." },
  rachat:     { nom:"Comptoir de rachat",  cout:[280, 800, 2000], desc:"Débloque le rachat du butin et l'estimateur." },
  boutique:   { nom:"Boutique",            cout:[320, 950, 2400], desc:"Revente aux aventuriers à meilleur prix." },
  entrepot:   { nom:"Entrepôt",            cout:[200, 600, 1600], desc:"Capacité de stockage des marchandises." },
  forge:      { nom:"Forge",               cout:[500, 1500, 3800],desc:"Améliore l'équipement de +1 à +5." },
  taverne:    { nom:"Taverne",             cout:[260, 750, 1900], desc:"Débloque le recruteur. Plus de candidats, meilleur moral." }
};

/* ---------- Employés ---------- */
G.POSTES = {
  receptionniste:{ nom:"Réceptionniste", salle:"bureau",      salaire:14, desc:"Filtre les requêtes et signale les demandes douteuses." },
  repartiteur:   { nom:"Répartiteur",    salle:"bureau",      salaire:18, desc:"Assigne automatiquement selon VOTRE grade, pas la difficulté réelle." },
  comptable:     { nom:"Comptable",      salle:"bureau",      salaire:12, desc:"Fixe automatiquement une part équitable et améliore la commission." },
  docteur:       { nom:"Docteur",        salle:"infirmerie",  salaire:22, desc:"Réduit fortement les convalescences. Peut sauver un mourant." },
  instructeur:   { nom:"Instructeur",    salle:"entrainement",salaire:20, desc:"Entraîne les membres inactifs, sans risque." },
  commis:        { nom:"Commis au rachat",salle:"rachat",     salaire:13, desc:"Rachète le butin automatiquement à bon prix." },
  estimateur:    { nom:"Estimateur",     salle:"rachat",      salaire:16, desc:"Révèle la valeur réelle des objets incertains." },
  vendeur:       { nom:"Vendeur",        salle:"boutique",    salaire:15, desc:"Écoule le stock automatiquement." },
  forgeron:      { nom:"Forgeron",       salle:"forge",       salaire:24, desc:"Niveau d'amélioration maximal accessible." },
  recruteur:     { nom:"Recruteur",      salle:"taverne",     salaire:17, desc:"Plus de candidats, et de meilleure qualité." },
  intendant:     { nom:"Intendant",      salle:"entrepot",    salaire:14, desc:"Augmente la capacité de stockage et limite les pertes de butin." }
};

/* ---------- Noms ---------- */
G.PRENOMS = ["Aldric","Brenna","Cael","Dorenn","Elys","Fendrel","Gwen","Hadrien","Ilvane","Joran",
"Kaelis","Lysia","Maren","Nael","Orwin","Perrine","Quillon","Rhodan","Sylane","Tomas","Ulric","Vess",
"Wynn","Xaline","Yorick","Zephra","Alric","Berthe","Corin","Dalia","Edran","Fiora","Garen","Hessa",
"Ivon","Jael","Karn","Liora","Mordan","Nyssa","Oren","Pellin","Roderic","Serine","Thane","Ursa",
"Valen","Wilda","Yannick","Zoran","Mira","Sorren","Nael","Kesh","Ambre","Doran","Elise","Ferrant"];
G.NOMS = ["Vardenne","Corbeauclair","Malbois","Serrelame","Ferrand","Duvent","Pierregris","Aubelune",
"Rochenoire","Valmont","Tournebride","Hautefeuille","Sombreval","Lancier","Brisefer","Moriseau",
"Pluvier","Estrange","Cendrelin","Vieuxpont","Roncevaux","Argentier","Merlon","Chaudeveine",
"Bellecombe","Fauconnier","Grisard","Loriot","Tancrède","Vaubourg"];
