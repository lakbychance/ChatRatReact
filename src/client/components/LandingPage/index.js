import React, { Component } from "react";
import CreateRoom from "../CreateRoom";
import RoomsList from "../RoomsList";
import "./index.css";
const LandingPage = () => {
  return (
    <div id="landingPage">
      <CreateRoom />
      <RoomsList />
    </div>
  );
};
export default LandingPage;
