import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import AdminLogin from './pages/Admin/AdminLogin';
import { ROUTES } from './constants/routes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
          <Route path={ROUTES.HOME} element={
            <>
              <Header />
              <main className="main-content">
                <Home />
              </main>
              <Footer />
              <ScrollToTop />
            </>
          } />
          <Route path={ROUTES.ADMIN} element={
            <>
              <Header />
              <main className="main-content">
                <Admin />
              </main>
              <Footer />
              <ScrollToTop />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
