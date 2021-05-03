import React, { useState } from 'react';
import InitialScreen from './Components/InitialScreen';
import GameOptions from './Components/GameOptions';
import Game from './Components/Game/Game';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NotFound from './Components/NotFound';
import { Switch, Route, useLocation } from 'react-router-dom';

export default function App() {
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.dataset.language);
  };

  return (
    <main className="min-h-screen font-body text-4xl bg-blue relative">
      <Header handleLanguageChange={handleLanguageChange} language={language} />
      <Switch location={location} key={location.pathname}>
        <Route
          exact
          path="/"
          render={(props) => <InitialScreen {...props} language={language} />}
        />
        <Route
          exact
          path="/:gameType"
          render={(props) => <GameOptions {...props} language={language} />}
        />
        <Route
          exact
          path="/:gameType/:gameArea"
          render={(props) => <Game {...props} language={language} />}
        />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </main>
  );
}
