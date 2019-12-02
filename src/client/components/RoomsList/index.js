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
      roomkey: "",
      selectedRoomId: "",
      viewRooms: false
    };
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleJoiningDetails = this.handleJoiningDetails.bind(this);
    this.handleUsernameFinal = this.handleUsernameFinal.bind(this);
  }
  componentDidMount() {
    let socket = this.props.socket;
    socket.on(
      "canJoinRoom",
      function({ canJoinRoom, room }) {
        if (canJoinRoom) {
          let username = this.state.username;
          socket.emit("joinRoom", room, username);
          this.props.history.replace("/chatRoom");
          this.props.populateUsername(username);
        } else {
          alert("Please enter the valid room key");
        }
      }.bind(this)
    );
  }
  handleJoinRoom(room) {
    let socket = this.props.socket;
    const roomkey = this.state.roomkey;
    if (roomkey !== "") {
      socket.emit("authorisedToJoinRoom", room, roomkey);
    }
  }
  handleJoiningDetails(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
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
            name="username"
            placeholder="Enter user name"
            value={this.state.username}
            onChange={this.handleJoiningDetails}
          />
          <button id="joinUsernameButton" onClick={this.handleUsernameFinal}>
            View Rooms
          </button>
        </div>
        <div id="roomsContainer">
          {this.state.viewRooms && this.props.roomsList.length !== 0
            ? this.props.roomsList.map(room => (
                <div className="room" key={room.roomId}>
                  <div
                    onClick={() =>
                      this.setState({
                        selectedRoomId: room.roomId,
                        roomkey: ""
                      })
                    }
                    className="roomDetails"
                  >
                    <div className="availableroomdetails">
                      <span className="availableroomname">
                        {room.roomname}-{room.roomId}
                      </span>
                    </div>
                    {this.state.selectedRoomId !== room.roomId
                      ? []
                      : [
                          <input
                            name="roomkey"
                            type="password"
                            placeholder="Enter Room Key"
                            value={this.state.roomkey}
                            onChange={this.handleJoiningDetails}
                          />,
                          <button onClick={() => this.handleJoinRoom(room)}>
                            Join
                          </button>
                        ]}
                  </div>
                </div>
              ))
            : null}
        </div>
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
