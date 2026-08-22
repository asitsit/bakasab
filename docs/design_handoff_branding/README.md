# Handoff: Bakasab — Branding & landing (pistes couleur/typo)

## Overview
Exploration de charte graphique pour Bakasab (agence d'expériences d'entreprise) : pistes couleur/typo puis une direction approfondie (nav, hero, offres, FAQ) sur la piste retenue — bordeaux + corail, base "Modernist" (grille visible, Archivo, filets 2px, zéro arrondi).

## About the Design Files
Les fichiers de ce dossier sont des **références de design en HTML** — un prototype montrant l'apparence et le comportement voulus, pas du code de production à copier tel quel. La tâche consiste à **recréer ces designs HTML dans l'environnement du projet cible** (React, Vue, autre) en utilisant ses librairies et patterns existants — ou, s'il n'y a pas encore d'environnement, à choisir le framework le plus adapté.

## Fidelity
**Haute fidélité (hifi)** : couleurs, typographie, espacement et interactions sont définitifs pour la direction retenue (section "Direction approfondie"). Les trois vignettes de pistes en haut de page sont des comparatifs rapides, pas à recréer à l'identique.

## Screens / Views

### 1. Pistes couleur & typo (haut de page)
Trois cartes côte à côte comparant 3 intensités du même système bordeaux/corail. Sert de justification, pas un écran final.

### 2. Landing "Direction approfondie" (piste retenue)
- **Nav** : logo texte "BAKASAB" flush-left, liens à droite, CTA plein bordeaux.
- **Bandeau défilant (marquee)** : fond bordeaux, texte blanc majuscule, défilement continu horizontal (CSS `@keyframes`, 22s linéaire, boucle infinie sur contenu dupliqué).
- **Hero** : titre 64px Archivo 800, mot-clé "marquent" en bordeaux foncé. Deux photos placeholder superposées en biais (rotate -3°/+4°). Léger dégradé diagonal (bordeaux → corail, opacity 0.08) en fond de section. Trois compteurs animés (180+, 24, 96%) qui s'incrémentent au scroll.
- **3 cartes d'offres** : Expériences collectives / digitales / apprenantes, gros numéros 01/02/03, fond teinté au hover.
- **Bannière CTA** : fond bordeaux plein, cercle corail décoratif en fond, bouton corail.
- **FAQ** : accordéon 2 colonnes (intro à gauche, 8 questions/réponses à droite), toggle au clic, icône "+" qui tourne à 45°.

## Interactions & Behavior
- **Scroll reveal** : chaque bloc marqué `data-reveal` passe de `opacity:0; translateY(28px)` à visible, déclenché par un polling de position de scroll (pas d'IntersectionObserver — non fiable dans certains contextes sandboxés), avec un filet de sécurité qui force tout visible après 2.5s si le JS échoue.
- **Compteurs** : incrémentation `easeOutCubic` sur 1.2s via `setInterval` (16ms), déclenchée quand l'élément entre dans le viewport.
- **Curseur personnalisé** : petit point corail qui suit la souris, grossit au survol des liens/boutons/cartes.
- **Boutons "magnétiques"** : `.btn-primary`/`.btn-secondary` se décalent légèrement vers le curseur au survol (25% du delta souris/centre), reviennent à `translate(0)` à la sortie.
- **FAQ accordéon** : état React (`openFaq`), une question ouverte à la fois, `max-height` transition CSS.

## State Management
- `openFaq: number|null` — index de la question FAQ ouverte.
- Compteurs et reveal sont gérés en DOM direct (hors state React), via `componentDidMount`/`componentWillUnmount`.

## Design Tokens
- **Couleurs** : `--color-bg #f3f2f2`, `--color-text #201e1d`, `--color-accent #8c1d34` (bordeaux, rampe 100→900 de `#f7e9ea` à `#2b070f`), `--color-accent-2 #f2632b` (corail, rampe de `#fff1e8` à `#481b09`).
- **Typo** : Archivo (Google Fonts), poids 400/600/800 — `--font-heading`/`--font-body` = Archivo.
- **Radius** : 0px partout (`--radius-sm/md/lg`).
- **Espacement** : `--space-1..8` = 4/8/12/16/24/32px.
- **Ombres** : `--shadow-sm/md/lg` définies dans `bakasab-styles.css`.

## Assets
- Aucune image réelle : deux zones photo en placeholder rayé (à remplacer par de vraies photos d'événements Bakasab).
- Police Archivo chargée via Google Fonts dans `bakasab-styles.css`.

## Files
- `Bakasab Branding.dc.html` — le prototype complet (pistes + direction approfondie).
- `bakasab-styles.css` — la feuille de tokens et composants (copie retintée du design system "Modernist").
- `screenshots/` — captures d'écran de haut en bas de la page (pistes, hero, offres/CTA, FAQ, palette/typo).
