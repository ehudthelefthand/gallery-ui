import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouteMatch } from "react-router-dom";
import API from "../api";

export default function () {
  const { url } = useRouteMatch();
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    API.listGallery()
      .then((res) => {
        setGalleries(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <div className="gallery-list">
        <div className="gallery-item">
          <Link to={`${url}/gallery/new`}>
            <div className="gallery-item__cover">
              <FontAwesomeIcon icon="plus" size="2x" />
            </div>
          </Link>
        </div>
        {galleries.map((gallery) => (
          <div className="gallery-item" key={gallery.id}>
            <Link to={`${url}/gallery/${gallery.id}`}>
              <div className="gallery-item__cover">
                {gallery.cover ? (
                  <img className="gallery-item__cover" src={gallery.cover} />
                ) : (
                  <FontAwesomeIcon icon="images" size="2x" />
                )}
              </div>
            </Link>
            <div className="gallery-item__title">{gallery.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
