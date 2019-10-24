import React, { Component } from "react";
import ChatBox from "../ChatBox/index";
import { connect } from "react-redux";
import RoomMembers from "../RoomMembers/index";
import "./style.css";
class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="chatRoom">
        <div id="chatBox">
          <ChatBox />
        </div>
        <div id="membersBoard">
          <div id="publicRoomName">
            {this.props.room.roomname}-{this.props.room.roomId}
          </div>
          <RoomMembers />
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return store;
};
export default connect(mapStateToProps)(ChatRoom);
