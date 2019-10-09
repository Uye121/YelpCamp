import React from 'react';

export const CampgroundsHeader = () => {
  return (
    <header className="jumbotron">
      <h1>Welcome to YC!</h1>
      <p>
        View the awesome campgrounds that others like yourself have uploaded!
      </p>
      <p>
        <a href="/campgrounds/new" className="btn btn-primary btn-lg">Add new campground</a>
      </p>
    </header>
  )
}
