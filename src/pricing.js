// PLACEHOLDER RATES — the agency must replace these with its real pricing.
// `low` / `high` are ₹ per sq ft per visit; `min` is the minimum charge per visit.
// Everything on the site that shows an estimate reads from this file.
export const pricing = {
  'pest-management': { type: 'area', low: 1.5, high: 3.5, min: 2500 },
  'landscape-gardening': { type: 'area', low: 2, high: 5, min: 3000 },
  'mep-engineering': { type: 'flat', text: 'Call-out from ₹1,500', hint: 'Final price depends on the work. We scope it before we start.' },
  'valet-services': { type: 'flat', text: 'From ₹900 / shift', hint: 'Per valet. Tell us how many valets, the hours and the location and we’ll quote it.' },
  'event-management': { type: 'flat', text: 'Quoted per event', hint: 'Every event is different. Share the date, venue and guest count and we’ll prepare a quote.' },
};

// visits per month and the discount recurring work earns
export const frequencies = [
  { id: 'One-time', label: 'One-time', visits: 1, discount: 0 },
  { id: 'Monthly', label: 'Monthly', visits: 1, discount: 0.05 },
  { id: 'Fortnightly', label: 'Fortnightly', visits: 2, discount: 0.08 },
  { id: 'Weekly', label: 'Weekly', visits: 4, discount: 0.1 },
];

const round = (n) => Math.round(n / 100) * 100;
export const inr = (n) => '₹' + n.toLocaleString('en-IN');

export function estimate(serviceId, size, frequencyId) {
  const p = pricing[serviceId];
  const f = frequencies.find((x) => x.id === frequencyId) || frequencies[0];
  if (!p || p.type === 'flat') return { flat: true, text: p?.text, hint: p?.hint };
  const k = 1 - f.discount;
  const low = round(Math.max(p.min, size * p.low) * k);
  const high = round(Math.max(p.min * 1.25, size * p.high) * k);
  const recurring = f.visits > 1 || f.id === 'Monthly';
  return {
    flat: false, low, high, recurring, discount: f.discount,
    monthlyLow: low * f.visits, monthlyHigh: high * f.visits, visits: f.visits,
  };
}
