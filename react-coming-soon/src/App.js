import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactComingSoon from './pages/ReactComingSoon';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>
            <h1>Mon Portfolio</h1>
            <a href="/react-coming-soon">Ici</a>
          </div>
        </Route>
        <Route path="/react-coming-soon" component={ReactComingSoon} />
      </Switch>
    </Router>
  );
}

export default App;
