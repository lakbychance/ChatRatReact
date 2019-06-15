import React, { Component } from "react";
import ChatBox from "../../App";
import { connect } from "react-redux";
import { populateRoom } from "../../action-creators/action-creator";
import "./style.css";
class RoomMembers extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   room: this.props.room
    // };
  }
  componentDidMount() {
    let socket = this.props.socket;
    socket.on(
      "updatedRoom",
      function(room) {
        this.props.populateRoom(room);
        //this.setState({ room: room });
      }.bind(this)
    );
    socket.on(
      "disconnected",
      function(msg, room) {
        this.props.populateRoom(room);
      }.bind(this)
    );
  }
  render() {
    // console.log(this.state.room.members);
    return (
      <div id="roomMembers">
        {this.props.room &&
        this.props.room.members &&
        this.props.room.members.length !== 0
          ? this.props.room.members.map(function(member) {
              return member.username !== null ? (
                <div id="member" value={member.username} key={member.socketId}>
                  {member.username}
                </div>
              ) : null;
            })
          : null}
      </div>
    );
  }
}
const mapStateToProps = store => {
  return store;
};
const mapDispatchToProps = {
  populateRoom
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomMembers);
