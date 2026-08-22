# Images — où les mettre

Toute image destinée à être affichée sur le site passe par `src/assets/` (pas `public/`), pour
bénéficier de l'optimisation automatique d'Astro (compression, conversion WebP/AVIF, tailles
responsive) via le composant `<Image>` ou `<Picture>` de `astro:assets`.

```
src/assets/
├── team/        Portraits de l'équipe et du fondateur (alexandre-sitbon.jpg, etc.)
├── missions/    Photos des études de cas, une sous-utilisation possible par mission
├── hero/        Visuels pleine largeur (hero, showreel/vidéo, sections d'accroche)
├── logos/       Logos clients réels, quand ils remplacent les wordmarks texte actuels
└── og/          Image(s) de partage Open Graph (1200×630px recommandé)
```

## Noms de fichiers attendus (aujourd'hui en placeholder dégradé)

Chaque placeholder du site affiche déjà, en légende, le chemin exact attendu — dépose le fichier
au bon endroit avec le bon nom et il n'y a plus qu'à le brancher dans le composant.

| Emplacement | Fichier attendu |
|---|---|
| Home — carte mission Vinci | `missions/vinci-building-solutions.jpg` |
| Home — carte mission Safran | `missions/safran-carpe-diem.jpg` |
| Home — carte mission Convention Learning | `missions/convention-learning.jpg` |
| Home — carte mission Essentials of Leadership | `missions/essentials-of-leadership.jpg` |
| Page détail de chaque mission | *(même fichier que ci-dessus, réutilisé)* |
| Services — Expériences Collectives | `services/experiences-collectives.jpg` |
| Services — Expériences Digitales | `services/experiences-digitales.jpg` |
| Services — Expériences Apprenantes | `services/experiences-apprenantes.jpg` |
| Home — section vidéo/showreel | `hero/showreel.jpg` |
| À propos — Clémence Macary | `team/clemence-macary.jpg` |
| À propos — Ronan Broussier | `team/ronan-broussier.jpg` |
| À propos — Marine Bourgeaud | `team/marine-bourgeaud.jpg` |
| À propos — Philip Boisvieux | `team/philip-boisvieux.jpg` |
| À propos — Alexandre Sitbon | `team/alexandre-sitbon.jpg` *(déjà en place)* |

## Comment les utiliser dans un composant `.astro`

```astro
---
import { Image } from 'astro:assets';
import alexandrePhoto from '../assets/team/alexandre-sitbon.jpg';
---

<Image src={alexandrePhoto} alt="Alexandre Sitbon, fondateur de BAKASAB" />
```

`alt` est obligatoire — reprendre la légende du placeholder remplacé (ex. « Photo — séminaire en
cours, ambiance dynamique... ») comme point de départ.

## `public/` reste réservé à

Les fichiers qui ne doivent PAS être transformés (favicon, `robots.txt`, `llms.txt`) — tout le
reste passe par `src/assets/`.
