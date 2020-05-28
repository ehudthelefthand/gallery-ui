import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Navbar from "../components/Navbar";
import GalleryList from "../components/GalleryList";

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
          <div>Gallery</div>
        </Route>
      </Switch>
    </div>
  );
}
