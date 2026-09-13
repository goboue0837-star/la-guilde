# Jeu de Guilde — Équipement

**Annexe du document de design — v1.0**

*220 armes (20 par classe) et 240 armures (5 types × 6 lignes × 8 tiers). Tous les chiffres sont des valeurs de départ cohérentes entre elles, à affiner en playtest.*

---

## 1. Comment l'équipement se branche sur le système

L'équipement **complète le niveau, il ne le remplace pas**. Un niveau 12 très bien équipé ne vaut toujours pas un niveau 30 en haillons — c'est indispensable pour préserver le principe central du jeu, où le niveau est la compétence réelle.

La contribution d'un membre à la puissance effective de l'équipe devient :

```
contribution = (niveau + PUI_arme) × affinité_classe × coefficient_position
```

Et le pourcentage de réussite final est ajusté par la précision :

```
réussite finale = réussite calculée + Σ PRE de l'équipe / nombre de membres
```

À plein équipement de son tier, un membre gagne environ **25 à 30 % de puissance**. Significatif, jamais décisif.

---

## 2. Les huit tiers

Les tiers d'équipement sont calés sur les huit rangs du jeu. Un équipement de tier 5 est du matériel de rang `C`, et son niveau minimum correspond au niveau typique du rang `C`.

| Tier | Rang | Qualité | PUI de base | Niveau de référence |
|------|------|---------|-------------|---------------------|
| 1 | G | de fortune | 1 | 1 |
| 2 | F | en fer | 2 | 4 |
| 3 | E | en acier | 3 | 8 |
| 4 | D | en acier trempé | 4 | 13 |
| 5 | C | en argent-vif | 6 | 19 |
| 6 | B | en mithril | 8 | 27 |
| 7 | A | en adamantine | 11 | 36 |
| 8 | S | d'orichalque | 15 | 50 |

---

## 3. Les statistiques

### Armes

**PUI — Puissance.** S'ajoute directement au niveau du porteur dans le calcul de puissance effective.

**PRE — Précision.** Points de pourcentage ajoutés (ou retirés) au taux de réussite de la mission.

**MAN — Maniabilité.** De 25 à 88. Détermine le niveau minimum : plus une arme est lourde et difficile à manier, plus il faut être compétent pour en tirer quoi que ce soit.

```
niveau minimum = niveau de référence du tier × (1 + (60 − MAN) / 100)
```

**Sous-niveau : la pénalité.** Un membre sous le niveau minimum ne profite pas de son arme :

```
PUI effective = PUI × (niveau du porteur / niveau minimum)
PRE effective = PRE − 10
```

C'est ce qui empêche d'équiper un débutant avec une arme de rang `S` récupérée en butin. Il aura un espadon d'orichalque et il ne saura pas le soulever.

### Les cinq profils d'arme

| Profil | PUI | PRE | MAN | Lecture |
|--------|-----|-----|-----|---------|
| Brutal | ×1,30 | −7 | 25 | Puissance maximale, très exigeant, imprécis |
| Lourd | ×1,15 | −4 | 40 | Solide et lent |
| Équilibré | ×1,00 | 0 | 60 | La référence |
| Précis | ×0,90 | +4 | 72 | Moins de force, plus de réussite |
| Léger | ×0,82 | +7 | 88 | Accessible très tôt, faible en puissance |

Le profil Brutal semble supérieur sur le papier, mais son niveau minimum est environ **35 % plus élevé** que celui d'une arme équilibrée du même tier. C'est là qu'il se paie.

### Armures

**PRO — Protection.** Pourcentage de réduction de la gravité des conséquences en cas d'échec. C'est ce qui transforme un mort en blessé.

**ENC — Encombrement.** Pénalise les missions d'exploration, d'enquête et d'infiltration, et retire de la précision. Diminue légèrement avec les tiers : de meilleurs matériaux, c'est plus léger.

**END — Endurance.** Réduit la durée de convalescence et la fatigue accumulée.

Le niveau minimum d'une armure dépend de son encombrement :

```
niveau minimum = niveau de référence du tier × (0,85 + ENC / 60)
```

### Les cinq types d'armure

| Type | PRO | ENC | END | Classes |
|------|-----|-----|-----|---------|
| Tissu | ×0.35 | ×0.10 | ×0.60 | Mage, Guérisseur, Nécromancien, Barde |
| Furtive | ×0.50 | ×0.16 | ×0.80 | Voleur, Éclaireur |
| Légère | ×0.70 | ×0.35 | ×1.00 | Archer, Éclaireur, Voleur, Barde |
| Moyenne | ×1.00 | ×0.60 | ×0.90 | Guerrier, Dompteur, Ingénieur, Barde |
| Lourde | ×1.45 | ×1.00 | ×0.70 | Guerrier, Porte-bouclier |

---

## 4. Les améliorations

Tout équipement peut être amélioré de **+1 à +5** à la forge (nouvelle salle du bâtiment de guilde).

| Niveau | Bonus PUI / PRO | Coût en or | Matériaux |
|--------|-----------------|------------|-----------|
| +1 | +8 % | ×1 | 2 |
| +2 | +17 % | ×2,5 | 4 |
| +3 | +27 % | ×6 | 8 |
| +4 | +38 % | ×14 | 14 |
| +5 | +50 % | ×32 | 24 |

Les matériaux proviennent du **butin des missions**, ce qui ferme la boucle économique du jeu :

> missions → butin → rachat au comptoir → matériaux → forge → équipement amélioré → missions plus dures

Une arme +5 de tier 6 rivalise en PUI avec une arme de tier 7 non améliorée, mais coûte beaucoup moins cher à obtenir que de trouver du tier 7 — **et surtout, elle garde le niveau minimum du tier 6**. C'est la voie de progression des guildes qui n'ont pas encore accès au haut rang : équiper solidement des membres moyens plutôt que rêver de matériel qu'ils ne pourraient pas porter.

---

## 5. Armes par classe


### Guerrier

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Gourdin de fortune | 1 | G | Brutal | 1.3 | -7 | 25 | 1 | — |
| Épée courte de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Hachette en fer | 2 | F | Léger | 1.6 | +7 | 88 | 3 | — |
| Lance de milice en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Épée longue en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Hache d'armes en acier | 3 | E | Lourd | 3.4 | -4 | 40 | 10 | — |
| Masse en acier | 3 | E | Lourd | 3.4 | -4 | 40 | 10 | — |
| Glaive en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | — |
| Falchion en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | — |
| Fléau en acier trempé | 4 | D | Brutal | 5.2 | -7 | 25 | 18 | +8% siège |
| Cimeterre en argent-vif | 5 | C | Léger | 4.9 | +7 | 88 | 14 | — |
| Épée bâtarde en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | — |
| Hallebarde en argent-vif | 5 | C | Lourd | 6.9 | -4 | 40 | 23 | +10% extermination |
| Marteau de guerre en mithril | 6 | B | Brutal | 10.4 | -7 | 25 | 36 | — |
| Pique de bataille en mithril | 6 | B | Précis | 7.2 | +4 | 72 | 24 | — |
| Espadon en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | +12% siège |
| Claymore en adamantine | 7 | A | Brutal | 14.3 | -7 | 25 | 49 | — |
| Guisarme en adamantine | 7 | A | Précis | 9.9 | +4 | 72 | 32 | — |
| Brise-écus d'orichalque | 8 | S | Brutal | 19.5 | -7 | 25 | 68 | +16% extermination |
| Lame de commandement d'orichalque | 8 | S | Équilibré | 15.0 | 0 | 60 | 50 | — |

