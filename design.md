# Jeu de Guilde — Document de Design

**Version 0.5 — temps réel, bâtiment de guilde, commerce, recrutement, employés, groupes**
*Document de travail, tous les chiffres sont des points de départ à équilibrer.*

---

## 1. Concept

Le joueur dirige une guilde d'aventuriers. Il ne combat jamais lui-même et ne voit jamais les missions se dérouler. Son rôle est celui d'un maître de guilde : recevoir les requêtes des clients, juger de leur dangerosité réelle, fixer les prix, décider qui part, et décider qui mérite de monter en grade.

Le cœur du jeu n'est pas la puissance des personnages, c'est **la qualité du jugement du joueur**. Un maître de guilde qui se surestime, qui grade mal une requête ou qui promeut trop vite envoie ses gens à la mort. Les conséquences sont durables parce que la progression est lente : perdre un membre expérimenté est une catastrophe qui ne se répare pas en une semaine.

---

## 2. Les deux axes : rang et niveau

C'est la colonne vertébrale du système. Tout en découle.

**Le rang (G → S)** est le *permis*. Il est attribué par le joueur, à la main. Il détermine uniquement **qui a le droit** de partir sur quelle mission. C'est une donnée administrative, pas une donnée de puissance.

**Le niveau (1 → 100)** est la *compétence réelle*. Il s'obtient par l'expérience, très lentement, et il détermine **si le membre en revient**. Le monde ne lit pas les papiers de la guilde.

L'écart entre les deux est le principal générateur de drame. Le joueur peut parfaitement coller un rang C à un gamin de niveau 12. L'interface le laissera partir sur une mission B. La nuée de goules, elle, ne sera pas impressionnée par le tampon.

---

## 3. La boucle de gameplay

1. **Une requête arrive.** Un client se présente à la guilde et décrit son problème en langage naturel, avec une récompense proposée. *« Ahh, y a des rats géants dans ma cave, aidez-moi à les tuer, je vous donne 10 pièces d'or. »*
2. **Évaluation.** Le joueur juge la requête. Est-ce plausible ? Est-ce que la récompense correspond au danger réel ? Optionnellement, il peut envoyer un éclaireur enquêter avant de trancher (voir §9).
3. **Acceptation ou refus.** Le joueur peut refuser un contrat. Refuser a un coût de réputation auprès de certains clients.
4. **Grading.** S'il accepte, le joueur attribue lui-même un rang à la mission (lettre + modificateur, ex. `C-`). Ce grade détermine qui aura le droit de s'y inscrire — il n'a **aucun** effet sur la difficulté réelle.
5. **Fixation de la part.** Le joueur décide combien revient aux membres et combien la guilde garde en commission. Dans l'exemple : le client donne 10, les membres touchent 6, la guilde garde 4.
6. **Assignation.** Soit le joueur assigne lui-même des membres précis, soit il publie la mission au tableau et laisse les membres se porter volontaires selon leur rang et leurs préférences.
7. **Résolution hors écran.** L'équipe part. On ne voit rien. Les membres deviennent indisponibles pour la durée de la mission.
8. **Retour et rapport.** L'équipe rentre. Le joueur découvre alors le rapport : réussite ou échec, blessures, morts éventuelles, butin, XP gagnée, et conséquences narratives (rumeurs, objets, réputation).
9. **Gestion d'après-mission.** Soins des blessés, distribution des récompenses, et décision éventuelle de promotion.

Retour à l'étape 1.

---

## 4. Le temps

**Le jeu se déroule en temps réel.** Les heures passent, les jours défilent, le calendrier avance. Le joueur dispose de trois contrôles :

- **Pause** — le temps est arrêté. C'est là qu'on réfléchit.
- **Accéléré 1** — vitesse de croisière.
- **Accéléré 2** — pour traverser les longues attentes.

### Ce que ça change

Le temps réel transforme la boucle. Le joueur ne résout plus des missions les unes après les autres : il gère un **flux permanent** de missions en cours, de blessés en convalescence, de clients qui attendent une réponse et de membres qui s'ennuient.

La pause devient l'outil de réflexion principal, et le temps qui coule est ce qui force les décisions.

### Durée des missions

Chaque mission occupe ses participants pendant une durée réelle, qui augmente fortement avec le rang. Ordre de grandeur :

| Rang | Durée |
|------|-------|
| G    | quelques heures |
| F    | 1 jour |
| E    | 2 jours |
| D    | 3 – 4 jours |
| C    | ~1 semaine |
| B    | ~2 semaines |
| A    | 3 – 4 semaines |
| S    | 1 – 2 mois |

