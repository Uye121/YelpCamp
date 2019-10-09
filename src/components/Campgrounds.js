import React from 'react';
import { useCampgrounds } from '../Hooks';

export const Campgrounds = () => {
  const { campgrounds, _setCampgrounds } = useCampgrounds();

  return (
    campgrounds && campgrounds.map(campground => (
      <div 
        className="col-md-3 col-sm-6" 
        key={campground._id}
      >
        <div 
          className="thumbnail"
        >
          <img 
            src={campground.image} 
            alt={`${campground.name} image`} 
          />
          <div className="caption">
            <h4>{campground.name}</h4>
          </div>
          <p>
            <a 
              href={`/campgrounds/${campground._id}`} 
              className="btn btn-primary"
            >
              More Info
            </a>
          </p>
        </div>
      </div>
    ))
  )
}
