import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import NodeCanvasBackground from './components/NodeCanvasBackground';
import BlueprintGridOverlay from './components/BlueprintGridOverlay';

import Home from './pages/Home';
import About from './pages/About';
import Committee from './pages/Committee';
import Brand from './pages/Brand';
import Events from './pages/Events';
import Gallery from './pages/gallery';
import EventDetail from './pages/EventDetail';
import EventDay from './pages/EventDay';
import EventLogin from './pages/EventLogin';
import TeamDashboard from './pages/TeamDashboard';
import EventAdminDashboard from './pages/EventAdminDashboard';
import Contact from './pages/Contact';

function AppContent({ showIntro, setShowIntro }) {
  return (
    <>
      <ScrollToTop />
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      <div className="flex flex-col min-h-screen bg-paper text-ink selection:bg-signal selection:text-white relative">
        {/* Global animated node background & blueprint grid overlay */}
        <NodeCanvasBackground />
        <BlueprintGridOverlay />
        <CustomCursor />
        <Navbar />
        <main className="flex-grow min-h-0 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/events/:slug/login" element={<EventLogin />} />
            <Route path="/admin/login" element={<EventLogin defaultRole="admin" />} />
            <Route path="/events/:slug/dashboard" element={<TeamDashboard />} />
            <Route path="/events/:slug/admin" element={<EventAdminDashboard />} />
            <Route path="/admin" element={<EventAdminDashboard />} />
            <Route path="/events/:slug/:daySlug" element={<EventDay />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch all redirect for old mentor dashboard route */}
            <Route path="/events/:slug/mentor-dashboard" element={<Navigate to="/events/agentic-ai-product-build-sprint/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <AppContent showIntro={showIntro} setShowIntro={setShowIntro} />
    </Router>
  );
}

export default App;