### Archer

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Fronde de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Arc court de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Sarbacane en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Javelot en fer | 2 | F | Lourd | 2.3 | -4 | 40 | 5 | — |
| Arc de chasse en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Arbalète de poing en acier | 3 | E | Léger | 2.5 | +7 | 88 | 6 | — |
| Arc d'os en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Arc de corne en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | — |
| Arbalète légère en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | — |
| Arc long en acier trempé | 4 | D | Lourd | 4.6 | -4 | 40 | 16 | +8% extermination |
| Lance-javelot en argent-vif | 5 | C | Brutal | 7.8 | -7 | 25 | 26 | — |
| Arc recourbé en argent-vif | 5 | C | Léger | 4.9 | +7 | 88 | 14 | — |
| Arc composite en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | +10% chasse |
| Arbalète lourde en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | — |
| Arc sylvestre en mithril | 6 | B | Précis | 7.2 | +4 | 72 | 24 | — |
| Grand arc de guerre en mithril | 6 | B | Brutal | 10.4 | -7 | 25 | 36 | +12% extermination |
| Arbalète à répétition en adamantine | 7 | A | Équilibré | 11.0 | 0 | 60 | 36 | — |
| Arc de siège en adamantine | 7 | A | Lourd | 12.6 | -4 | 40 | 43 | — |
| Arbalète de siège d'orichalque | 8 | S | Brutal | 19.5 | -7 | 25 | 68 | +16% chasse |
| Arc du long silence d'orichalque | 8 | S | Précis | 13.5 | +4 | 72 | 44 | — |

### Mage

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Baguette fendue de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Bâton noueux de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Talisman de verre en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Verge de cuivre en fer | 2 | F | Équilibré | 2.0 | 0 | 60 | 4 | — |
| Grimoire d'apprenti en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Orbe trouble en acier | 3 | E | Lourd | 3.4 | -4 | 40 | 10 | — |
| Canne runique en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Focus de quartz en acier trempé | 4 | D | Léger | 3.3 | +7 | 88 | 9 | — |
| Sceptre gravé en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | — |
| Tome relié en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | +8% siège |
| Prisme en argent-vif | 5 | C | Léger | 4.9 | +7 | 88 | 14 | — |
| Bâton élémentaire en argent-vif | 5 | C | Lourd | 6.9 | -4 | 40 | 23 | — |
| Sphère d'ambre en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | +10% extermination |
| Sceptre runique en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | — |
| Codex scellé en mithril | 6 | B | Précis | 7.2 | +4 | 72 | 24 | — |
| Bâton de tempête en mithril | 6 | B | Brutal | 10.4 | -7 | 25 | 36 | +12% siège |
| Orbe de vide en adamantine | 7 | A | Brutal | 14.3 | -7 | 25 | 49 | — |
| Étoile astrale en adamantine | 7 | A | Précis | 9.9 | +4 | 72 | 32 | — |
| Bâton du premier cercle d'orichalque | 8 | S | Lourd | 17.2 | -4 | 40 | 60 | +16% extermination |
| Cœur de foudre d'orichalque | 8 | S | Brutal | 19.5 | -7 | 25 | 68 | — |

### Guérisseur

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Bandages et attelles de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Bâton d'apothicaire de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Mortier portatif en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Chapelet de perles en fer | 2 | F | Léger | 1.6 | +7 | 88 | 3 | — |
| Symbole sacré en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Encensoir en acier | 3 | E | Lourd | 3.4 | -4 | 40 | 10 | — |
| Calice d'étain en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Herbier relié en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | — |
| Bâton d'aubépine en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | — |
| Trousse de campagne en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | +8% purification |
| Cloche votive en argent-vif | 5 | C | Lourd | 6.9 | -4 | 40 | 23 | — |
| Icône peinte en argent-vif | 5 | C | Léger | 4.9 | +7 | 88 | 14 | — |
| Crosse de prêtre en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | +10% escorte |
| Relique mineure en mithril | 6 | B | Précis | 7.2 | +4 | 72 | 24 | — |
| Étole bénie en mithril | 6 | B | Léger | 6.6 | +7 | 88 | 19 | — |
| Sceptre de vie en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | +12% purification |
| Calice d'argent en adamantine | 7 | A | Équilibré | 11.0 | 0 | 60 | 36 | — |
| Reliquaire scellé en adamantine | 7 | A | Précis | 9.9 | +4 | 72 | 32 | — |
| Crosse du sanctuaire d'orichalque | 8 | S | Lourd | 17.2 | -4 | 40 | 60 | +16% escorte |
| Larme du premier soin d'orichalque | 8 | S | Précis | 13.5 | +4 | 72 | 44 | — |

### Porte-bouclier

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Planche cloutée de fortune | 1 | G | Brutal | 1.3 | -7 | 25 | 1 | — |
| Targe de bois de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Rondache en fer | 2 | F | Équilibré | 2.0 | 0 | 60 | 4 | — |
| Bouclier à bosse en fer | 2 | F | Lourd | 2.3 | -4 | 40 | 5 | — |
| Écu de fantassin en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Targe d'acier en acier | 3 | E | Léger | 2.5 | +7 | 88 | 6 | — |
| Écu long en acier | 3 | E | Lourd | 3.4 | -4 | 40 | 10 | — |
| Bouclier à pointes en acier trempé | 4 | D | Brutal | 5.2 | -7 | 25 | 18 | — |
| Écu de tournoi en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | — |
| Pavois leger en acier trempé | 4 | D | Lourd | 4.6 | -4 | 40 | 16 | +8% siège |
| Rondache d'argent en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | — |
| Écu gravé en argent-vif | 5 | C | Précis | 5.4 | +4 | 72 | 17 | — |
| Pavois de siège en argent-vif | 5 | C | Brutal | 7.8 | -7 | 25 | 26 | +10% escorte |
| Bouclier-tour en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | — |
| Écu runique en mithril | 6 | B | Précis | 7.2 | +4 | 72 | 24 | — |
| Pavois d'acier noir en mithril | 6 | B | Brutal | 10.4 | -7 | 25 | 36 | +12% siège |
| Bouclier du rempart en adamantine | 7 | A | Lourd | 12.6 | -4 | 40 | 43 | — |
| Écu de sanctuaire en adamantine | 7 | A | Précis | 9.9 | +4 | 72 | 32 | — |
| Mur de guerre d'orichalque | 8 | S | Brutal | 19.5 | -7 | 25 | 68 | +16% escorte |
| Écu de la dernière ligne d'orichalque | 8 | S | Lourd | 17.2 | -4 | 40 | 60 | — |

