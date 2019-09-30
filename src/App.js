import React, { useState } from 'react';
import { Header } from './views/partials/Header';
import { BrowserRouter as Router, Route} from "react-router-dom";

import { Landing } from './components/Landing';

function App() {
  const [display, setDisplay] = useState(false);
  window.onhashchange = function() {
    setDisplay(() => window.location.pathname === '/'? false: true);
  }

  return (
    <Router>
      <Header currentUser={undefined} display={display}/>
      <Route path="/" exact component={Landing} />
    </Router>
  )
};

export default App;