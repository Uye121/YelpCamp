import React, { useState } from 'react';
import { NavRight } from './NavRight';
import { ErrorMessage } from './ErrorMessage';

export const Header = ({
  currentUser,
  display=false
}) => {
  const [activePage, setActivePage] = useState('home');
  console.log(display);
  if(display) {
    console.log("Yes header");
    return (
      <header data-testid="header">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a 
                className="navbar-brand" 
                href="/"
              >
                  YelpCamp
              </a>
            </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li 
                    className={activePage === 'home'? 'active': undefined}
                  >
                    <a 
                      data-testid="go-to-home"
                      aria-label="Go back to home"
                      type="button"
                      onClick={() => {
                        if(activePage !== 'home') {
                          setActivePage('home');
                        } else {
                          setActivePage('login');
                        }
                        console.log(typeof activePage);
                      }}
                      onKeyDown={() => {
                        setActivePage('home');
                      }}
                      href="/campgrounds"
                    >
                      Home
                    </a>
                  </li>
                </ul>
                <NavRight 
                  currentUser={currentUser} 
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              </div>
            </div>
        </nav>
        <ErrorMessage />
      </header>
    )
  } else {
    console.log("No header");
    return null;
  }
}