### Éclaireur

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Bâton de marche de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Couteau de camp de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Serpe en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Fronde de berger en fer | 2 | F | Léger | 1.6 | +7 | 88 | 3 | — |
| Machette en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Arc court de piste en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Lance légère en acier | 3 | E | Lourd | 3.4 | -4 | 40 | 10 | — |
| Corde lestée en acier trempé | 4 | D | Léger | 3.3 | +7 | 88 | 9 | — |
| Hachette de piste en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | — |
| Filet de chasse en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | +8% enquête |
| Épieu en argent-vif | 5 | C | Lourd | 6.9 | -4 | 40 | 23 | — |
| Couteau long en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | — |
| Arc de piste en argent-vif | 5 | C | Précis | 5.4 | +4 | 72 | 17 | +10% exploration |
| Lance de battue en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | — |
| Faux de sentier en mithril | 6 | B | Brutal | 10.4 | -7 | 25 | 36 | — |
| Arc de reconnaissance en mithril | 6 | B | Précis | 7.2 | +4 | 72 | 24 | +12% enquête |
| Lame de frontière en adamantine | 7 | A | Équilibré | 11.0 | 0 | 60 | 36 | — |
| Épieu renforcé en adamantine | 7 | A | Lourd | 12.6 | -4 | 40 | 43 | — |
| Arc des marches d'orichalque | 8 | S | Précis | 13.5 | +4 | 72 | 44 | +16% exploration |
| Lame du guide d'orichalque | 8 | S | Léger | 12.3 | +7 | 88 | 36 | — |

### Voleur

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Surin de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Dague de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Matraque en fer | 2 | F | Lourd | 2.3 | -4 | 40 | 5 | — |
| Couteau de lancer en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Stylet en acier | 3 | E | Léger | 2.5 | +7 | 88 | 6 | — |
| Poignard courbé en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Garrot en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Main-gauche en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | — |
| Griffe de gouttière en acier trempé | 4 | D | Léger | 3.3 | +7 | 88 | 9 | — |
| Kriss en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | +8% enquête |
| Rapière en argent-vif | 5 | C | Précis | 5.4 | +4 | 72 | 17 | — |
| Dague à bris en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | — |
| Sarbacane enduite en argent-vif | 5 | C | Précis | 5.4 | +4 | 72 | 17 | +10% récupération |
| Cimeterre court en mithril | 6 | B | Léger | 6.6 | +7 | 88 | 19 | — |
| Lame jumelle en mithril | 6 | B | Équilibré | 8.0 | 0 | 60 | 27 | — |
| Stylet d'ombre en mithril | 6 | B | Léger | 6.6 | +7 | 88 | 19 | +12% enquête |
| Dague de rupture en adamantine | 7 | A | Brutal | 14.3 | -7 | 25 | 49 | — |
| Rapière de duel en adamantine | 7 | A | Précis | 9.9 | +4 | 72 | 32 | — |
| Lame silencieuse d'orichalque | 8 | S | Léger | 12.3 | +7 | 88 | 36 | +16% récupération |
| Croc de minuit d'orichalque | 8 | S | Précis | 13.5 | +4 | 72 | 44 | — |

### Barde

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Flûte de roseau de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Tambourin de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Luth usé en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Cor de chasse en fer | 2 | F | Lourd | 2.3 | -4 | 40 | 5 | — |
| Lyre en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Chalemie en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Vielle à roue en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Épée de cour en acier trempé | 4 | D | Léger | 3.3 | +7 | 88 | 9 | — |
| Harpe de voyage en acier trempé | 4 | D | Précis | 3.6 | +4 | 72 | 11 | — |
| Psaltérion en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | +8% enquête |
| Cornemuse en argent-vif | 5 | C | Lourd | 6.9 | -4 | 40 | 23 | — |
| Rapière de scene en argent-vif | 5 | C | Précis | 5.4 | +4 | 72 | 17 | — |
| Luth gravé en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | +10% escorte |
| Cor de guerre en mithril | 6 | B | Brutal | 10.4 | -7 | 25 | 36 | — |
| Harpe d'argent en mithril | 6 | B | Précis | 7.2 | +4 | 72 | 24 | — |
| Lyre runique en mithril | 6 | B | Équilibré | 8.0 | 0 | 60 | 27 | +12% enquête |
| Tambour de marche en adamantine | 7 | A | Lourd | 12.6 | -4 | 40 | 43 | — |
| Harpe de cour en adamantine | 7 | A | Précis | 9.9 | +4 | 72 | 32 | — |
| Cor du rassemblement d'orichalque | 8 | S | Brutal | 19.5 | -7 | 25 | 68 | +16% escorte |
| Chant de la première corde d'orichalque | 8 | S | Précis | 13.5 | +4 | 72 | 44 | — |

### Ingénieur

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Marteau de charpentier de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Pied-de-biche de fortune | 1 | G | Lourd | 1.1 | -4 | 40 | 1 | — |
| Pic de mine en fer | 2 | F | Brutal | 2.6 | -7 | 25 | 5 | — |
| Tarière en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Masse à démolir en acier | 3 | E | Brutal | 3.9 | -7 | 25 | 11 | — |
| Grappin en acier | 3 | E | Léger | 2.5 | +7 | 88 | 6 | — |
| Chausse-trapes en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Arbalète mécanique en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | — |
| Charge incendiaire en acier trempé | 4 | D | Brutal | 5.2 | -7 | 25 | 18 | — |
| Bélier portatif en acier trempé | 4 | D | Lourd | 4.6 | -4 | 40 | 16 | +8% récupération |
| Piège à mâchoires en argent-vif | 5 | C | Précis | 5.4 | +4 | 72 | 17 | — |
| Bombe à fragmentation en argent-vif | 5 | C | Brutal | 7.8 | -7 | 25 | 26 | — |
| Baliste portative en argent-vif | 5 | C | Lourd | 6.9 | -4 | 40 | 23 | +10% siège |
| Foreuse à main en mithril | 6 | B | Équilibré | 8.0 | 0 | 60 | 27 | — |
| Mine de sape en mithril | 6 | B | Brutal | 10.4 | -7 | 25 | 36 | — |
| Tourelle démontable en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | +12% récupération |
| Lance-grappin lourd en adamantine | 7 | A | Équilibré | 11.0 | 0 | 60 | 36 | — |
| Charge de rupture en adamantine | 7 | A | Brutal | 14.3 | -7 | 25 | 49 | — |
| Baliste de siège d'orichalque | 8 | S | Lourd | 17.2 | -4 | 40 | 60 | +16% siège |
| Mecanisme du brise-mur d'orichalque | 8 | S | Brutal | 19.5 | -7 | 25 | 68 | — |

