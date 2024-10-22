import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import YearSection from './components/YearSection';
import LoginPage from './components/LoginPage';
import { photos } from './data/photos';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(to bottom, #f6e5f5, #fff0f5);
  min-height: 100vh;
`;

const LoveJourney = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #ff4081;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <AppContainer>
      <Header />
      <LoveJourney>Our Love Journey</LoveJourney>
      {photos.map((yearData, index) => (
        <YearSection key={index} {...yearData} />
      ))}
      <Footer />
    </AppContainer>
  );
}

export default App;
