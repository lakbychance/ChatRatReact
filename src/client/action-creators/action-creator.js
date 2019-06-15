import actionTypes from "../action-types/action-types";
export function createRoom(roomsList) {
  return {
    type: actionTypes.CreateRoom,
    payload: { roomsList: roomsList }
  };
}
export function populateRoomsList(roomsList) {
  return {
    type: actionTypes.PopulateRoomsList,
    payload: { roomsList: roomsList }
  };
}
export function populateUsername(username) {
  return {
    type: actionTypes.PopulateUsername,
    payload: { username: username }
  };
}
export function populateRoom(room) {
  return {
    type: actionTypes.PopulateRoom,
    payload: { room: room }
  };
}
