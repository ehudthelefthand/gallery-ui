import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
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

  const handleDelete = (id) => {
    API.deleteGallery(id)
      .then(() => {
        const filter = galleries.filter((g) => g.id !== id);
        setGalleries(filter);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateStatus = ({ id, is_publish }) => {
    API.updateGalleryStatus({ id, is_publish: !is_publish })
      .then(() => {
        const update = galleries.map((gal) => {
          if (gal.id === id) {
            return { ...gal, is_publish: !is_publish };
          }
          return gal;
        });
        setGalleries(update);
      })
      .catch(() => {});
  };

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
                <FontAwesomeIcon icon="images" size="2x" />
              </div>
            </Link>
            <div className="gallery-item__title">{gallery.name}</div>
            <div>
              <button
                className="gallery-item__button"
                onClick={() => handleDelete(gallery.id)}
              >
                delete
              </button>
            </div>
            <div>
              <button
                className={classNames("gallery-item__button", {
                  "gallery-item__button--private": !gallery.is_publish,
                  "gallery-item__button--public": gallery.is_publish,
                })}
                onClick={() => updateStatus(gallery)}
              >
                {gallery.is_publish ? "public" : "private"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
