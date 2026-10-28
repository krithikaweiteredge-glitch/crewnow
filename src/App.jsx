import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { ScrollProgress } from './components/Effects.jsx';
import { SmoothScroll, HeadingReveals, scrollTop } from './components/Motion.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Book from './pages/Book.jsx';
import ThankYou from './pages/ThankYou.jsx';

const TITLES = {
  '/': 'CrewNow – Office Cleaning, Maintenance & Staffing',
  '/services': 'Services – CrewNow',
  '/about': 'About – CrewNow',
  '/contact': 'Contact – CrewNow',
  '/book': 'Book a Service – CrewNow',
  '/thanks': 'Request received – CrewNow',
};

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollTop();
    document.title = TITLES[pathname] || TITLES['/'];
  }, [pathname]);

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/thanks" element={<ThankYou />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <HeadingReveals routeKey={pathname} />
    </>
  );
}
