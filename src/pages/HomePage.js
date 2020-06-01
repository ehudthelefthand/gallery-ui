import React, { useState, useEffect } from "react";
import API from "../api";

export default function HomePage() {
  const [galleries, setGalleries] = useState([]);
  useEffect(() => {
    API.listPublishGallery()
      .then((res) => setGalleries(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="gallery-home">
      {galleries.map((gal) => (
        <div className="gallery" key={gal.id}>
          <h1 className="gallery__name">{gal.name}</h1>
          <div className="gallery__images">
            {gal.images.map((img) => (
              <div className="gallery__image-wrap" key={img.id}>
                <img
                  className="gallery__image"
                  src={img.filename}
                  alt={img.filename}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
