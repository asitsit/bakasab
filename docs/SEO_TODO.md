# BAKASAB — SEO / GEO, ce qu'il reste à faire

Consolidé depuis l'audit initial (`bakasab-audit` artifact) et `BAKASAB_FAQ_SEO_GEO.md`. Coché = fait dans cette session de build. Non coché = reste à faire, par toi ou lors d'une prochaine session Claude Code.

## Fait dans cette session

- [x] Pages À propos, Services, Missions (listing + 4 détails), Contact, 404, Mentions légales créées avec URLs propres (`/missions/vinci-building-solutions`, pas d'ID)
- [x] Tout le texte rendu côté serveur (Astro SSG) — aucun contenu injecté après coup, lisible sans JS
- [x] FAQ en `<details>/<summary>` natifs — contenu présent dans le DOM même fermé, pas un composant qui ne rend qu'au clic
- [x] Un seul `<h1>` par page, hiérarchie h2/h3 sans saut de niveau
- [x] `<title>` et `<meta name="description">` uniques par page
- [x] Balise `canonical` sur chaque page
- [x] Open Graph + Twitter Card (dynamiques par page)
- [x] `robots.txt` avec autorisation explicite GPTBot / ClaudeBot / PerplexityBot / Google-Extended
- [x] `llms.txt` à la racine
- [x] `sitemap.xml` généré automatiquement (`@astrojs/sitemap`)
- [x] JSON-LD `Organization` (site-wide, avec `legalName`, `taxID`, `vatID`, `foundingDate`, `founder`) sur toutes les pages
- [x] JSON-LD `FAQPage` sur Services et Contact, texte identique à l'affiché
- [x] JSON-LD `Service` × 3 sur la page Services
- [x] JSON-LD `Person` (Alexandre Sitbon) sur À propos
- [x] JSON-LD `BreadcrumbList` sur les pages de détail mission
- [x] NAP (nom/adresse/tél/email) identique mot pour mot : footer, Contact, schema, llms.txt
- [x] Maillage interne : liens texte descriptifs dans les FAQ vers Missions/Services/Contact (jamais "cliquez ici")
- [x] Lien Mentions légales en footer sur toutes les pages

## Reste à faire — avant mise en ligne définitive

- [ ] **Choisir et renseigner le nom de domaine final** partout où `[domaine-final]` apparaît (robots.txt → ligne Sitemap, `astro.config.mjs` → `site`, llms.txt, Open Graph `og:url`)
- [ ] **Hébergement** : compléter la section "Hébergement" des mentions légales (nom, adresse, contact de l'hébergeur — obligatoire en France, non optionnel) une fois le choix fait (Netlify/Vercel/autre)
- [ ] **Cookies** : compléter la section Cookies des mentions légales selon les outils analytics réellement branchés ; si Google Analytics ou équivalent est ajouté, bandeau de consentement obligatoire
- [x] **Formulaire de contact** : branché sur Formspree (`@formspree/ajax`, endpoint `xbgrbkwb`) — testé avec un envoi réel, réponse 200 confirmée
- [ ] **Noms clients réels** derrière "Convention Learning" et "Essentials of Leadership" (actuellement génériques, comme dans le deck source) — remplacer une fois confirmés
- [ ] **Chiffre clé mission Vinci** (NPS, taux de satisfaction, nombre de stands…) pour densifier l'étude de cas
- [ ] **Conditions d'annulation** : le taux de 60% à J-30 affiché sur le site doit être repris à l'identique dans les futures CGV/devis types — à vérifier une fois les CGV rédigées
- [ ] **Images réelles** : remplacer chaque placeholder dégradé par une vraie photo avec `alt` descriptif (les légendes actuelles — ex. « Photo — séminaire en cours... » — servent de base directe à l'`alt`)
- [ ] **Valider chaque schema JSON-LD** avec le [Rich Results Test](https://search.google.com/test/rich-results) de Google une fois le site en ligne sur le domaine final (un schema pointant vers `localhost`/un domaine de préprod n'est pas testable en conditions réelles)
- [ ] **Soumettre le sitemap** à Google Search Console une fois le domaine final actif
- [ ] **Core Web Vitals** : tester via PageSpeed Insights une fois les vraies images intégrées (le placeholder actuel — dégradés CSS — n'est pas représentatif du poids réel de la page)
- [ ] **Test sans JavaScript** : vérifier en conditions réelles (JS désactivé dans le navigateur, ou `curl`/`view-source`) que chaque page reste lisible — la mécanique est en place (SSG) mais à reconfirmer une fois le site déployé
- [ ] **Réseaux sociaux** : si des comptes BAKASAB existent (LinkedIn notamment), les ajouter au `sameAs` du schema Organization — non fait faute d'URLs fournies

## Plus tard (pas bloquant pour le lancement)

- [ ] Stratégie de contenu / blog pour profondeur thématique (explicitement hors scope initial)
- [ ] Pipeline d'images optimisées (`<Image>` natif d'Astro, WebP/AVIF automatique) une fois les vraies photos disponibles
- [ ] Favicon ICO/PNG + apple-touch-icon en complément du SVG actuel
