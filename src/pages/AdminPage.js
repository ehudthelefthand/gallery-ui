import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import GalleryList from "../components/GalleryList";
import GalleryPage from "../pages/GalleryPage";

export default function AdminPage() {
  const { path } = useRouteMatch();

  return (
    <div>
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
