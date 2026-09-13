# La Guilde

Jeu de gestion de guilde d'aventuriers, en français, jouable dans le navigateur.
Aucune dépendance, aucun serveur : ouvrez `index.html`.

Vous ne combattez jamais. Vous ne voyez jamais les missions se dérouler. Vous êtes
le maître de guilde : vous recevez les clients, vous jugez la dangerosité réelle de
ce qu'ils racontent, vous fixez les prix, vous décidez qui part — et vous décidez
qui mérite de monter en grade.

Le cœur du jeu n'est pas la puissance des personnages, c'est **la qualité de votre
jugement**. Un maître de guilde qui grade mal une requête ou qui promeut trop vite
envoie ses gens à la mort, et la progression est assez lente pour que ça ne se
répare pas en une semaine.

## Lancer

Clonez ou téléchargez le dépôt, puis ouvrez `index.html` dans un navigateur.
La partie se sauvegarde automatiquement dans le navigateur.

## Commandes

| Touche | Effet |
|--------|-------|
| `Espace` | Pause / reprise |
| `1` `2` | Vitesses accélérées |
| `Échap` | Fermer une fenêtre |

## Premiers pas

1. **Recrutement** — recrutez des candidats. Ils ne demandent pas de salaire, ils sont payés à la mission.
2. **Membres** — attribuez-leur un rang avec ▲. Sans rang, personne ne peut partir.
3. **Requêtes** — gradez un contrat, fixez la part des membres, acceptez.
4. **Tableau** — composez une équipe en respectant la taille conseillée, puis envoyez.
5. Lancez le temps. Les rapports arrivent dans l'onglet **Rapports**.

## Les deux axes

Le **rang** (`G` → `S`) est le permis : il est attribué à la main par le joueur et
détermine uniquement *qui a le droit* de partir sur quelle mission. Le **niveau**
(1 → 100) est la compétence réelle : il s'obtient très lentement et détermine *si
le membre en revient*. Le monde ne lit pas les papiers de la guilde.

Une mission de rang `B` n'est accessible qu'à partir du rang `C`. En dessous, c'est
non, quel que soit le nombre de membres envoyés. Le nombre ne compense jamais
l'incompétence.

## Systèmes implémentés

Temps réel avec pause et deux vitesses, et pause automatique sur événement.
Requêtes clients décrites en langage naturel, dont la difficulté réelle est inconnue,
avec grading par le joueur, part négociable, délai et pourrissement. Reconnaissance
par éclaireur pour réduire l'incertitude. Résolution hors écran avec seuils de
puissance, affinités de classe, rendements décroissants, règle du poids mort et
synergie d'équipe. Conséquences graduées jusqu'à la mort permanente, qui inflige un
choc de moral aux coéquipiers proches. Recrutement où le niveau prétendu diffère du
niveau réel, avec passés cachés. 220 armes et 240 armures réparties en 8 tiers, avec
niveaux minimums et améliorations `+1` à `+5`. Butin, rachat négocié, marché qui
fluctue selon l'offre, revente au marchand ou en boutique. Dix salles à construire
et onze postes d'employés, chacun exigeant sa salle. Réputation, trésorerie et paie
mensuelle à date fixe.

## Structure

```
index.html
css/style.css
js/data/       equipement.js (généré) · donnees.js (classes, natures, salles, postes, requêtes)
js/core/       util.js · etat.js · calculs.js — toutes les formules de résolution
js/systemes/   equipement · membres · requetes · missions · recrutement · commerce · batiment · temps
js/ui/ui.js    rendu des panneaux
js/main.js     boucle de jeu et actions
docs/          document de design complet et annexe équipement
```

Les constantes d'équilibrage sont en haut de `js/data/donnees.js`, les formules dans
`js/core/calculs.js`.

## Reste à faire

Groupes formalisés (la synergie est calculée, mais les groupes n'ont pas d'existence
propre à l'écran). Saisons. Guildes concurrentes. Événements narratifs.
