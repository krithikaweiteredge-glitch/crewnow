import { Bug, Trees, Wrench, Car, PartyPopper } from 'lucide-react';

// The five main categories supplied by the client. Sub-services are not listed yet.
export const services = [
  {
    id: 'pest-management', icon: Bug, title: 'Pest Management', tag: 'Preventive',
    short: 'Safe, discreet pest control with scheduled visits and clear service reports.',
  },
  {
    id: 'landscape-gardening', icon: Trees, title: 'Landscape & Gardening', tag: 'Green spaces',
    short: 'Design, planting and year-round care for gardens, lawns and green spaces.',
  },
  {
    id: 'mep-engineering', icon: Wrench, title: 'MEP & Engineering', tag: 'Planned and urgent',
    short: 'Mechanical, electrical and plumbing work by skilled technicians, from planned upkeep to urgent repairs.',
  },
  {
    id: 'valet-services', icon: Car, title: 'Valet Services', tag: 'Guest arrival',
    short: 'Trained, uniformed valets and parking teams for hotels, venues, hospitals and events.',
  },
  {
    id: 'event-management', icon: PartyPopper, title: 'Event Management', tag: 'End to end',
    short: 'Planning and on-the-day delivery for corporate events, launches, weddings and exhibitions.',
  },
];

export const steps = [
  { title: 'Tell us what you need', text: 'Choose your services and share a few details about your site. It takes about two minutes.' },
  { title: 'Receive your quote', text: 'We review your request and send a clear, fixed quote within one business day.' },
  { title: 'We take care of it', text: 'A trained, uniformed team arrives on time and gets it done. Your only job is to carry on with yours.' },
];

// Sample testimonials: replace with real client quotes before launch.
export const testimonials = [
  { quote: 'The pest control team worked through the night and our kitchens passed inspection the next morning. We have not had a single complaint since.', name: 'Priya Nair', role: 'Operations Manager, Brightwave Hotels' },
  { quote: 'Our grounds have never looked better. The landscaping crew is on time every week and always leaves the place tidy.', name: 'Daniel Ortiz', role: 'Facilities Head, Meridian Campus' },
  { quote: 'FourSync ran the valet and the whole event for our launch. One point of contact and nothing for us to chase.', name: 'Sarah Whitfield', role: 'Director, Whitfield & Co.' },
];

export const faqs = [
  { q: 'How quickly can you start?', a: 'Most one-off jobs can be scheduled within 48 hours, and urgent requests can often be handled the same day. Recurring contracts usually begin within a week.' },
  { q: 'Do you work outside business hours?', a: 'Yes. Much of our work happens in the evenings, overnight and at weekends, so your team and your guests are never disturbed.' },
  { q: 'Are your teams insured and vetted?', a: 'Every team member is background-checked, trained and covered by public liability and workers’ compensation insurance.' },
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
