import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listGallery } from "../api";

export default function AdminPage() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    listGallery()
      .then((data) => {
        setGalleries(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <nav class="nav">
        <Link to="/admin" class="nav__brand">
          Gallery
        </Link>
      </nav>
      <div class="container">
        <form class="gallery-form">
          <div class="gallery-form__field">
            <label for="gallery-name">Gallery Name</label>
            <input type="text" id="gallery-name" autoFocus />
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
            {galleries.map((gallery) => {
              return (
                <tr key={gallery.id} class="gallery-list__row">
                  <td>3</td>
                  <td>{gallery.name}</td>
                  <td>
                    <button class="gallery-list__action">delete</button>
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
