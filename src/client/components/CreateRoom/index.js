import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
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
      roomname: "",
      roomkey: ""
    };
    this.handleRoomDetails = this.handleRoomDetails.bind(this);
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
      }.bind(this)
    );
  }
  handleRoomDetails(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }
  createNewRoom() {
    const roomname = this.state.roomname;
    const roomkey = this.state.roomkey;
    const socket = this.props.socket;
    if (roomname !== "" && roomkey !== "") {
      let data = {
        roomname: roomname,
        roomkey: roomkey
      };
      socket.emit("createRoom", data);
    }
    this.setState({ roomname: "", roomkey: "" });
  }
  render() {
    return (
      <div id="createRoom">
        <div id="createRoomForm">
          <h1>Create Room</h1>
          <label id="roomLabel">Room Name</label>
          <input
            id="roomname"
            name="roomname"
            placeholder="Enter room name"
            onChange={this.handleRoomDetails}
            value={this.state.roomname}
          />
          <label id="roomLabel">Room Key</label>
          <input
            id="roomkey"
            type="password"
            name="roomkey"
            placeholder="Enter room key"
            onChange={this.handleRoomDetails}
            value={this.state.roomkey}
          />
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
)(CreateRoom);
