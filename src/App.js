import React, { useState } from 'react';
import { Header } from './views/partials/Header';
import { BrowserRouter as Router, Route} from "react-router-dom";

import { Landing } from './components/Landing';
import { CampgroundsContainer } from './components/CampgroundsContainer';

function App() {
  const [display, setDisplay] = useState(false);
  
  window.onhashchange = function() {
    console.log("has change");
    setDisplay(() => window.location.pathname === '/'? false: true);
  }

  return (
    <Router>
      <Header currentUser={undefined} display={display}/>
      <Route path="/" exact component={Landing} />
      <Route path="/campgrounds" component={CampgroundsContainer} />
    </Router>
  )
};

export default App;