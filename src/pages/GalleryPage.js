import React, { useState } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
import API from "../api";

export default function () {
  const { url } = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [galleryName, setGalleryName] = useState("");

  const handleNameChanged = (e) => {
    e.preventDefault();
    if (galleryName.trim() === "") {
      return;
    }
    API.updateGalleryName(galleryName)
      .then((res) => {
        history.replace(`${url}/${res.data.id}`);
        setIsNameEditing(false);
        setGalleryName("");
      })
      .catch((err) => console.error(err));
  };

  const inputClasses = classNames("gallery-form__text", {
    "gallery-form__text--editing": isNameEditing,
  });

  return (
    <div>
      <form className="gallery-form" onSubmit={handleNameChanged}>
        <input
          className={inputClasses}
          type="text"
          value={galleryName}
          placeholder="Gallery's Name"
          onFocus={() => setIsNameEditing(true)}
          onBlur={() => setIsNameEditing(false)}
          onChange={(e) => setGalleryName(e.target.value)}
          autoFocus
        ></input>
      </form>
    </div>
  );
}
