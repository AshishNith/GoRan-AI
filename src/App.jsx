import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Founder from './pages/Founder';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-full h-full flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/case-studies/:caseStudyId" element={<CaseStudyDetail />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;