### Dompteur

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Bâton d'aiguillon de fortune | 1 | G | Équilibré | 1.0 | 0 | 60 | 1 | — |
| Fouet de cuir de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Lasso en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Muselière de corde en fer | 2 | F | Précis | 1.8 | +4 | 72 | 4 | — |
| Épieu à sanglier en acier | 3 | E | Lourd | 3.4 | -4 | 40 | 10 | — |
| Filet lesté en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Cor d'appel en acier | 3 | E | Léger | 2.5 | +7 | 88 | 6 | — |
| Harpon en acier trempé | 4 | D | Lourd | 4.6 | -4 | 40 | 16 | — |
| Fouet clouté en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | — |
| Trident en acier trempé | 4 | D | Lourd | 4.6 | -4 | 40 | 16 | +8% exploration |
| Aiguillon d'acier en argent-vif | 5 | C | Équilibré | 6.0 | 0 | 60 | 19 | — |
| Bolas en argent-vif | 5 | C | Précis | 5.4 | +4 | 72 | 17 | — |
| Épieu de battue en argent-vif | 5 | C | Brutal | 7.8 | -7 | 25 | 26 | +10% chasse |
| Filet d'acier en mithril | 6 | B | Précis | 7.2 | +4 | 72 | 24 | — |
| Fouet d'argent en mithril | 6 | B | Équilibré | 8.0 | 0 | 60 | 27 | — |
| Trident de meute en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | +12% exploration |
| Cor de domination en adamantine | 7 | A | Précis | 9.9 | +4 | 72 | 32 | — |
| Harpon à chaîne en adamantine | 7 | A | Brutal | 14.3 | -7 | 25 | 49 | — |
| Épieu du dompteur d'orichalque | 8 | S | Lourd | 17.2 | -4 | 40 | 60 | +16% chasse |
| Voix des bêtes d'orichalque | 8 | S | Précis | 13.5 | +4 | 72 | 44 | — |

### Nécromancien

| Arme | Tier | Rang | Profil | PUI | PRE | MAN | Niv. min | Spécial |
|------|------|------|--------|-----|-----|-----|----------|---------|
| Os gravé de fortune | 1 | G | Léger | 0.8 | +7 | 88 | 1 | — |
| Dague sacrificielle de fortune | 1 | G | Précis | 0.9 | +4 | 72 | 1 | — |
| Crâne monte en fer | 2 | F | Équilibré | 2.0 | 0 | 60 | 4 | — |
| Urne funéraire en fer | 2 | F | Lourd | 2.3 | -4 | 40 | 5 | — |
| Bâton d'os en acier | 3 | E | Équilibré | 3.0 | 0 | 60 | 8 | — |
| Lanterne d'âmes en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Grimoire noir en acier | 3 | E | Précis | 2.7 | +4 | 72 | 7 | — |
| Faucille rituelle en acier trempé | 4 | D | Léger | 3.3 | +7 | 88 | 9 | — |
| Sceptre d'ossements en acier trempé | 4 | D | Équilibré | 4.0 | 0 | 60 | 13 | — |
| Reliquaire profane en acier trempé | 4 | D | Lourd | 4.6 | -4 | 40 | 16 | +8% extermination |
| Chaîne d'âmes en argent-vif | 5 | C | Brutal | 7.8 | -7 | 25 | 26 | — |
| Codex des cendres en argent-vif | 5 | C | Précis | 5.4 | +4 | 72 | 17 | — |
| Faux de deuil en argent-vif | 5 | C | Lourd | 6.9 | -4 | 40 | 23 | +10% purification |
| Croix inversée en mithril | 6 | B | Équilibré | 8.0 | 0 | 60 | 27 | — |
| Urne des mille en mithril | 6 | B | Brutal | 10.4 | -7 | 25 | 36 | — |
| Sceptre du charnier en mithril | 6 | B | Lourd | 9.2 | -4 | 40 | 32 | +12% extermination |
| Grimoire des veilles en adamantine | 7 | A | Précis | 9.9 | +4 | 72 | 32 | — |
| Faux du passeur en adamantine | 7 | A | Brutal | 14.3 | -7 | 25 | 49 | — |
| Cœur d'obsidienne d'orichalque | 8 | S | Brutal | 19.5 | -7 | 25 | 68 | +16% purification |
| Voix du dernier souffle d'orichalque | 8 | S | Précis | 13.5 | +4 | 72 | 44 | — |

---

## 6. Armures par type


### Armure tissu

*Classes : Mage, Guérisseur, Nécromancien, Barde*

