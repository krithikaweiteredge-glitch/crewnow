import { SprayCan, AppWindow, Brush, Wrench, ShieldCheck, Users, Sofa, Bug } from 'lucide-react';

export const services = [
  {
    id: 'deep-cleaning', icon: SprayCan, title: 'Deep Office Cleaning', tag: 'Most booked',
    short: 'Top-to-bottom cleaning for offices, floors and shared spaces – done out of hours.',
    items: ['Desks, workstations & meeting rooms', 'Floors: vacuum, mop, machine scrub', 'Kitchens, pantries & washrooms', 'Dusting of vents, ledges & fixtures', 'Bins, touchpoints & high-traffic areas', 'Eco-certified products'],
  },
  {
    id: 'window-cleaning', icon: AppWindow, title: 'Window & Facade Cleaning', tag: 'High-rise ready',
    short: 'Streak-free glass inside and out, from ground-floor shopfronts to full glass towers.',
    items: ['Internal & external glass', 'Rope-access & cradle teams', 'Frames, sills & tracks', 'Glass partitions & atriums', 'Post-construction clean-up', 'Fully insured & certified crews'],
  },
  {
    id: 'daily-janitorial', icon: Brush, title: 'Daily Janitorial', tag: 'Recurring',
    short: 'A dedicated, uniformed team that keeps your workplace spotless every single day.',
    items: ['Daily, weekly or custom schedules', 'Day-porter & night-shift options', 'Restocking of consumables', 'Quality checklists & audits', 'Single point of contact', 'Cover for absences included'],
  },
  {
    id: 'maintenance', icon: Wrench, title: 'Facility Maintenance', tag: 'Fix it fast',
    short: 'Licensed technicians for the repairs and upkeep that keep your building running.',
    items: ['Electrical & lighting', 'Plumbing & drainage', 'HVAC servicing', 'Carpentry & minor repairs', 'Painting & touch-ups', 'Planned preventive maintenance'],
  },
  {
    id: 'sanitization', icon: ShieldCheck, title: 'Sanitization & Disinfection', tag: 'Health-safe',
    short: 'Hospital-grade disinfection that protects your people and passes inspections.',
    items: ['Electrostatic fogging', 'Touchpoint disinfection', 'Washroom deep sanitising', 'Air-quality treatment', 'Certificates of service', 'Rapid response available'],
  },
  {
    id: 'carpet-upholstery', icon: Sofa, title: 'Carpet & Upholstery', tag: 'Restore & refresh',
    short: 'Hot-water extraction and spot-treatment that brings carpets and furniture back to life.',
    items: ['Hot-water extraction', 'Stain & odour removal', 'Chair & sofa cleaning', 'Fast-dry methods', 'Scotchgard protection', 'Out-of-hours scheduling'],
  },
  {
    id: 'pest-control', icon: Bug, title: 'Pest Control', tag: 'Preventive',
    short: 'Discreet, safe pest management with scheduled visits and compliance reports.',
    items: ['Inspection & risk report', 'Rodent, insect & termite control', 'Food-safe treatments', 'Quarterly contracts', 'Audit-ready documentation', 'Emergency call-outs'],
  },
  {
    id: 'staffing', icon: Users, title: 'Staffing & Crew Hire', tag: 'Hire a crew',
    short: 'Vetted cleaners, porters, technicians and support staff – on contract or on demand.',
    items: ['Background-checked staff', 'Temporary & permanent placement', 'Event & peak-season crews', 'Trained, uniformed & supervised', 'Replacement guarantee', 'We handle payroll & compliance'],
  },
];

export const steps = [
  { title: 'Tell us what you need', text: 'Pick your services and share a few details about your site – it takes about 2 minutes.' },
  { title: 'We confirm fast', text: 'Our team reviews your request and replies the same business day with a clear quote.' },
  { title: 'Crew arrives, you relax', text: 'A trained, uniformed crew shows up on time and does the job right – guaranteed.' },
];

export const testimonials = [
  { quote: 'They deep-cleaned three floors over a weekend and nobody even knew they had been there – except the office looked brand new on Monday.', name: 'Priya Nair', role: 'Operations Manager, Brightwave Tech' },
  { quote: 'Our glass facade has never looked better. Professional, insured, and the booking was ridiculously easy.', name: 'Daniel Ortiz', role: 'Facilities Head, Meridian Offices' },
  { quote: 'We switched our janitorial to CrewNow and the difference was immediate. One contact, zero chasing.', name: 'Sarah Whitfield', role: 'Director, Whitfield & Co. Law' },
];

export const faqs = [
  { q: 'How quickly can you start?', a: 'Most one-off jobs can be scheduled within 48 hours, and urgent requests are often possible the same day. Recurring contracts typically start within a week.' },
  { q: 'Do you work outside business hours?', a: 'Yes. Most of our commercial work is done evenings, nights and weekends so your team is never disturbed.' },
  { q: 'Are your crews insured and vetted?', a: 'Every team member is background-checked, trained and covered by public liability and workers’ compensation insurance.' },
  { q: 'How does pricing work?', a: 'Pricing depends on site size, scope and frequency. Submit a booking request and we’ll send a fixed, no-surprises quote – there is no obligation.' },
  { q: 'What if I’m not happy with the result?', a: 'Tell us within 24 hours and we’ll send a crew back to put it right at no extra cost.' },
  { q: 'Can I book more than one service?', a: 'Absolutely – tick as many as you like on the booking form and we’ll bundle them into one visit and one quote.' },
];

export const stats = [
  { value: '500+', label: 'Businesses served' },
  { value: '12k+', label: 'Jobs completed' },
  { value: '4.9★', label: 'Average rating' },
  { value: '24h', label: 'Quote turnaround' },
];
