import React, { useState, useEffect } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
import API from "../api";

export default function () {
  const { url, path } = useRouteMatch();
  console.log("url", url);
  console.log("path", path);
  const { id } = useParams();
  console.log("id", id);
  const history = useHistory();
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [gallery, setGallery] = useState({
    id: null,
    name: "",
    is_publish: false,
  });

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
  }, []);

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
      <form
        method="POST"
        action={`/galleries/${id}/images`}
        enctype="multipart/form-data"
      >
        <input type="file" name="photos" multiple />
        <button type="submit">upload</button>
      </form>
    </div>
  );
}