Il faut y ajouter un **temps de trajet** selon l'éloignement du lieu, ce qui devient un critère d'acceptation à part entière : un contrat `D` bien payé à trois semaines de marche peut être un mauvais deal.

**Conséquence majeure** — une mission `S` immobilise dix membres d'élite pendant deux mois. Pendant ce temps, la guilde tourne sans son noyau dur et ne peut accepter que du petit contrat. Le coût d'opportunité devient énorme, et on ne fait que quelques missions `S` par an. Ça donne à ces contrats le poids d'événements majeurs plutôt que de simples missions difficiles.

### Délais et pourrissement des requêtes

Les clients n'attendent pas indéfiniment. Chaque requête a un délai, et laisser traîner a des conséquences :

- le client s'impatiente et va voir ailleurs (perte de réputation) ;
- ou la situation **empire** — les rats prolifèrent, la mission passe de `F` à `D`, et la récompense initialement proposée ne couvre plus le risque.

### Convalescence

Les blessures se comptent en jours. Une jambe cassée, c'est trois semaines d'indisponibilité. C'est ce qui rend le médecin de guilde rentable et ce qui transforme une blessure en vraie perte plutôt qu'en pénalité abstraite.

### Le calendrier

Les semaines et les mois structurent la partie. Deux effets :

**Les salaires des employés tombent à date fixe.** Il faut donc avoir des contrats qui se terminent avant l'échéance. C'est ce qui donne du mordant au seul coût fixe du jeu : une guilde peut être riche en missions en cours et insolvable le jour de la paie.

**Les saisons** (optionnel) rythment l'année et modulent le flux de requêtes : l'hiver amène des attaques de loups et moins de voyageurs, les récoltes amènent des contrats d'escorte, etc.

### Pause automatique

Indispensable. Certains événements doivent arrêter le temps automatiquement (réglable par le joueur) :

- une équipe rentre de mission ;
- un membre meurt ;
- un client de haut rang se présente ;
- un groupe se disloque, ou un membre quitte la guilde ;
- la trésorerie ne couvre plus la prochaine paie.

Sans ça, accélérer devient un pari plutôt qu'un confort.

---

## 5. Les rangs de mission

Huit lettres, de `G` (le plus facile) à `S` (le plus élevé), chacune déclinée en `-`, neutre et `+`.

### Le verrou d'accès

**Règle dure et non négociable :** une mission de rang `X` n'est accessible qu'aux membres de rang `X` ou d'un seul cran en dessous.

> Une mission `B` est faisable à partir du rang `C`. En dessous de `C`, c'est **NON**, peu importe combien de membres on envoie.

Le nombre ne compense jamais l'incompétence. Dix bûcherons de rang `F` ne règlent pas un problème de rang `B` — ils meurent juste tous ensemble.

### Le modificateur + / −

Le `+` et le `−` jouent **uniquement sur la difficulté réelle**, jamais sur le verrou d'accès. Le verrou ne lit que la lettre.

Conséquence voulue : un `C+` est presque une mission `B` déguisée, mais il reste légalement ouvert aux membres de rang `D`. C'est un piège, et c'est volontaire. Cela crée deux catégories d'erreur de grading très différentes :

- Se tromper sur le **modificateur** → une équipe qui rentre amochée et une marge ratée.
- Se tromper sur la **lettre** → un enterrement.

---

## 6. Seuils de puissance

Chaque mission a un **seuil de puissance**, comparé à la puissance effective de l'équipe envoyée. La courbe double approximativement à chaque rang, ce qui rend la progression vers le haut très lente et donne un vrai poids aux paliers.

| Rang | Seuil | Taille d'équipe de référence | Niveau moyen attendu |
|------|-------|------------------------------|----------------------|
| G    | 3     | 1                            | 3                    |
| F    | 8     | 2                            | 4                    |
| E    | 18    | 2                            | 9                    |
| D    | 35    | 3                            | 12                   |
| C    | 70    | 4                            | 18                   |
| B    | 130   | 5                            | 26                   |
| A    | 250   | 7                            | 36                   |
| S    | 500   | 10                           | 50                   |

Le modificateur ajuste le seuil à l'intérieur de la bande : `C−` ≈ 55, `C` ≈ 70, `C+` ≈ 95.

