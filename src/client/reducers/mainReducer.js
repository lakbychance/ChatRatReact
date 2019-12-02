import actionTypes from "../action-types/action-types";
import socketIOClient from "socket.io-client";
let socketClient = null;
if (process.env.NODE_ENV === "development") {
  socketClient = socketIOClient("http://localhost:5000");
} else {
  socketClient = socketIOClient();
}
let initialState = {
  socket: socketClient,
  roomsList: [],
  username: "",
  room: {}
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CreateRoom: {
      return { ...state, ...action.payload };
    }
    case actionTypes.PopulateRoomsList: {
      return { ...state, ...action.payload };
    }
    case actionTypes.PopulateRoom: {
      return { ...state, ...action.payload };
    }
    case actionTypes.PopulateUsername: {
      return { ...state, ...action.payload };
    }
    default:
      break;
  }
  return state;
}

export default mainReducer;
