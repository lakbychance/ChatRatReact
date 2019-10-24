import actionTypes from "../action-types/action-types";
import socketIOClient from "socket.io-client";
let initialState = {
  socket: socketIOClient(`http://${window.location.hostname}:5000`),
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
