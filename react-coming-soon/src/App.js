import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Page d'attente Coming Soon
const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <header className="coming-soon-header">
        <h1>Page en développement</h1>
        <p>Notre version React arrive bientôt. Restez connectés !</p>
      </header>
      <footer>
        <p>© 2025 tomc.fr | <a href="https://www.linkedin.com/in/tom-coelho-b38b97348" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </footer>
    </div>
  );
}

// Page d'accueil ou autre contenu
const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue sur mon Portfolio</h1>
      <p>Découvrez mes projets et mon parcours !</p>
    </div>
  );
}

// Composant principal avec les routes
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/react-coming-soon" component={ComingSoon} />
        {/* Ajoute d'autres routes si nécessaire */}
      </Switch>
    </Router>
  );
}

export default App;
