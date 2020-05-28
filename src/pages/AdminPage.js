import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Navbar from "../components/Navbar";
import GalleryList from "../components/GalleryList";
import GalleryPage from "../pages/GalleryPage";

export default function AdminPage() {
  const { url, path } = useRouteMatch();

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path={path}>
          <GalleryList />
        </Route>
        <Route path={`${path}/gallery/:id`}>
          <GalleryPage />
        </Route>
      </Switch>
    </div>
  );
}