**Lecture importante :** les hauts rangs sont du contenu **collectif par nature**. Aucun héros solo ne boucle une mission `S`, même un niveau 80. Une mission `S` demande une dizaine de niveaux 50.

---

## 7. Les niveaux (1 → 100)

La montée en niveau est **dure**. C'est un choix de design assumé : la lenteur de la progression est ce qui donne du poids à la perte d'un membre.

### Repères

- **Niveau 50** — déjà très, très fort. Un pilier de guilde.
- **Niveau 100** — un dieu. Intuable, hors norme. Il en existe peut-être trois dans le monde entier, ce sont des figures connues de tous, et la guilde du joueur n'en aura probablement jamais. Ils existent comme **éléments du monde**, pas comme ressources pour le joueur.

### Rang typique selon le niveau

Repère indicatif pour guider les promotions, sans retirer au joueur sa décision :

| Rang | Niveau typique |
|------|----------------|
| G    | 1 – 4          |
| F    | 4 – 8          |
| E    | 8 – 13         |
| D    | 13 – 19        |
| C    | 19 – 27        |
| B    | 27 – 36        |
| A    | 36 – 50        |
| S    | 50 +           |

### Gain d'XP

L'XP dépend de **l'écart entre le niveau du membre et la difficulté affrontée**. Écraser des rats quand on est niveau 30 ne rapporte rien du tout. Il faut se frotter à du contenu qui fait mal pour progresser.

Cela place le joueur dans un inconfort permanent et voulu : **pour faire monter ses gens, il doit les exposer.**

### Le mur

Au-delà du niveau 60–70, les niveaux ne s'obtiennent plus par le travail régulier. Seuls des événements exceptionnels les accordent : survivre à une mission `S`, un entraînement auprès d'un maître, une découverte majeure, un héritage.

---

## 8. Calcul de réussite

### Puissance effective

```
Puissance effective = Σ (niveau du membre × affinité de classe × coefficient de position)
```

**Affinité de classe** — dépend de la nature de la mission (voir §10). De l'ordre de 0,5 (inadapté) à 1,5 (spécialiste).

**Coefficient de position** — rendements décroissants sur le nombre. Les trois premiers membres comptent plein, ensuite ça décroît : `1 / 1 / 1 / 0,85 / 0,7 / 0,6 / 0,5 / 0,45 …`

**Règle du poids mort** — un membre dont le niveau est très inférieur au niveau moyen attendu de la mission (moins de ~40 %) ne contribue quasiment pas **et augmente le risque de pertes**. Il ne fait qu'occuper une place et mourir. Deux niveaux 40 valent mieux que six niveaux 12, même à total comparable.

### Du ratio au pourcentage

Soit `R = puissance effective / seuil de la mission` :

| R      | Réussite |
|--------|----------|
| < 0,5  | 5 – 10 % |
| 0,75   | ~30 %    |
| 1,0    | ~57 %    |
| 1,5    | ~78 %    |
| 2,0    | ~88 %    |
| ≥ 3,0  | 92 % (plafond) |

**Le plafond de 92 % est volontaire.** Il n'y a jamais de réussite garantie : même un rang `S` peut se casser une jambe en tuant des rats. Ça garde du sel et ça évite le pilotage automatique sur les basses missions.

### Le coût du nombre

Ajouter des membres augmente les chances, mais coûte :

- La récompense se divise entre eux — la commission de guilde fond.
- Ils sont tous immobilisés pendant la durée de la mission.
- En cas d'échec, c'est **toute l'équipe** qui rentre amochée, pas une seule personne.

Le joueur arbitre donc en permanence entre sécuriser une mission et garder du monde disponible pour les contrats suivants.

---

## 9. Les classes

Les classes n'ont pas de rang propre. Elles modifient le calcul de résolution — c'est ce qui rend la **composition d'équipe** intéressante alors même qu'on ne voit jamais le combat.

### Les cinq de base

**Guerrier** — la référence. Puissance brute, encaisse correctement, marche partout, n'excelle nulle part. C'est l'étalon auquel les autres se comparent.

**Archer** — grosse contribution de puissance, mais fragile. Quand la mission se passe bien, il fait la différence ; quand elle tourne mal, c'est lui qu'on ramène sur une civière. Rentable et risqué.

**Mage** — multiplicateur, pas additionneur. Sur les missions qui lui correspondent (nuées, morts-vivants, sièges, créatures massives) il vaut trois guerriers. Sur une escorte discrète ou une filature, il ne sert presque à rien et coûte cher. Encore plus fragile que l'archer.