| Armure | Tier | Rang | PRO | ENC | END | Niv. min | Spécial |
|--------|------|------|-----|-----|-----|----------|---------|
| Robe de novice de fortune | 1 | G | 2 | 2 | 2 | 1 | — |
| Robe de novice en fer | 2 | F | 3 | 2 | 3 | 4 | — |
| Robe de novice en acier | 3 | E | 5 | 2 | 5 | 7 | — |
| Robe de novice en acier trempé | 4 | D | 7 | 2 | 7 | 11 | — |
| Robe de novice en argent-vif | 5 | C | 9 | 2 | 9 | 17 | — |
| Robe de novice en mithril | 6 | B | 12 | 2 | 11 | 24 | — |
| Robe de novice en adamantine | 7 | A | 15 | 2 | 14 | 32 | — |
| Robe de novice d'orichalque | 8 | S | 19 | 2 | 18 | 44 | — |
| Toge d'étude de fortune | 1 | G | 1 | 2 | 2 | 1 | +10% gain d'XP |
| Toge d'étude en fer | 2 | F | 3 | 2 | 3 | 4 | +10% gain d'XP |
| Toge d'étude en acier | 3 | E | 4 | 2 | 5 | 7 | +10% gain d'XP |
| Toge d'étude en acier trempé | 4 | D | 6 | 2 | 7 | 11 | +10% gain d'XP |
| Toge d'étude en argent-vif | 5 | C | 8 | 2 | 10 | 17 | +10% gain d'XP |
| Toge d'étude en mithril | 6 | B | 10 | 2 | 13 | 24 | +10% gain d'XP |
| Toge d'étude en adamantine | 7 | A | 13 | 1 | 16 | 31 | +10% gain d'XP |
| Toge d'étude d'orichalque | 8 | S | 16 | 1 | 20 | 43 | +10% gain d'XP |
| Manteau de voyage de fortune | 1 | G | 2 | 2 | 2 | 1 | -15% durée de trajet |
| Manteau de voyage en fer | 2 | F | 3 | 2 | 4 | 4 | -15% durée de trajet |
| Manteau de voyage en acier | 3 | E | 5 | 2 | 6 | 7 | -15% durée de trajet |
| Manteau de voyage en acier trempé | 4 | D | 7 | 2 | 8 | 11 | -15% durée de trajet |
| Manteau de voyage en argent-vif | 5 | C | 9 | 2 | 11 | 17 | -15% durée de trajet |
| Manteau de voyage en mithril | 6 | B | 12 | 2 | 14 | 24 | -15% durée de trajet |
| Manteau de voyage en adamantine | 7 | A | 15 | 2 | 18 | 32 | -15% durée de trajet |
| Manteau de voyage d'orichalque | 8 | S | 18 | 2 | 22 | 44 | -15% durée de trajet |
| Habit de cérémonie de fortune | 1 | G | 1 | 2 | 2 | 1 | +8% négociation et réputation |
| Habit de cérémonie en fer | 2 | F | 3 | 2 | 3 | 4 | +8% négociation et réputation |
| Habit de cérémonie en acier | 3 | E | 4 | 2 | 5 | 7 | +8% négociation et réputation |
| Habit de cérémonie en acier trempé | 4 | D | 6 | 2 | 6 | 11 | +8% négociation et réputation |
| Habit de cérémonie en argent-vif | 5 | C | 8 | 2 | 9 | 17 | +8% négociation et réputation |
| Habit de cérémonie en mithril | 6 | B | 10 | 2 | 11 | 24 | +8% négociation et réputation |
| Habit de cérémonie en adamantine | 7 | A | 12 | 2 | 14 | 32 | +8% négociation et réputation |
| Habit de cérémonie d'orichalque | 8 | S | 15 | 1 | 17 | 43 | +8% négociation et réputation |
| Robe runique de fortune | 1 | G | 2 | 3 | 2 | 1 | +12% puissance des classes à focus |
| Robe runique en fer | 2 | F | 4 | 2 | 3 | 4 | +12% puissance des classes à focus |
| Robe runique en acier | 3 | E | 6 | 2 | 4 | 7 | +12% puissance des classes à focus |
| Robe runique en acier trempé | 4 | D | 8 | 2 | 6 | 11 | +12% puissance des classes à focus |
| Robe runique en argent-vif | 5 | C | 11 | 2 | 8 | 17 | +12% puissance des classes à focus |
| Robe runique en mithril | 6 | B | 15 | 2 | 10 | 24 | +12% puissance des classes à focus |
| Robe runique en adamantine | 7 | A | 18 | 2 | 13 | 32 | +12% puissance des classes à focus |
| Robe runique d'orichalque | 8 | S | 23 | 2 | 16 | 44 | +12% puissance des classes à focus |
| Chasuble de soin de fortune | 1 | G | 2 | 2 | 2 | 1 | +15% efficacité des guérisseurs |
| Chasuble de soin en fer | 2 | F | 3 | 2 | 4 | 4 | +15% efficacité des guérisseurs |
| Chasuble de soin en acier | 3 | E | 5 | 2 | 6 | 7 | +15% efficacité des guérisseurs |
| Chasuble de soin en acier trempé | 4 | D | 7 | 2 | 8 | 11 | +15% efficacité des guérisseurs |
| Chasuble de soin en argent-vif | 5 | C | 10 | 2 | 11 | 17 | +15% efficacité des guérisseurs |
| Chasuble de soin en mithril | 6 | B | 13 | 2 | 14 | 24 | +15% efficacité des guérisseurs |
| Chasuble de soin en adamantine | 7 | A | 16 | 2 | 17 | 32 | +15% efficacité des guérisseurs |
| Chasuble de soin d'orichalque | 8 | S | 20 | 2 | 22 | 44 | +15% efficacité des guérisseurs |

### Armure furtive

*Classes : Voleur, Éclaireur*

| Armure | Tier | Rang | PRO | ENC | END | Niv. min | Spécial |
|--------|------|------|-----|-----|-----|----------|---------|
| Tenue de nuit de fortune | 1 | G | 2 | 4 | 2 | 1 | — |
| Tenue de nuit en fer | 2 | F | 4 | 3 | 4 | 4 | — |
| Tenue de nuit en acier | 3 | E | 7 | 3 | 6 | 7 | — |
| Tenue de nuit en acier trempé | 4 | D | 10 | 3 | 9 | 12 | — |
| Tenue de nuit en argent-vif | 5 | C | 14 | 3 | 12 | 17 | — |
| Tenue de nuit en mithril | 6 | B | 18 | 3 | 15 | 24 | — |
| Tenue de nuit en adamantine | 7 | A | 22 | 3 | 19 | 32 | — |
| Tenue de nuit d'orichalque | 8 | S | 28 | 2 | 24 | 44 | — |
| Cuir souple huilé de fortune | 1 | G | 3 | 3 | 3 | 1 | +10% récupération |
| Cuir souple huilé en fer | 2 | F | 5 | 3 | 4 | 4 | +10% récupération |
| Cuir souple huilé en acier | 3 | E | 8 | 3 | 7 | 7 | +10% récupération |
| Cuir souple huilé en acier trempé | 4 | D | 11 | 3 | 9 | 12 | +10% récupération |
| Cuir souple huilé en argent-vif | 5 | C | 15 | 3 | 13 | 17 | +10% récupération |
| Cuir souple huilé en mithril | 6 | B | 19 | 2 | 16 | 24 | +10% récupération |
| Cuir souple huilé en adamantine | 7 | A | 24 | 2 | 20 | 32 | +10% récupération |
| Cuir souple huilé d'orichalque | 8 | S | 30 | 2 | 25 | 44 | +10% récupération |
| Cape d'ombre de fortune | 1 | G | 2 | 3 | 2 | 1 | +15% enquête et récupération |
| Cape d'ombre en fer | 2 | F | 4 | 3 | 4 | 4 | +15% enquête et récupération |
| Cape d'ombre en acier | 3 | E | 6 | 3 | 6 | 7 | +15% enquête et récupération |
| Cape d'ombre en acier trempé | 4 | D | 9 | 2 | 8 | 11 | +15% enquête et récupération |
| Cape d'ombre en argent-vif | 5 | C | 12 | 2 | 11 | 17 | +15% enquête et récupération |
| Cape d'ombre en mithril | 6 | B | 16 | 2 | 14 | 24 | +15% enquête et récupération |
| Cape d'ombre en adamantine | 7 | A | 20 | 2 | 18 | 32 | +15% enquête et récupération |
| Cape d'ombre d'orichalque | 8 | S | 25 | 2 | 23 | 44 | +15% enquête et récupération |
| Harnais de grimpe de fortune | 1 | G | 2 | 4 | 3 | 1 | +12% exploration |
| Harnais de grimpe en fer | 2 | F | 4 | 4 | 4 | 4 | +12% exploration |
| Harnais de grimpe en acier | 3 | E | 7 | 3 | 7 | 7 | +12% exploration |
| Harnais de grimpe en acier trempé | 4 | D | 10 | 3 | 10 | 12 | +12% exploration |
| Harnais de grimpe en argent-vif | 5 | C | 13 | 3 | 13 | 17 | +12% exploration |
| Harnais de grimpe en mithril | 6 | B | 17 | 3 | 17 | 24 | +12% exploration |
| Harnais de grimpe en adamantine | 7 | A | 21 | 3 | 21 | 32 | +12% exploration |
| Harnais de grimpe d'orichalque | 8 | S | 26 | 3 | 26 | 45 | +12% exploration |
| Voile de brume de fortune | 1 | G | 2 | 2 | 2 | 1 | -20% risque de pertes en cas d'echec |
| Voile de brume en fer | 2 | F | 4 | 2 | 4 | 4 | -20% risque de pertes en cas d'echec |
| Voile de brume en acier | 3 | E | 6 | 2 | 6 | 7 | -20% risque de pertes en cas d'echec |
| Voile de brume en acier trempé | 4 | D | 8 | 2 | 8 | 11 | -20% risque de pertes en cas d'echec |
| Voile de brume en argent-vif | 5 | C | 11 | 2 | 11 | 17 | -20% risque de pertes en cas d'echec |
| Voile de brume en mithril | 6 | B | 15 | 2 | 14 | 24 | -20% risque de pertes en cas d'echec |
| Voile de brume en adamantine | 7 | A | 19 | 2 | 17 | 32 | -20% risque de pertes en cas d'echec |
| Voile de brume d'orichalque | 8 | S | 23 | 2 | 22 | 44 | -20% risque de pertes en cas d'echec |
| Manteau du silence de fortune | 1 | G | 3 | 3 | 2 | 1 | +18% missions d'infiltration |
| Manteau du silence en fer | 2 | F | 5 | 3 | 4 | 4 | +18% missions d'infiltration |
| Manteau du silence en acier | 3 | E | 8 | 3 | 6 | 7 | +18% missions d'infiltration |
| Manteau du silence en acier trempé | 4 | D | 12 | 3 | 9 | 12 | +18% missions d'infiltration |
| Manteau du silence en argent-vif | 5 | C | 16 | 2 | 12 | 17 | +18% missions d'infiltration |
| Manteau du silence en mithril | 6 | B | 20 | 2 | 15 | 24 | +18% missions d'infiltration |
| Manteau du silence en adamantine | 7 | A | 25 | 2 | 19 | 32 | +18% missions d'infiltration |
| Manteau du silence d'orichalque | 8 | S | 32 | 2 | 24 | 44 | +18% missions d'infiltration |

