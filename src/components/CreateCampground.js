import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import multer from 'multer';
// import cloudinary from 'cloudinary';
// import NodeGeocoder from 'node-geocoder';

export const CreateCampground = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(-1);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const centerText = {
    textAlign: 'center'
  }
  const divContainer = {
    width: '30%',
    margin: '30px auto'
  }

  const addCampgrounds = () => {
    const formData = new FormData();
    let payload = {};
    const url = 'http://localhost:5000/campgrounds/';
    const file = document.getElementById("image").files[0];
    const campground = {
      name,
      price,
      description,
      location
    }

    // formData.append('campground', campground);
    formData.append('file', file);

    console.log(formData);
    // payload = JSON.stringify(payload);
    // payload.imageFile = file;

    axios.post(url, file)
      .then(res => console.log("axios post res: ", res))
      .catch(err => console.log("axios err: ", err));

    // fetch(url, {
    //   method: 'POST',
    //   // headers: {
    //   //   Accept: 'multipart/form-data',
    //   //   'Content-Type': 'multipart/form-data',
    //   // },
    //   body: formData,
    // })
    // .then(() => console.log("after fetch"))
    // .catch((error) => console.log("error: ", error));
  }

  return (
    <div className="row">
      <h1 style={centerText}>Create a new campground</h1>
      <div style={divContainer}>
        <form 
          // action="/campgrounds" 
          // method="POST" 
          // encType="multipart/form-data"
          id="addCampground"
        >
          <div className="form-group">
            <input 
              onChange={e => setName(e.target.value)}
              className="form-control" 
              type="text" 
              name="name" 
              id="name"
              placeholder="Yosemite" 
            />
          </div>
          <div className="form-group">
            <input 
              onChange={e => setPrice(parseInt(e.target.value))}
              className="form-control" 
              type="number" 
              name="price" 
              id="price"
              placeholder="price" 
              min="0.01" 
              step="0.01" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input 
              type="file" 
              id="image" 
              name="image" 
              placeholder="image url" 
              accept="image/*" 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              onChange={e => setDescription(e.target.value)}
              className="form-control" 
              type="text" 
              name="description" 
              id="description"
              placeholder="description" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input 
              onChange={e => setLocation(e.target.value)}
              className="form-control" 
              type="text" 
              name="location" 
              id="location" 
              placeholder="Yosemite National Park, CA" 
            />
          </div>
          <button 
            className="btn btn-lg btn-primary btn-block"
            onClick={() =>
              addCampgrounds()
            }
          >
            Submit
          </button>
        </form>
      <a href="/campgrounds">Go back</a>
    </div>
  </div>
  )
}