**Guérisseur** — apporte très peu de puissance, mais c'est la classe la plus importante du jeu à haut rang. Il ne fait pas **réussir** la mission, il fait **rentrer les gens**. Sa présence transforme les morts en blessés et les blessés en simples fatigués. Une mission `S` ratée sans guérisseur, c'est dix cercueils ; avec deux guérisseurs, c'est dix convalescents. Comme la progression en niveau est très lente, perdre un niveau 45 est une catastrophe économique — le guérisseur devient donc obligatoire dès qu'on monte, et le joueur doit accepter de « gâcher » des places d'équipe pour des gens qui ne combattent pas.

**Porte-bouclier** — il absorbe. Puissance médiocre, mais il attire les conséquences sur lui et protège spécifiquement les classes fragiles de l'équipe. Un mage sans bouclier devant lui, c'est un mage qui rentre en morceaux.

### Classes additionnelles

**Éclaireur** — se branche directement sur le système de grading. Le joueur peut l'envoyer enquêter sur une requête **avant** de la grader ; il revient et réduit l'incertitude, ou donne carrément la vraie difficulté s'il est bon. La phase d'évaluation devient une vraie décision : cramer deux jours et un membre pour vérifier, ou grader au feeling et encaisser le risque.

**Voleur** — infiltration, vol, cibles uniques. Inutile en combat de masse.

**Alchimiste** — ne part pas en mission. Prépare des potions qui donnent des bonus ponctuels. Classe de soutien sédentaire.

**Barde** — n'ajoute pas de puissance. Entretient le moral de la guilde et négocie mieux les contrats avec les clients.

**Ingénieur** — sièges, pièges, démolitions.

**Dompteur** — spécialiste des bêtes et créatures.

**Nécromancien** — très puissant, mais coûte de la réputation à chaque mission. Un choix qui ouvre de la puissance et ferme des clients.

---

## 10. Natures de mission et affinités

En plus de son rang, chaque mission a une **nature** : extermination (combat de masse), chasse (cible unique), escorte, enquête, exploration, siège / destruction, récupération / vol, purification (morts-vivants).

Chaque nature a ses affinités de classe. La puissance effective de l'équipe est donc la somme des niveaux **pondérée par l'adéquation des classes à la nature de la mission**.

Conséquence : envoyer 200 points de puissance mal composés sur une mission qui en demande 130 peut échouer, alors qu'en envoyer 140 bien composés passe.

Et comme le joueur ne connaît pas toujours la vraie nature de la mission au moment de la grader — le type qui parle de rats peut cacher qu'il y a un nécromancien derrière — le choix de composition est lui aussi un pari.

---

## 11. Résolution et conséquences

La mission se résout hors écran. Au retour, le rapport indique :

- **Réussite totale** — récompense pleine, XP, réputation.
- **Réussite partielle** — objectif atteint à moitié, récompense réduite, client mécontent.
- **Échec** — pas de récompense, blessures, réputation entamée.
- **Échec critique** — pertes humaines possibles, réputation lourdement touchée.

Le jet de pertes en cas d'échec est modifié par la présence de guérisseurs et de porte-boucliers. **Sans eux, les échecs à haut rang tuent.**

Autres conséquences possibles : un membre ramène une rumeur, un objet rare, une information sur un client, ou au contraire une mauvaise réputation si la mission a mal tourné.

---

## 12. Économie

Le client propose une somme. Le joueur décide de la répartition entre la part des membres et la commission de guilde.

Le grading a donc aussi un **enjeu économique** : un `C+` doit se payer bien plus cher qu'un `C−`. Si le joueur grade `C−` un contrat qui valait `C+`, soit il a laissé de l'argent au client, soit il sous-paye ses gens pour un risque qu'ils n'ont pas signé — **et ça se saura**.

### Structure des coûts

**Les aventuriers ne coûtent rien à l'arrêt.** Ils ne réclament pas de salaire — ils viennent chercher du travail et sont rémunérés uniquement sur les contrats qu'ils accomplissent. Le rapport de force est donc inversé par rapport à un jeu de gestion classique : c'est la guilde qui leur rend service.

En contrepartie, un membre sans mission ne gagne rien, se démotive et finit par partir. La guilde a donc une **obligation de leur fournir du travail**.

Les seuls coûts fixes sont les **salaires des employés** (§18) et l'entretien des bâtiments. La trésorerie sert à payer le staff et à **construire et améliorer le bâtiment de guilde** (§13), qui est la principale dépense d'investissement du jeu.

