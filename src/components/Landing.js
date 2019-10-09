import React from 'react';
import '../stylesheets/Landing.scss';

export const Landing = () => {
  return (
    <>
      <div id="landing-header">
        <h1>
          Welcome to YelpCamp!
        </h1>
        <button
          className="btn btn-lg btn-success"
          data-testid="view-camp"
          type="button"
          onClick={() => window.location.href="/campgrounds"}
          onKeyDown={() => window.location.href="/campgrounds"}
        >
          View All Campgrounds
        </button>
      </div>
      <ul className="slideshow">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  )
}
