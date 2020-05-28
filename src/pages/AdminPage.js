import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listGallery, createGallery, deleteGallery } from "../api";

export default function AdminPage() {
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
    <div>
      <nav class="nav">
        <Link to="/admin" class="nav__brand">
          Gallery
        </Link>
      </nav>
      <div class="container">
        <form class="gallery-form" onSubmit={handleSubmit}>
          <div class="gallery-form__field">
            <label for="gallery-name">Gallery Name</label>
            <input
              type="text"
              id="gallery-name"
              autoFocus
              value={galleryName}
              onChange={(e) => setGalleryName(e.target.value)}
            />
          </div>
          <button type="submit" class="gallery-form__submit">
            submit
          </button>
        </form>
        <table class="gallery-list">
          <thead class="gallery-list__head">
            <tr class="gallery-list__headrow">
              <th>#</th>
              <th>Gallery Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="gallery-list__body">
            {galleries.map((gallery, index) => {
              return (
                <tr key={gallery.id} class="gallery-list__row">
                  <td>{index + 1}</td>
                  <td>{gallery.name}</td>
                  <td>
                    <button
                      class="gallery-list__action"
                      onClick={() => handleDelete(gallery.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
