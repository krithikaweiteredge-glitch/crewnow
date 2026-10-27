// PLACEHOLDER RATES — the agency must replace these with its real pricing.
// `low` / `high` are ₹ per sq ft per visit; `min` is the minimum charge per visit.
// Everything on the site that shows an estimate reads from this file.
export const pricing = {
  'deep-cleaning': { type: 'area', low: 6, high: 9, min: 4000 },
  'window-cleaning': { type: 'area', low: 4, high: 7, min: 3000 },
  'daily-janitorial': { type: 'area', low: 1.2, high: 2, min: 1500 },
  sanitization: { type: 'area', low: 3, high: 5, min: 2500 },
  'carpet-upholstery': { type: 'area', low: 5, high: 8, min: 3000 },
  'pest-control': { type: 'area', low: 2.5, high: 4.5, min: 2500 },
  maintenance: { type: 'flat', text: 'Call-out from ₹1,500', hint: 'Final price depends on the repair – we scope it before we start.' },
  staffing: { type: 'flat', text: 'From ₹900 / person / day', hint: 'Tell us how many people and for how long and we’ll quote it.' },
};

// visits per month and the discount recurring work earns
export const frequencies = [
  { id: 'One-time', label: 'One-time', visits: 1, discount: 0 },
  { id: 'Monthly', label: 'Monthly', visits: 1, discount: 0.05 },
  { id: 'Weekly', label: 'Weekly', visits: 4, discount: 0.1 },
  { id: 'Daily', label: 'Daily (Mon–Sat)', visits: 26, discount: 0.25 },
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