### Armure légère

*Classes : Archer, Éclaireur, Voleur, Barde*

| Armure | Tier | Rang | PRO | ENC | END | Niv. min | Spécial |
|--------|------|------|-----|-----|-----|----------|---------|
| Gambison de fortune | 1 | G | 4 | 8 | 3 | 1 | — |
| Gambison en fer | 2 | F | 6 | 7 | 5 | 4 | — |
| Gambison en acier | 3 | E | 10 | 7 | 8 | 8 | — |
| Gambison en acier trempé | 4 | D | 14 | 7 | 11 | 13 | — |
| Gambison en argent-vif | 5 | C | 19 | 6 | 15 | 18 | — |
| Gambison en mithril | 6 | B | 24 | 6 | 19 | 26 | — |
| Gambison en adamantine | 7 | A | 31 | 6 | 24 | 34 | — |
| Gambison d'orichalque | 8 | S | 38 | 5 | 30 | 47 | — |
| Cuir clouté de fortune | 1 | G | 4 | 8 | 3 | 1 | — |
| Cuir clouté en fer | 2 | F | 7 | 8 | 5 | 4 | — |
| Cuir clouté en acier | 3 | E | 11 | 8 | 8 | 8 | — |
| Cuir clouté en acier trempé | 4 | D | 16 | 7 | 10 | 13 | — |
| Cuir clouté en argent-vif | 5 | C | 22 | 7 | 14 | 18 | — |
| Cuir clouté en mithril | 6 | B | 28 | 7 | 18 | 26 | — |
| Cuir clouté en adamantine | 7 | A | 35 | 6 | 23 | 34 | — |
| Cuir clouté d'orichalque | 8 | S | 44 | 6 | 28 | 48 | — |
| Brigandine légère de fortune | 1 | G | 4 | 9 | 3 | 1 | +8% extermination |
| Brigandine légère en fer | 2 | F | 8 | 9 | 4 | 4 | +8% extermination |
| Brigandine légère en acier | 3 | E | 12 | 8 | 7 | 8 | +8% extermination |
| Brigandine légère en acier trempé | 4 | D | 18 | 8 | 10 | 13 | +8% extermination |
| Brigandine légère en argent-vif | 5 | C | 24 | 8 | 14 | 19 | +8% extermination |
| Brigandine légère en mithril | 6 | B | 31 | 7 | 17 | 26 | +8% extermination |
| Brigandine légère en adamantine | 7 | A | 38 | 7 | 22 | 35 | +8% extermination |
| Brigandine légère d'orichalque | 8 | S | 48 | 6 | 27 | 48 | +8% extermination |
| Tenue d'archer de fortune | 1 | G | 3 | 7 | 3 | 1 | +10% précision à distance |
| Tenue d'archer en fer | 2 | F | 6 | 6 | 5 | 4 | +10% précision à distance |
| Tenue d'archer en acier | 3 | E | 9 | 6 | 8 | 8 | +10% précision à distance |
| Tenue d'archer en acier trempé | 4 | D | 13 | 6 | 12 | 12 | +10% précision à distance |
| Tenue d'archer en argent-vif | 5 | C | 18 | 5 | 16 | 18 | +10% précision à distance |
| Tenue d'archer en mithril | 6 | B | 23 | 5 | 20 | 25 | +10% précision à distance |
| Tenue d'archer en adamantine | 7 | A | 29 | 5 | 25 | 34 | +10% précision à distance |
| Tenue d'archer d'orichalque | 8 | S | 37 | 4 | 32 | 46 | +10% précision à distance |
| Cuir de battue de fortune | 1 | G | 4 | 8 | 3 | 1 | +12% chasse |
| Cuir de battue en fer | 2 | F | 7 | 7 | 6 | 4 | +12% chasse |
| Cuir de battue en acier | 3 | E | 10 | 7 | 9 | 8 | +12% chasse |
| Cuir de battue en acier trempé | 4 | D | 15 | 7 | 13 | 13 | +12% chasse |
| Cuir de battue en argent-vif | 5 | C | 20 | 6 | 17 | 18 | +12% chasse |
| Cuir de battue en mithril | 6 | B | 26 | 6 | 22 | 26 | +12% chasse |
| Cuir de battue en adamantine | 7 | A | 32 | 6 | 28 | 34 | +12% chasse |
| Cuir de battue d'orichalque | 8 | S | 40 | 5 | 34 | 47 | +12% chasse |
| Jaque de campagne de fortune | 1 | G | 4 | 8 | 4 | 1 | -20% durée de convalescence |
| Jaque de campagne en fer | 2 | F | 7 | 8 | 6 | 4 | -20% durée de convalescence |
| Jaque de campagne en acier | 3 | E | 11 | 7 | 10 | 8 | -20% durée de convalescence |
| Jaque de campagne en acier trempé | 4 | D | 15 | 7 | 14 | 13 | -20% durée de convalescence |
| Jaque de campagne en argent-vif | 5 | C | 21 | 7 | 19 | 18 | -20% durée de convalescence |
| Jaque de campagne en mithril | 6 | B | 27 | 6 | 24 | 26 | -20% durée de convalescence |
| Jaque de campagne en adamantine | 7 | A | 34 | 6 | 30 | 34 | -20% durée de convalescence |
| Jaque de campagne d'orichalque | 8 | S | 42 | 6 | 38 | 48 | -20% durée de convalescence |