Un second moteur de revenus existe en parallèle de la commission sur contrats : le **rachat et la revente de butin** (§14).

---

## 13. Le bâtiment de guilde

La guilde est un lieu physique qu'on agrandit et qu'on améliore **avec de l'argent**. C'est la principale dépense d'investissement du jeu.

### La règle qui relie tout

**Chaque employé exige sa salle.** Pas d'infirmerie, pas de docteur. Pas de comptoir de rachat, pas de commis au rachat. Pas de bureau, pas de réceptionniste.

C'est ce qui articule les deux économies du jeu : l'argent achète des salles, les salles autorisent des employés, les employés rachètent l'attention du joueur et débloquent de nouveaux systèmes.

### Les salles

**Bureau** — la base. Débloque le poste de réceptionniste et la table des missions. C'est en général la première construction.

**Table des missions** — l'endroit où les requêtes acceptées sont affichées et où les membres viennent s'inscrire. Sa taille limite le nombre de contrats affichables simultanément.

**Dortoir** — de quoi loger les membres. Ceux qui dorment sur place récupèrent mieux, gardent un meilleur moral, et sont disponibles immédiatement quand un contrat urgent tombe. La capacité du dortoir est l'une des deux limites à l'effectif (l'autre étant le volume de contrats).

**Infirmerie, puis hôpital de guilde** — nécessite de **recruter un docteur**. Réduit fortement les temps de convalescence. Une infirmerie de base soigne les blessures légères ; un véritable hôpital, avec un bon médecin, peut traiter les blessures graves et sauver un membre qui serait mort autrement.

**Terrain d'entraînement** — nécessaire pour engager un instructeur. C'est le seul endroit où un membre gagne de l'expérience sans être exposé.

**Comptoir de rachat** — permet d'acheter le butin des aventuriers (§14).

**Boutique** — permet de revendre, aux membres de la guilde comme aux aventuriers de passage.

**Entrepôt** — capacité de stockage des marchandises non revendues. Sans lui, il faut écouler vite et donc brader.

**Forge** — permet d'améliorer armes et armures de +1 à +5, en consommant de l'or et des matériaux issus du butin. C'est la salle qui referme la boucle économique du jeu.

**Taverne** — attire les candidats et les clients, entretient le moral.

### Déblocage progressif

Toutes les salles ne sont pas disponibles d'emblée : elles se débloquent au fil de la partie, via la réputation de guilde ou des événements. Le joueur commence avec une salle nue, aucun employé, et fait absolument tout lui-même.

---

## 14. Le commerce

Deuxième moteur économique du jeu, totalement indépendant de la commission sur les contrats.

### Le rachat

Les aventuriers rentrent de mission chargés de butin : matériaux, armes, trophées, morceaux de créatures. Ils veulent le vendre, et ils viennent au comptoir de la guilde.

Le joueur voit le **prix du marché**, l'aventurier **négocie**. Acheter bas, revendre haut.

### La revente

Deux débouchés, avec un arbitrage clair :

**À un marchand** — sûr, immédiat, marge faible. On écoule et on passe à autre chose.

**Aux aventuriers** — via la boutique de la guilde. Prix nettement meilleur, mais il faut attendre un acheteur, et donc occuper de la place en entrepôt.

Revendre à ses propres membres crée une boucle fermée intéressante : on leur reprend leur argent tout en les équipant mieux, ce qui augmente leur taux de réussite en mission, ce qui augmente la commission de guilde.

### La négociation

C'est exactement le même curseur que la répartition des récompenses, appliqué une seconde fois : jusqu'où presser ses propres gens ?

Lowballer systématiquement ses membres fait chuter le moral et la réputation de la guilde — ils finissent par aller vendre ailleurs, voire par partir. Être généreux ne dégage aucune marge. Le joueur arbitre en permanence.

### Le marché fluctue

Les prix bougent selon l'offre. Dix missions de chasse au loup dans le mois et la peau de loup ne vaut plus rien. Ça relie directement le tableau des missions au marché, et ça donne une raison de stocker pour attendre le bon moment — à condition d'avoir l'entrepôt pour le faire.

### La valeur incertaine

Certains objets ont une valeur que le joueur ne connaît pas. Un aventurier peut ramener une babiole sans intérêt ou une relique mineure, et les deux se ressemblent.

Un expert (employé ou classe) permet de faire estimer un objet avant de le racheter. Sans lui, chaque rachat inhabituel est un pari.

---

## 15. Promotions

C'est **le joueur** qui décide quand un membre monte en grade. Deux contrepoids empêchent de promouvoir tout le monde en `S` au bout de dix minutes :

**Le coût** — un membre promu négocie une part plus grosse sur chaque contrat qu'il accomplit (ce n'est pas un salaire : il reste payé à la mission). La commission de guilde diminue d'autant.

