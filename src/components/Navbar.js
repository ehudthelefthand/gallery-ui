import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <nav className="nav">
      <Link to="/admin" className="nav__brand">
        Gallery
      </Link>
    </nav>
  );
}
