import mainReducer from "../reducers/mainReducer"
import { createStore } from "redux";
let store = createStore(mainReducer)
export default store;