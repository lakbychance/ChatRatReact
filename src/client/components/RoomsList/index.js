import React, { Component } from "react";
import { withRouter } from "react-router";
import "./style.css";
import { connect } from "react-redux";
import {
  populateUsername,
  populateRoom
} from "../../action-creators/action-creator";
class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      viewRooms: false
    };
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleUsernameFinal = this.handleUsernameFinal.bind(this);
  }
  handleJoinRoom(room) {
    let socket = this.props.socket;
    let username = this.state.username;
    socket.emit("joinRoom", room, username);
    this.props.history.replace("/chatRoom");
    this.props.populateUsername(username);
  }
  handleUsername(e) {
    this.setState({ username: e.target.value });
  }
  handleUsernameFinal(e) {
    if (this.state.username !== "") {
      let joinUsername = document.getElementById("joinUsername");
      joinUsername.disabled = true;
      let joinUsernameButton = document.getElementById("joinUsernameButton");
      joinUsernameButton.disabled = true;
      this.setState({ viewRooms: true });
    }
  }
  render() {
    return (
      <div id="roomsList">
        <h1>Available Rooms</h1>
        <div>
          <input
            id="joinUsername"
            placeholder="Enter user name to view rooms"
            value={this.state.username}
            onChange={this.handleUsername}
          />
          <button id="joinUsernameButton" onClick={this.handleUsernameFinal}>
            View Rooms
          </button>
        </div>
        {this.state.viewRooms && this.props.roomsList.length !== 0
          ? this.props.roomsList.map(room => (
              <div id="room" key={room.roomId}>
                <div id="roomDetails">
                  <div id="availableroomname">
                    {room.roomname}-{room.roomId}
                  </div>
                </div>
                <button onClick={this.handleJoinRoom.bind(this, room)}>
                  Join
                </button>
              </div>
            ))
          : null}
      </div>
    );
  }
}
const mapStateToProps = function(store) {
  return store;
};
const mapDispatchToProps = {
  populateUsername,
  populateRoom
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RoomsList));
