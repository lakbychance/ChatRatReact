import React, { Component } from "react";
import CreateRoom from "../CreateRoom";
import RoomsList from "../RoomsList";
const LandingPage = () => {
  return (
    <div id="landingPage" style={{ display: "flex", height: "98vh" }}>
      <CreateRoom />
      <RoomsList />
    </div>
  );
};
export default LandingPage;
