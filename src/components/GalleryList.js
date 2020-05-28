import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouteMatch } from "react-router-dom";
import { listGallery, createGallery, deleteGallery } from "../api";

export default function () {
  const { url } = useRouteMatch();
  const [galleries, setGalleries] = useState([]);
  const [galleryName, setGalleryName] = useState("");

  useEffect(() => {
    listGallery()
      .then((res) => {
        setGalleries(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (galleryName.trim() === "") {
      return;
    }
    createGallery({ name: galleryName })
      .then((res) => {
        const { id, name } = res.data;
        setGalleries([...galleries, { id, name }]);
      })
      .catch((err) => console.error(err));
    setGalleryName("");
  };

  const handleDelete = (galleryID) => {
    deleteGallery(galleryID)
      .then(() => {
        setGalleries([...galleries.filter((g) => g.id !== galleryID)]);
      })
      .catch((err) => console.error(err));
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
        <div className="gallery-item">
          <img
            className="gallery-item__cover"
            src={`https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_t1/sample_images/img/index/ff_x_t1_001.JPG`}
          />
          <div className="gallery-item__title">Foobar</div>
        </div>
        <div className="gallery-item">
          <div className="gallery-item__cover"></div>
          <div className="gallery-item__title">Hello World</div>
        </div>
      </div>
    </div>
  );
}
