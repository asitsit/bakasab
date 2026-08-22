// Single source of truth for NAP + legal facts, so the footer, /contact,
// /mentions-legales and the JSON-LD schema never drift from each other.
export const org = {
  name: 'BAKASAB',
  legalName: 'BAKASAB',
  legalForm: 'SASU (société par actions simplifiée unipersonnelle)',
  capital: '1 000,00 €',
  address: {
    street: '44 rue du Chemin Vert',
    postalCode: '92100',
    city: 'Boulogne-Billancourt',
    country: 'FR',
  },
  addressFull: '44 rue du Chemin Vert, 92100 Boulogne-Billancourt',
  email: 'contact@bakasab.com',
  siren: '928 485 242',
  siret: '928 485 242 00012',
  rcs: 'Nanterre, 928 485 242 R.C.S. Nanterre',
  vat: 'FR52 928485242',
  ape: '70.22Z — Conseil pour les affaires et autres conseils de gestion',
  president: 'Alexandre Sitbon',
  foundingDate: '2024-05-03',
  founder: {
    name: 'Alexandre Sitbon',
    role: 'Fondateur, Facilitation & innovation',
  },
};
