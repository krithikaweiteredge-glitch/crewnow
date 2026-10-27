import { SprayCan, AppWindow, Brush, Wrench, ShieldCheck, Users, Sofa, Bug } from 'lucide-react';

export const services = [
  {
    id: 'deep-cleaning', icon: SprayCan, title: 'Deep Office Cleaning', tag: 'Most booked',
    short: 'A thorough, top-to-bottom clean of your offices, floors and shared spaces, carried out after hours.',
    items: ['Desks, workstations & meeting rooms', 'Floors: vacuum, mop, machine scrub', 'Kitchens, pantries & washrooms', 'Dusting of vents, ledges & fixtures', 'Bins, touchpoints & high-traffic areas', 'Eco-certified products'],
  },
  {
    id: 'window-cleaning', icon: AppWindow, title: 'Window & Facade Cleaning', tag: 'High-rise ready',
    short: 'Streak-free glass inside and out, from street-level shopfronts to full glass towers.',
    items: ['Internal & external glass', 'Rope-access & cradle teams', 'Frames, sills & tracks', 'Glass partitions & atriums', 'Post-construction clean-up', 'Fully insured & certified crews'],
  },
  {
    id: 'daily-janitorial', icon: Brush, title: 'Daily Janitorial', tag: 'Recurring',
    short: 'A dedicated, uniformed team that keeps your workplace spotless, every single day.',
    items: ['Daily, weekly or custom schedules', 'Day-porter & night-shift options', 'Restocking of consumables', 'Quality checklists & audits', 'Single point of contact', 'Cover for absences included'],
  },
  {
    id: 'maintenance', icon: Wrench, title: 'Facility Maintenance', tag: 'Fix it fast',
    short: 'Licensed technicians for the repairs and upkeep that keep your building running smoothly.',
    items: ['Electrical & lighting', 'Plumbing & drainage', 'HVAC servicing', 'Carpentry & minor repairs', 'Painting & touch-ups', 'Planned preventive maintenance'],
  },
  {
    id: 'sanitization', icon: ShieldCheck, title: 'Sanitization & Disinfection', tag: 'Health-safe',
    short: 'Hospital-grade disinfection that protects your people and stands up to inspection.',
    items: ['Electrostatic fogging', 'Touchpoint disinfection', 'Washroom deep sanitising', 'Air-quality treatment', 'Certificates of service', 'Rapid response available'],
  },
  {
    id: 'carpet-upholstery', icon: Sofa, title: 'Carpet & Upholstery', tag: 'Restore & refresh',
    short: 'Deep extraction and spot treatment that bring carpets and soft furnishings back to life.',
    items: ['Hot-water extraction', 'Stain & odour removal', 'Chair & sofa cleaning', 'Fast-dry methods', 'Scotchgard protection', 'Out-of-hours scheduling'],
  },
  {
    id: 'pest-control', icon: Bug, title: 'Pest Control', tag: 'Preventive',
    short: 'Discreet, safe pest management with scheduled visits and audit-ready reports.',
    items: ['Inspection & risk report', 'Rodent, insect & termite control', 'Food-safe treatments', 'Quarterly contracts', 'Audit-ready documentation', 'Emergency call-outs'],
  },
  {
    id: 'staffing', icon: Users, title: 'Staffing & Crew Hire', tag: 'Hire a crew',
    short: 'Vetted cleaners, porters and technicians, on contract or on demand, fully managed by us.',
    items: ['Background-checked staff', 'Temporary & permanent placement', 'Event & peak-season crews', 'Trained, uniformed & supervised', 'Replacement guarantee', 'We handle payroll & compliance'],
  },
];

export const steps = [
  { title: 'Tell us what you need', text: 'Choose your services and share a few details about your site. It takes about two minutes.' },
  { title: 'Receive your quote', text: 'We review your request and send a clear, fixed quote within one business day.' },
  { title: 'We take care of it', text: 'A trained, uniformed crew arrives on time and gets it done. Your only job is to carry on with yours.' },
];

export const testimonials = [
  { quote: 'They deep-cleaned three floors over a weekend. Nobody saw them come or go, but on Monday the whole office looked brand new.', name: 'Priya Nair', role: 'Operations Manager, Brightwave Tech' },
  { quote: 'Our glass facade has never looked better. The crew was professional and fully insured, and booking could not have been easier.', name: 'Daniel Ortiz', role: 'Facilities Head, Meridian Offices' },
  { quote: 'We moved our janitorial to CrewNow and noticed the difference straight away. One point of contact and nothing to chase.', name: 'Sarah Whitfield', role: 'Director, Whitfield & Co. Law' },
];

export const faqs = [
  { q: 'How quickly can you start?', a: 'Most one-off jobs can be scheduled within 48 hours, and urgent requests can often be handled the same day. Recurring contracts usually begin within a week.' },
  { q: 'Do you work outside business hours?', a: 'Yes. Most of our commercial work happens in the evenings, overnight and at weekends, so your team is never disturbed.' },
  { q: 'Are your crews insured and vetted?', a: 'Every team member is background-checked, trained and covered by public liability and workers’ compensation insurance.' },
  { q: 'How does pricing work?', a: 'Pricing depends on the size of your site, the scope of work and how often you need us. Send a booking request and we’ll reply with a fixed quote, with no surprises and no obligation.' },
  { q: 'What if I’m not happy with the result?', a: 'Tell us within 24 hours and we’ll review the work with you and agree the best way to put it right.' },
  { q: 'Can I book more than one service?', a: 'Of course. Select as many as you like on the booking form and we’ll combine them into a single visit with one quote.' },
];

export const stats = [
  { value: '500+', label: 'Businesses served' },
  { value: '12k+', label: 'Jobs completed' },
  { value: '4.9★', label: 'Average rating' },
  { value: '24h', label: 'Quote turnaround' },
];
