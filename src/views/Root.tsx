import React, { FC } from "react";
import { HashRouter, Navigate, Routes } from "react-router-dom";
import { Route } from "react-router";

import HomeView from "./HomeView";
import Notifications from "./Notifications";
import GraphView from "./GraphView";

const Root: FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/embed" element={<GraphView embed />} />
          <Route path="/graph" element={<GraphView />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
      <Notifications />
    </>
  );
};

export default Root;
