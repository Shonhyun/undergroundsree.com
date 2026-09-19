import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Support from './pages/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import AccountDeletion from './pages/AccountDeletion';
import Enroll from './pages/Enroll';
import Updates from './pages/Updates';
import Inquiry from './pages/Inquiry';
import JoinUs from './pages/JoinUs';
import SupportModal from './components/SupportModal';
import FloatingEnrollButton from './components/FloatingEnrollButton';
import SmoothScroll from './components/SmoothScroll';
import { AppProvider } from './context/AppContext';
import './App.css';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/support" element={<Support />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/join" element={<JoinUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/account-deletion" element={<AccountDeletion />} />
            <Route path="/enroll" element={<Enroll />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <SupportModal />
      <FloatingEnrollButton />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <SmoothScroll>
        <Router>
          <AppContent />
        </Router>
      </SmoothScroll>
    </AppProvider>
  );
}

export default App;
