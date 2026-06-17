import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import ReactGA from 'react-ga4';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import CaseStudyDetail from './pages/CaseStudyDetail';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import About from './pages/About';
import Founder from './pages/Founder';
import Process from './pages/Process';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Testimonials from './pages/Testimonials';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import Chatbot from './components/Chatbot';
import VoiceWidget from './components/VoiceWidget';
import WhatsAppWidget from './components/WhatsAppWidget';
import AgentDetail from './pages/AgentDetail';
import D2CAutomation from './pages/D2CAutomation';
import WebsitesShowcase from './pages/WebsitesShowcase';
import { CalBookingProvider } from './components/CalBookingModal';


function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/scale' || location.pathname === '/automate';

  useEffect(() => {
    // Send pageview to Google Analytics on route change
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);


  return (
    <div className="min-h-full h-full flex flex-col">
      <CalBookingProvider>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/websites" element={<WebsitesShowcase />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:caseStudyId" element={<CaseStudyDetail />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="/process" element={<Process />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/agents/:agentId" element={<AgentDetail />} />
        <Route path="/scale" element={<D2CAutomation />} />
        <Route path="/automate" element={<D2CAutomation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
      {!hideHeaderFooter && <Chatbot />}
      {!hideHeaderFooter && <VoiceWidget />}
      {!hideHeaderFooter && <WhatsAppWidget />}
      <Analytics />
      </CalBookingProvider>
    </div>
  );
}

export default App;
