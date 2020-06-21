import React, { useState, useEffect } from 'react';
import { Header } from './views/partials/Header';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { Landing } from './components/Landing';
import { CampgroundsContainer } from './components/CampgroundsContainer';
import { CreateCampground } from './components/CreateCampground';

function App() {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(() => window.location.pathname === '/'? false: true);
  }, []);

  return (
    <Router>
      <Header currentUser={undefined} display={display}/>
      <Route path="/" exact component={Landing} />
      <Route path="/campgrounds" exact component={CampgroundsContainer} />
      <Route path="/campgrounds/new" exact component={CreateCampground} />
    </Router>
  )
};

export default App;