**L'inertie** — promouvoir quelqu'un qui n'a pas l'expérience derrière lui ne fait que lui ouvrir l'accès à des missions où son taux de réussite réel reste catastrophique. Le rang affiché change, le niveau non. On peut mettre un rang `C` sur un gars qui a fait trois missions : il partira sur du `B`, il n'en reviendra pas.

**À l'inverse**, laisser un membre trop longtemps sur des missions bien en dessous de son niveau réel lui fait perdre le moral, et peut le pousser à quitter la guilde pour une concurrente qui le respecte.

---

## 16. Progression de guilde

La **réputation de guilde** est le verrou de progression global. Plus elle monte :

- plus des clients de rang supérieur se présentent ;
- plus on peut recruter des membres de meilleur niveau ;
- plus on débloque des bâtiments et améliorations.

---

## 17. Le recrutement

Au tout début, la guilde n'a personne. Des gens **postulent** et le joueur recrute.

Le recrutement est le système de grading appliqué à des êtres humains. Un candidat se présente et raconte ce qu'il veut :

> « J'ai servi six ans dans la garde de Vareth. J'ai tué un ours à mains nues. »

### Ce que le joueur voit et ne voit pas

**Visible** — la classe apparente, l'allure, l'âge, et les références (vérifiables ou non).

**Important : les candidats ne demandent aucun salaire.** Ils viennent chercher du travail. C'est la guilde qui leur rend service en leur donnant accès à des contrats — ils sont payés quand ils font des missions, et uniquement à ce moment-là. Recruter quelqu'un ne coûte donc rien en soi.

**Invisible** — le niveau réel, le tempérament véritable, et le passé caché.

Comme pour une requête de mission, il faut juger sur une description peu fiable. Et comme pour une requête, on peut se planter. Certains candidats se surestiment de bonne foi, d'autres mentent délibérément, et quelques-uns cachent un vrai problème : un déserteur, un voleur qui pique dans la caisse de la guilde, un espion envoyé par une guilde concurrente.

### Qui postule

La qualité du vivier dépend de la **réputation de guilde** — le même verrou de progression que partout ailleurs.

- **Début de partie** — seuls des désespérés et des médiocres se présentent. Rang `G`–`F`, niveau 1 à 6.
- **Guilde établie** — des profils confirmés viennent d'eux-mêmes, et négocient une part plus élevée sur les contrats.

### La période d'essai

Le joueur peut mettre un nouveau à l'épreuve sur des missions `G`. Ça coûte du temps et immobilise du monde, mais ça révèle le niveau réel.

### La vraie contrainte : le volume de contrats

Puisque recruter est gratuit, ce n'est pas l'argent qui limite l'effectif. **C'est le nombre de missions disponibles.**

Un membre qui ne part jamais en mission ne gagne rien. Il s'ennuie, perd le moral, et finit par partir pour une guilde qui a du travail à lui donner. Le joueur ne peut donc pas thésauriser les aventuriers « au cas où » : chaque recrue supplémentaire doit être nourrie en contrats, sinon elle s'en va — et une guilde qui perd sans arrêt ses membres se fait une réputation.

L'effectif est donc plafonné par le flux de requêtes, lui-même dépendant de la réputation. Recruter trop vite est une erreur.

---

## 18. Les employés

Catégorie totalement distincte des aventuriers : **les employés ne partent jamais en mission**. Ils font tourner la guilde.

### La différence économique fondamentale

Les aventuriers ne coûtent **rien** tant qu'ils ne partent pas : ils sont payés à la mission, sur une part de ce que verse le client. Les employés, eux, touchent un **salaire fixe à chaque cycle**, que la guilde gagne de l'argent ou non.

Le staff est donc le **seul coût fixe du jeu**. Un gros staff pendant un mois creux, ça coule une guilde.

C'est ce qui empêche le joueur d'automatiser tout le jeu dès qu'il en a les moyens.

### Prérequis : la salle

**Chaque employé exige la salle correspondante** (§13). On n'engage pas un docteur sans infirmerie, ni un commis au rachat sans comptoir. Embaucher est donc toujours un investissement en deux temps : construire, puis payer le salaire.

