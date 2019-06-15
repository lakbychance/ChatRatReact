import React from "react"
import ReactDOM from "react-dom"
import LandingPage from './client/components/LandingPage/index'
import ChatRoom from './client/components/ChatRoom/index'
import {BrowserRouter as Router,Route} from "react-router-dom"
import {Provider} from 'react-redux'
import store from "./client/store/store"
ReactDOM.render( 
    <Provider store={store}>
<Router>
<Route exact path='/' component={LandingPage}/>
<Route exact path='/chatroom' component={ChatRoom}/>
</Router>
</Provider>, document.getElementById("root"));