### Armure moyenne

*Classes : Guerrier, Dompteur, Ingénieur, Barde*

| Armure | Tier | Rang | PRO | ENC | END | Niv. min | Spécial |
|--------|------|------|-----|-----|-----|----------|---------|
| Broigne de fortune | 1 | G | 5 | 13 | 3 | 1 | — |
| Broigne en fer | 2 | F | 9 | 13 | 4 | 4 | — |
| Broigne en acier | 3 | E | 14 | 12 | 7 | 8 | — |
| Broigne en acier trempé | 4 | D | 20 | 11 | 10 | 13 | — |
| Broigne en argent-vif | 5 | C | 27 | 11 | 14 | 20 | — |
| Broigne en mithril | 6 | B | 35 | 10 | 17 | 27 | — |
| Broigne en adamantine | 7 | A | 44 | 10 | 22 | 37 | — |
| Broigne d'orichalque | 8 | S | 55 | 9 | 27 | 50 | — |
| Cotte de mailles de fortune | 1 | G | 6 | 15 | 3 | 1 | — |
| Cotte de mailles en fer | 2 | F | 10 | 14 | 4 | 4 | — |
| Cotte de mailles en acier | 3 | E | 16 | 13 | 7 | 9 | — |
| Cotte de mailles en acier trempé | 4 | D | 23 | 13 | 9 | 14 | — |
| Cotte de mailles en argent-vif | 5 | C | 31 | 12 | 13 | 20 | — |
| Cotte de mailles en mithril | 6 | B | 40 | 11 | 16 | 28 | — |
| Cotte de mailles en adamantine | 7 | A | 51 | 11 | 21 | 37 | — |
| Cotte de mailles d'orichalque | 8 | S | 63 | 10 | 26 | 51 | — |
| Écailles d'acier de fortune | 1 | G | 6 | 16 | 2 | 1 | +10% extermination |
| Écailles d'acier en fer | 2 | F | 11 | 15 | 4 | 4 | +10% extermination |
| Écailles d'acier en acier | 3 | E | 18 | 14 | 6 | 9 | +10% extermination |
| Écailles d'acier en acier trempé | 4 | D | 25 | 14 | 9 | 14 | +10% extermination |
| Écailles d'acier en argent-vif | 5 | C | 34 | 13 | 12 | 20 | +10% extermination |
| Écailles d'acier en mithril | 6 | B | 44 | 12 | 15 | 28 | +10% extermination |
| Écailles d'acier en adamantine | 7 | A | 55 | 12 | 19 | 38 | +10% extermination |
| Écailles d'acier d'orichalque | 8 | S | 69 | 11 | 24 | 52 | +10% extermination |
| Harnois partiel de fortune | 1 | G | 6 | 17 | 2 | 1 | +10% escorte |
| Harnois partiel en fer | 2 | F | 12 | 16 | 4 | 4 | +10% escorte |
| Harnois partiel en acier | 3 | E | 18 | 16 | 6 | 9 | +10% escorte |
| Harnois partiel en acier trempé | 4 | D | 26 | 15 | 8 | 14 | +10% escorte |
| Harnois partiel en argent-vif | 5 | C | 35 | 14 | 11 | 21 | +10% escorte |
| Harnois partiel en mithril | 6 | B | 46 | 13 | 15 | 29 | +10% escorte |
| Harnois partiel en adamantine | 7 | A | 57 | 12 | 18 | 38 | +10% escorte |
| Harnois partiel d'orichalque | 8 | S | 72 | 12 | 23 | 52 | +10% escorte |
| Maille de campagne de fortune | 1 | G | 5 | 13 | 3 | 1 | -20% durée de convalescence |
| Maille de campagne en fer | 2 | F | 9 | 12 | 5 | 4 | -20% durée de convalescence |
| Maille de campagne en acier | 3 | E | 15 | 11 | 9 | 8 | -20% durée de convalescence |
| Maille de campagne en acier trempé | 4 | D | 21 | 11 | 12 | 13 | -20% durée de convalescence |
| Maille de campagne en argent-vif | 5 | C | 28 | 10 | 16 | 19 | -20% durée de convalescence |
| Maille de campagne en mithril | 6 | B | 37 | 10 | 21 | 27 | -20% durée de convalescence |
| Maille de campagne en adamantine | 7 | A | 46 | 9 | 26 | 36 | -20% durée de convalescence |
| Maille de campagne d'orichalque | 8 | S | 58 | 9 | 32 | 50 | -20% durée de convalescence |
| Maille gravée de fortune | 1 | G | 6 | 13 | 3 | 1 | +10% purification |
| Maille gravée en fer | 2 | F | 10 | 13 | 4 | 4 | +10% purification |
| Maille gravée en acier | 3 | E | 15 | 12 | 7 | 8 | +10% purification |
| Maille gravée en acier trempé | 4 | D | 22 | 11 | 10 | 13 | +10% purification |
| Maille gravée en argent-vif | 5 | C | 30 | 11 | 14 | 20 | +10% purification |
| Maille gravée en mithril | 6 | B | 38 | 10 | 17 | 27 | +10% purification |
| Maille gravée en adamantine | 7 | A | 48 | 10 | 22 | 37 | +10% purification |
| Maille gravée d'orichalque | 8 | S | 61 | 9 | 27 | 50 | +10% purification |

### Armure lourde

*Classes : Guerrier, Porte-bouclier*

