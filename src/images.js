// Free-to-use stock photos from Pexels (https://www.pexels.com/license/), hosted with the site
// as WebP in four widths (public/images/<id>-<width>.webp).
// To use the agency's own photos, add them to public/images with the same naming and change the ids below.
const WIDTHS = [640, 960, 1280, 1600];
export const px = (id, w = 900) => {
  const size = WIDTHS.find((x) => x >= w) || WIDTHS[WIDTHS.length - 1];
  return `/images/${id}-${size}.webp`;
};

export const photos = {
  hero: 6196677,
  team: 6195121,
  office: 7750129,
  openOffice: 6794970,
};

export const serviceImages = {
  'deep-cleaning': 34516670,
  'window-cleaning': 4767875,
  'daily-janitorial': 6197123,
  maintenance: 9679179,
  sanitization: 7876767,
  'carpet-upholstery': 6195129,
  'pest-control': 4099467,
  staffing: 6195121,
};

export const industries = [
  { name: 'Corporate Offices', photo: 7750129, text: 'Spotless workspaces, out-of-hours.' },
  { name: 'Healthcare & Clinics', photo: 29948395, text: 'Hospital-grade hygiene, audit-ready.' },
  { name: 'Hotels & Hospitality', photo: 36354489, text: 'Lobbies and rooms guests remember.' },
  { name: 'Retail & Malls', photo: 13425897, text: 'Shine that keeps shoppers coming.' },
  { name: 'Schools & Campuses', photo: 35758721, text: 'Safe, sanitised learning spaces.' },
  { name: 'Warehouses & Industry', photo: 4481327, text: 'Tidy, safe, compliant floors.' },
];
