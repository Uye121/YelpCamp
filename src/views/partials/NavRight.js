import React, { useState } from 'react'

export const NavRight = ({
  currentUser=undefined,
  activePage,
  setActivePage
}) => {
  if(!currentUser) {
    return (
        <ul className="nav navbar-nav navbar-right">
          <li 
            className={activePage === 'login'? 'active': undefined}
          >
            <a 
              data-testid="login-user"
              type="button"
              onClick={() => setActivePage('login')}
              onKeyDown={() => setActivePage('login')}
            >
              Login
            </a>
          </li>
          <li 
            className={activePage === 'register'? 'active': undefined}
          >
            <a 
              data-testid="signup-user"
              type="button"
              onClick={() => setActivePage('register')}
              onKeyDown={() => setActivePage('register')}
            >
              Sign Up
            </a>
          </li>
        </ul>
    )
  } else {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a>
            Signed In As 
            {currentUser.username} 
            {currentUser.isAdmin?' (Admin)':''}
          </a>
        </li>
        <li>
          <a 
            data-testid="logout-user"
            type="button"
            href="/logout"
          >
            Logout
          </a>
        </li>
      </ul>
    )
  }
}
