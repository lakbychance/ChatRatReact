let express = require("express");
let path = require("path");
let cors = require("cors");
let app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "./dist")));
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let socketIdToUsername = {};
let roomsList = [];
function generateRoomId() {
  return (Math.random() * 100000000).toFixed(0);
}
function createRoom(data, socket) {
  const roomId = generateRoomId();
  const { roomkey, roomname } = data;
  let members = [];
  let room = {
    roomId: roomId,
    roomkey: roomkey,
    roomname: roomname,
    members: members
  };
  return room;
}
let manageSockets = function(socket) {
  socket.on("getRoomsList", function() {
    socket.emit("takeRoomsList", [
      ...roomsList.filter(room => {
        delete room["roomkey"];
        return room;
      })
    ]);
  });
  socket.on("authorisedToJoinRoom", (room, key) => {
    if (key === room.roomkey) {
      socket.emit("canJoinRoom", { canJoinRoom: true, room: room });
    } else {
      socket.emit("canJoinRoom", { canJoinRoom: false, room: room });
    }
  });
  socket.on("joinRoom", (room, username) => {
    socket.join(room.roomId);
    let socketId = socket.id;
    socketIdToUsername[socketId] = { username, room };
    let updatedRoom = [...roomsList.filter(r => r.roomId === room.roomId)][0];
    if (updatedRoom) {
      let user = { socketId: socketId, username: username };
      updatedRoom.members.push(user);
      roomsList.map(r => {
        if (r.roomId === room.roomId) {
          r = updatedRoom;
        }
      });
    }
    socket.broadcast
      .to(room.roomId)
      .emit("joinRoom", `${username} has joined the conversation`);
    io.to(room.roomId).emit("updatedRoom", updatedRoom);
  });
  socket.on("join", function(username) {
    let socketId = socket.id;
    socketIdToUsername[socketId] = username;
    socket.broadcast.emit("join", `${username} has joined the conversation`);
  });
  socket.on("createRoom", function(data) {
    let room = createRoom(data, socket);
    roomsList.push(room);
    io.emit("roomCreated", roomsList, room);
  });

  socket.on("disconnecting", () => {
    let socketId = socket.id;
    let roomId = "";
    if (socketIdToUsername[socketId] !== undefined) {
      roomId = socketIdToUsername[socketId].room.roomId;
      let currentRoom = roomsList.filter(room => room.roomId === roomId)[0];
      if (currentRoom && currentRoom.members) {
        currentRoom.members.map(member => {
          if (member.socketId === socketId) {
            member.username = null;
          }
        });
      }
      io.to(roomId).emit(
        "disconnected",
        `${socketIdToUsername[socketId].username} has left the conversation`,
        currentRoom
      );
    }
  });
  socket.on("chatMessage", function(msg, room) {
    io.to(room.roomId).emit("chatMessage", msg, socket.id);
  });
  socket.on("userTyping", function(typingMessage, room) {
    socket.broadcast.to(room.roomId).emit("userTyping", typingMessage);
  });
};
io.on("connection", manageSockets);
http.listen(process.env.PORT || 5000, function() {
  console.log(`Server is listening`);
});
