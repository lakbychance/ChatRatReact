import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { Popover, PopoverBody } from "reactstrap";
import RoomMembers from "../RoomMembers/index";
class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false
    };
    this.handleTyping = this.handleTyping.bind(this);
    this.handleChatMessage = this.handleChatMessage.bind(this);
    this.handlePopover = this.handlePopover.bind(this);
  }

  componentDidMount() {
    let socket = this.props.socket;
    socket.on(
      "joinRoom",
      function(joinMessage) {
        this.joinOrLeft(joinMessage, "join");
      }.bind(this)
    );
    socket.on(
      "connect",
      function() {
        let username = this.props.username;
        let room = this.props.room;
        if (username != "") {
          socket.emit("joinRoom", room, username);
        }
      }.bind(this)
    );
    socket.on(
      "chatMessage",
      function(msg, socketId) {
        let username = this.props.username;
        let allMessages = document.querySelectorAll("#messages");
        let messages = allMessages[allMessages.length - 1];
        let item = document.createElement("li");
        if (socketId === socket.id) {
          item.style.textAlign = "right";
          item.className = "sender";
          item.innerText = msg.substr(msg.indexOf(":") + 1, msg.length);
        } else {
          item.className = "receiver";
          item.innerText = msg;
        }
        messages.append(item);
        let chatBoard = document.getElementById("chatBoard");
        chatBoard.scrollTo(0, chatBoard.scrollHeight);
      }.bind(this)
    );
    socket.on("userTyping", function(typingMessage) {
      let typing = document.getElementById("typing");
      typing.innerText = typingMessage;
    });
    socket.on(
      "disconnected",
      function(disconnectMessage) {
        this.joinOrLeft(disconnectMessage, "disconnected");
      }.bind(this)
    );
  }
  handlePopover() {
    this.setState({ isPopoverOpen: !this.state.isPopoverOpen });
  }
  handleChatMessage() {
    let socket = this.props.socket;
    let message = document.getElementById("m").value;
    let username = this.props.username;
    let room = this.props.room;
    if (username !== "" && message !== "") {
      socket.emit("chatMessage", username + ": " + message, room);
      socket.emit("userTyping", "", room);
      document.getElementById("m").value = "";
    }
  }
  handleTyping(event) {
    let socket = this.props.socket;
    let room = this.props.room;
    let username = this.props.username;
    if (event.target.value !== "" && username !== "")
      socket.emit("userTyping", `${username} is typing`, room);
    else socket.emit("userTyping", "", room);
  }
  joinOrLeft(message, event) {
    let list = document.createElement("ul");
    list.id = "joinedList";
    let element = document.createElement("li");
    element.innerText = message;
    if (event === "join") {
      element.className = "joinedChat";
    } else {
      element.className = "leftChat";
    }
    list.append(element);
    let allMessages = document.querySelectorAll("#messages");
    let messages = allMessages[allMessages.length - 1];
    messages.insertAdjacentElement("afterend", list);
    let newMessages = document.createElement("ul");
    newMessages.id = "messages";
    list.insertAdjacentElement("afterend", newMessages);
    let chatBoard = document.getElementById("chatBoard");
    chatBoard.scrollTo(0, chatBoard.scrollHeight);
  }

  render() {
    return (
      <div>
        <div id="typing" />
        <div id="chatBoard">
          <ul id="messages" />
        </div>
        <form action="" onSubmit={event => event.preventDefault()}>
          <input
            placeholder="Type Message..."
            id="m"
            autoComplete="off"
            onChange={this.handleTyping}
          />
          <button onClick={this.handleChatMessage}>Send</button>
        </form>
        <div id="onlineMobile">
          {this.props.room && this.props.room.members ? (
            <p>
              Online users -{" "}
              {
                this.props.room.members.filter(
                  member => member.username !== null
                ).length
              }
            </p>
          ) : null}
          <Popover
            placement="bottom"
            isOpen={this.state.isPopoverOpen}
            target="onlineMobile"
            toggle={this.handlePopover}
          >
            <div id="publicRoomName">
              {this.props.room.roomname}-{this.props.room.roomId}
            </div>
            <RoomMembers />
          </Popover>
        </div>
      </div>
    );
  }
}
const mapStateToProps = function(store) {
  return store;
};
export default connect(mapStateToProps, null)(ChatBox);