### Les postes

**Réceptionniste** *(bureau)* — reçoit les clients, pré-trie les requêtes et affiche les contrats acceptés sur la table des missions. Une bonne réceptionniste signale les demandes suspectes ou mal payées ; une pas chère laisse tout passer et le joueur croule sous les histoires de rats.

**Répartiteur** *(bureau)* — assigne automatiquement les membres aux missions selon des règles fixées par le joueur. **Point vicieux et volontaire : il assigne selon le grade attribué par le joueur, pas selon la difficulté réelle.** Déléguer multiplie la compétence du joueur, mais multiplie aussi ses erreurs, à l'échelle.

**Commis au rachat** *(comptoir de rachat)* — négocie et rachète le butin des aventuriers à la place du joueur. Un bon commis obtient de meilleurs prix sans froisser les membres ; un mauvais rogne trop et abîme le moral.

**Vendeur** *(boutique)* — écoule le stock auprès des membres et des aventuriers de passage.

**Expert / estimateur** *(comptoir de rachat)* — évalue les objets de valeur incertaine avant rachat. Sans lui, chaque objet inhabituel est un pari.

**Docteur** *(infirmerie ou hôpital)* — soigne entre les missions et raccourcit les convalescences. Sa compétence détermine ce qu'il peut traiter : un bon médecin dans un vrai hôpital peut sauver un membre qui serait mort autrement. À ne pas confondre avec le guérisseur, qui est une classe d'aventurier et part sur le terrain.