| Armure | Tier | Rang | PRO | ENC | END | Niv. min | Spécial |
|--------|------|------|-----|-----|-----|----------|---------|
| Cuirasse de fortune | 1 | G | 7 | 22 | 2 | 1 | — |
| Cuirasse en fer | 2 | F | 13 | 21 | 4 | 5 | — |
| Cuirasse en acier | 3 | E | 20 | 20 | 6 | 9 | — |
| Cuirasse en acier trempé | 4 | D | 29 | 19 | 8 | 15 | — |
| Cuirasse en argent-vif | 5 | C | 39 | 18 | 10 | 22 | — |
| Cuirasse en mithril | 6 | B | 51 | 17 | 13 | 31 | — |
| Cuirasse en adamantine | 7 | A | 64 | 16 | 17 | 40 | — |
| Cuirasse d'orichalque | 8 | S | 80 | 15 | 21 | 55 | — |
| Harnois de bataille de fortune | 1 | G | 9 | 25 | 2 | 1 | -25% risque de pertes en cas d'echec |
| Harnois de bataille en fer | 2 | F | 16 | 24 | 3 | 5 | -25% risque de pertes en cas d'echec |
| Harnois de bataille en acier | 3 | E | 24 | 23 | 5 | 10 | -25% risque de pertes en cas d'echec |
| Harnois de bataille en acier trempé | 4 | D | 35 | 22 | 7 | 16 | -25% risque de pertes en cas d'echec |
| Harnois de bataille en argent-vif | 5 | C | 47 | 21 | 9 | 23 | -25% risque de pertes en cas d'echec |
| Harnois de bataille en mithril | 6 | B | 61 | 20 | 12 | 32 | -25% risque de pertes en cas d'echec |
| Harnois de bataille en adamantine | 7 | A | 77 | 18 | 15 | 41 | -25% risque de pertes en cas d'echec |
| Harnois de bataille d'orichalque | 8 | S | 96 | 17 | 19 | 57 | -25% risque de pertes en cas d'echec |
| Armure de campagne de fortune | 1 | G | 7 | 20 | 3 | 1 | -25% durée de convalescence |
| Armure de campagne en fer | 2 | F | 12 | 19 | 4 | 5 | -25% durée de convalescence |
| Armure de campagne en acier | 3 | E | 19 | 18 | 7 | 9 | -25% durée de convalescence |
| Armure de campagne en acier trempé | 4 | D | 28 | 17 | 10 | 15 | -25% durée de convalescence |
| Armure de campagne en argent-vif | 5 | C | 37 | 16 | 13 | 21 | -25% durée de convalescence |
| Armure de campagne en mithril | 6 | B | 48 | 15 | 17 | 30 | -25% durée de convalescence |
| Armure de campagne en adamantine | 7 | A | 61 | 14 | 21 | 39 | -25% durée de convalescence |
| Armure de campagne d'orichalque | 8 | S | 76 | 14 | 26 | 54 | -25% durée de convalescence |
| Cuirasse de siège de fortune | 1 | G | 8 | 26 | 2 | 1 | +15% siège |
| Cuirasse de siège en fer | 2 | F | 15 | 25 | 3 | 5 | +15% siège |
| Cuirasse de siège en acier | 3 | E | 23 | 24 | 5 | 10 | +15% siège |
| Cuirasse de siège en acier trempé | 4 | D | 33 | 23 | 7 | 16 | +15% siège |
| Cuirasse de siège en argent-vif | 5 | C | 45 | 22 | 9 | 23 | +15% siège |
| Cuirasse de siège en mithril | 6 | B | 58 | 20 | 12 | 32 | +15% siège |
| Cuirasse de siège en adamantine | 7 | A | 73 | 19 | 15 | 42 | +15% siège |
| Cuirasse de siège d'orichalque | 8 | S | 92 | 18 | 19 | 57 | +15% siège |
| Plates runiques de fortune | 1 | G | 9 | 24 | 2 | 1 | +15% purification |
| Plates runiques en fer | 2 | F | 16 | 23 | 3 | 5 | +15% purification |
| Plates runiques en acier | 3 | E | 25 | 22 | 5 | 10 | +15% purification |
| Plates runiques en acier trempé | 4 | D | 36 | 21 | 7 | 16 | +15% purification |
| Plates runiques en argent-vif | 5 | C | 49 | 20 | 9 | 22 | +15% purification |
| Plates runiques en mithril | 6 | B | 63 | 19 | 11 | 31 | +15% purification |
| Plates runiques en adamantine | 7 | A | 80 | 18 | 14 | 41 | +15% purification |
| Plates runiques d'orichalque | 8 | S | 100 | 16 | 18 | 56 | +15% purification |
| Armure d'apparat de fortune | 1 | G | 7 | 23 | 2 | 1 | +12% négociation et réputation |
| Armure d'apparat en fer | 2 | F | 12 | 22 | 3 | 5 | +12% négociation et réputation |
| Armure d'apparat en acier | 3 | E | 18 | 21 | 5 | 10 | +12% négociation et réputation |
| Armure d'apparat en acier trempé | 4 | D | 26 | 20 | 7 | 15 | +12% négociation et réputation |
| Armure d'apparat en argent-vif | 5 | C | 35 | 19 | 10 | 22 | +12% négociation et réputation |
| Armure d'apparat en mithril | 6 | B | 46 | 18 | 13 | 31 | +12% négociation et réputation |
| Armure d'apparat en adamantine | 7 | A | 57 | 17 | 16 | 41 | +12% négociation et réputation |
| Armure d'apparat d'orichalque | 8 | S | 72 | 16 | 20 | 56 | +12% négociation et réputation |

---

## 7. Notes d'équilibrage

**Ce qu'il faut surveiller en playtest.** Le rapport entre PUI et niveau est le curseur le plus sensible du système. Si l'équipement devient trop fort, le joueur cesse de recruter et de former des gens pour se contenter d'acheter du matériel — ce qui détruit le cœur du jeu. Réduire les valeurs de PUI de 20 % est le premier réglage à tenter si ça penche de ce côté.

**Le profil Brutal est volontairement piégeux.** Il est le meilleur choix uniquement quand le porteur dépasse largement son niveau minimum. Un joueur qui équipe au plus fort sans regarder les niveaux minimums se retrouve avec une équipe lourdement armée et statistiquement médiocre. C'est un piège lisible, pas une injustice.

**Les armures de tissu ne protègent presque pas, et c'est le but.** Un mage de tier 8 en robe runique a 19 % de PRO, contre 80 % pour un porte-bouclier en harnois. La fragilité des classes à focus est une donnée structurelle : c'est ce qui justifie le porte-bouclier et le guérisseur dans une composition.

**Les spéciaux ne se cumulent pas librement.** Deux bonus de même nature sur la même équipe ne devraient pas s'additionner intégralement — plafonner le cumul à environ 1,5 fois le meilleur bonus présent évite les compositions dégénérées où six membres empilent le même trait.

