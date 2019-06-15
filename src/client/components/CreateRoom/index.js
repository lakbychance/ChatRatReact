import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import { withRouter } from "react-router";
import {
  createRoom,
  populateRoomsList,
  populateRoom,
  populateUsername
} from "../../action-creators/action-creator";
class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: ""
    };
    this.handleRoomName = this.handleRoomName.bind(this);
    this.createNewRoom = this.createNewRoom.bind(this);
  }
  componentDidMount() {
    let socket = this.props.socket;

    socket.on("connect", () => {
      socket.emit("getRoomsList");
    });
    socket.on("takeRoomsList", roomsList => {
      this.props.populateRoomsList(roomsList);
    });
    socket.on(
      "roomCreated",
      function(roomsList, room) {
        this.props.createRoom(roomsList);
        // if (room.roomAdmin.socketId === socket.id) {
        //   let username = this.state.username;
        //   this.props.populateRoom(room);
        //   this.props.populateUsername(username);
        //   socket.emit("joinRoom", room, username);
        //   this.props.history.replace("/chatRoom");
        // }
      }.bind(this)
    );
  }
  handleRoomName(e) {
    this.setState({ roomname: e.target.value });
  }
  createNewRoom() {
    let roomname = this.state.roomname;
    //let username = this.state.username;
    let socket = this.props.socket;
    if (roomname !== "") {
      let data = {
        roomname: roomname
      };
      socket.emit("createRoom", data);
    }
    this.setState({ roomname: "" });
  }
  render() {
    return (
      <div id="createRoom">
        <div id="createRoomForm">
          <h1>Create Room</h1>
          <label id="roomLabel">Room Name</label>
          <input
            id="roomname"
            placeholder="Enter room name"
            onChange={this.handleRoomName}
            value={this.state.roomname}
          />
          {/* <label id="nameLabel">User Name</label>
          <input
            id="username"
            placeholder="Enter user name"
            onChange={this.handleUserName}
          /> */}
          <button id="createRoomButton" onClick={this.createNewRoom}>
            Create Room
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = function(store) {
  return store;
};
const mapDispatchToProps = {
  createRoom,
  populateRoomsList,
  populateRoom,
  populateUsername
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateRoom));