**Instructeur** *(terrain d'entraînement)* — entraîne les bas niveaux. Il résout un problème réel du système : c'est le **seul moyen de faire monter un membre sans l'exposer**. Lentement, chèrement, mais sans risque de mort.

**Comptable** *(bureau)* — gère les parts et commissions automatiquement. Sans lui, chaque répartition se fait à la main.

**Intendant** *(entrepôt)* — équipement, stock, logistique.

**Forgeron** *(forge)* — améliore l'équipement. Sa compétence détermine le niveau d'amélioration maximal accessible.

**Recruteur** *(taverne)* — augmente le volume et la qualité des candidatures.

### Le rôle structurel

Les employés sont la réponse au problème d'échelle. À quarante aventuriers, le joueur ne peut plus grader et assigner à la main. Le staff libère son attention — au prix d'un coût fixe et d'une marge d'erreur qu'il ne contrôle plus directement.

---

## 19. Les groupes et les affinités

Des membres qui enchaînent les missions ensemble finissent par former des équipes.

### Synergie

Un groupe qui a partagé un certain nombre de missions gagne un bonus de puissance effective, qui monte avec l'historique commun (ordre de grandeur : +5 % à +20 %).

Cela crée un arbitrage permanent : **l'équipe mathématiquement optimale pour cette mission précise, ou l'équipe qui fonctionne bien ensemble ?** Recomposer en permanence pour optimiser chaque contrat détruit la synergie accumulée.

### Formation spontanée

Au bout d'un moment, un groupe se formalise de lui-même. Ses membres s'inscrivent ensemble aux missions du tableau et rechignent à être séparés — les séparer de force est possible, mais coûte du moral.

Les groupes deviennent aussi une **couche d'abstraction** pour le joueur : à quarante membres, on assigne un groupe plutôt que huit individus. Même logique de délégation que les employés.

### Inimitiés

L'inverse existe. Deux membres qui se sont plantés ensemble sur une mission désastreuse, ou dont les tempéraments sont incompatibles, peuvent refuser de travailler ensemble. Les forcer inflige un malus.

### La mort d'un membre de groupe

C'est ici que le système de mort permanente prend toute sa dimension. Quand un membre d'un groupe soudé meurt, les survivants ne perdent pas un collègue : ils encaissent un choc de moral qui peut faire **exploser l'unité entière**. Certains quittent la guilde, d'autres refusent de repartir pendant un moment.

Le joueur ne perd pas un niveau 45. Il perd une équipe.

### Leader de groupe (optionnel, à tester)

Un leader émerge naturellement (niveau le plus élevé, ou meilleur tempérament). Piste à explorer : un groupe mené par un leader de rang élevé pourrait accéder à des missions d'un cran au-dessus de ce que son membre le plus faible autoriserait. Récompense intéressante, mais attention à ne pas casser le verrou de rang.

---

## 20. L'arc de la partie

Les trois systèmes ci-dessus racontent la même histoire, et c'est l'axe central du jeu : **une lente perte de contrôle direct**.

**Début de partie** — le joueur reçoit chaque candidat en personne, grade chaque requête lui-même, assigne chaque membre à la main. Tout passe par lui. Il a cinq personnes et il les connaît toutes.

**Fin de partie** — quarante aventuriers répartis en groupes autonomes, une réceptionniste qui filtre les clients, un répartiteur qui assigne selon des règles, un instructeur qui forme la relève. Le joueur ne s'occupe plus que de la politique générale, des promotions, et des contrats `S`.

La nature même du gameplay change entre les deux. C'est assumé et ça doit être ressenti.

---

## 21. Points encore à trancher


- **Mort permanente** — confirmée sur échec critique à haut rang, mais à quel seuil exactement ? Et existe-t-il un moyen de récupérer un membre perdu (rançon, capture plutôt que mort) ?
- **Information de promotion** — le joueur voit-il des stats chiffrées (XP, niveau exact, missions réussies) ou seulement des rapports de mission et son ressenti ? La deuxième option est bien plus immersive mais beaucoup plus dure à équilibrer.
- **Volontariat des membres** — sur quoi se basent-ils pour choisir une mission au tableau : uniquement leur rang, ou aussi des préférences personnelles et leur moral ?
- **Stats individuelles** — au-delà du niveau, quelles stats précises ont les membres, et comment se branchent-elles sur le calcul de puissance ?
- **Détail des affinités** — construire la table complète nature × classe.
- **Guildes concurrentes** — simple menace narrative, ou vrai système avec compétition sur les contrats ?
- **Recrutement** — le joueur peut-il enquêter sur un candidat (vérifier ses références auprès d'anciens employeurs) comme il peut enquêter sur une requête avec un éclaireur ?
- **Employés** — ont-ils eux aussi un niveau de compétence, ou juste un coût et un effet fixe ? Un répartiteur médiocre fait-il des assignations bancales ?
- **Groupes** — le joueur peut-il créer et nommer un groupe lui-même, ou ils ne se forment que spontanément par affinité ?
- **Seuil de formation** — combien de missions partagées avant qu'un groupe se constitue et commence à refuser d'être séparé ?
- **Leader de groupe** — est-ce qu'un leader de rang élevé peut tirer son groupe vers des missions au-dessus du verrou normal ? (risque de casser le verrou de rang)
- **Traîtres et passés cachés** — quelle fréquence, et comment le joueur peut-il les détecter avant qu'il soit trop tard ?
- **Échelle du temps** — combien de temps réel pour une journée de jeu en vitesse normale ? C'est ce qui détermine si une mission `S` de deux mois est une soirée de jeu ou une semaine.
- **Saisons** — simple habillage, ou vrai effet mécanique sur le flux et la nature des requêtes ?
- **Pourrissement des requêtes** — une mission laissée de côté monte-t-elle vraiment de rang, et le joueur en est-il prévenu ?
- **Effectif** — la limite dure est-elle la capacité du dortoir, le volume de contrats, ou les deux ?
- **Négociation** — mini-jeu actif (contre-offres, l'aventurier accepte ou refuse) ou simple curseur avec un risque de refus ?
- **Prix du marché** — le joueur le voit-il toujours exactement, ou une fourchette qui se précise avec un bon estimateur ?
- **Ordre de déblocage** — quelles salles sont disponibles dès le départ, et quelles sont les conditions de déblocage des autres ?

---

## Annexe A — Équipement

Le système d'équipement complet (220 armes, 240 armures, statistiques, tiers, améliorations) fait l'objet d'un document séparé : **`guilde-equipement.md`**, avec les données brutes dans `equipement.json`.

Résumé de son articulation avec le présent document :

- Les **8 tiers** d'équipement sont calés sur les 8 rangs `G`→`S`, et les niveaux minimums sur la table des niveaux par rang (§7).
- La **PUI** d'une arme s'ajoute au niveau du porteur dans le calcul de puissance effective (§8).
- La **PRE** ajuste directement le pourcentage de réussite.
- La **PRO** d'une armure réduit la gravité des conséquences en cas d'échec (§11) — c'est le second levier, avec le guérisseur, qui transforme un mort en blessé.
- L'**ENC** pénalise les missions d'exploration, d'enquête et d'infiltration.
- L'**END** raccourcit les convalescences, en complément du docteur (§13).
- Les **améliorations** consomment des matériaux issus du butin, ce qui relie le commerce (§14) à la puissance en mission.
