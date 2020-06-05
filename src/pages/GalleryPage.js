import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "../api";

export default function () {
  const { path } = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [gallery, setGallery] = useState({
    id: null,
    name: "",
    is_publish: false,
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id !== "new") {
      const galleryID = parseInt(id, 10);
      API.getGallery(galleryID)
        .then((res) => {
          const { id, name, is_publish } = res.data;
          setGallery({ id, name, is_publish });
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  useEffect(() => {
    if (id !== "new") {
      API.listGalleryImage(id)
        .then((res) => {
          setImages(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gallery.name.trim() === "") {
      return;
    }
    if (id === "new") {
      API.createGallery(gallery)
        .then((res) => {
          history.replace(path.replace(":id", res.data.id));
          const { id, name, is_publish } = res.data;
          setGallery({ id, name, is_publish });
          setIsNameEditing(false);
        })
        .catch((err) => console.error(err));
    } else {
      const { id, name } = gallery;
      API.updateGalleryName({ id, name })
        .then(() => {
          setGallery({ ...gallery, name });
        })
        .catch((err) => console.error(err));
    }
  };

  const handleFileChange = (e) => {
    if (id === "new") {
      return;
    }
    const form = new FormData();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      form.append("photos", files[i]);
    }
    API.upload(id, form)
      .then((res) => {
        setImages([...images, ...res.data]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleDelete = (id) => {
    API.deleteImage(id)
      .then(() => {
        const filter = images.filter((img) => img.id !== id);
        setImages(filter);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const inputClasses = classNames("gallery-form__text", {
    "gallery-form__text--editing": isNameEditing,
  });

  return (
    <div>
      <form className="gallery-form" onSubmit={handleSubmit}>
        <input
          className={inputClasses}
          type="text"
          value={gallery.name}
          placeholder="Gallery's Name"
          onFocus={() => setIsNameEditing(true)}
          onBlur={() => setIsNameEditing(false)}
          onChange={(e) => setGallery({ ...gallery, name: e.target.value })}
          autoFocus
        ></input>
      </form>
      <div className="upload">
        <label className="upload__label" htmlFor="photos">
          <span className="upload__label__text">Upload</span>
          <FontAwesomeIcon
            className="upload__label__icon"
            icon="upload"
            size="lg"
          />
        </label>
        <input
          className="upload__input"
          type="file"
          id="photos"
          name="photos"
          multiple
          onChange={handleFileChange}
        ></input>
      </div>
      <div className="images">
        {images.map((img) => (
          <div className="image" key={img.id}>
            <img src={`${API.host}/${img.filename}`} alt={img.filename} />
            <button
              className="image__button"
              onClick={() => {
                handleDelete(img.id);
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
