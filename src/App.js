import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import Blog from './components/Blog';
import Experience from './components/Experience';
import Education from './components/Education';
import BlogPost from './components/BlogPost';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

const AppWrapper = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const PageContainer = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--shadow-color);
  padding: 30px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode='wait'>
      <PageContainer
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
        </Routes>
      </PageContainer>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper>
        <ScrollProgress />
        <Header />
        <ContentWrapper>
          <AnimatedRoutes />
        </ContentWrapper>
        <BackToTop />
      </AppWrapper>
    </Router>
  );
}

export default App;