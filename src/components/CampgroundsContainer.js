import React from 'react';
import { CampgroundsHeader } from './CampgroundsHeader';
import { Campgrounds } from './Campgrounds';

export const CampgroundsContainer = () => {
  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap'
  }

  return (
    <div className="container">
      <CampgroundsHeader />
      <div className="row text-center" style={rowStyle}>
        <Campgrounds />
      </div>
    </div>
  )
}
