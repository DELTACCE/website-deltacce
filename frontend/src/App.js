import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AppNavbar, { USE_BOTTOM_GLASS_NAVBAR } from './components/AppNavbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Committee from './pages/Committee';
import Brand from './pages/Brand';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import EventDay from './pages/EventDay';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-paper text-ink selection:bg-signal selection:text-white">
        <AppNavbar />
        <main className={`flex-grow ${USE_BOTTOM_GLASS_NAVBAR ? 'pb-[calc(7.5rem+env(safe-area-inset-bottom))]' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/events/:slug/:daySlug" element={<EventDay />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
