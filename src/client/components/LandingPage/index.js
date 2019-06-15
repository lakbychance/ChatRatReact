import React,{Component} from "react"
import CreateRoom from "../CreateRoom"
import RoomsList from "../RoomsList"
import {withRouter} from "react-router-dom"

class LandingPage extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
        }
    }
    render()
    {
        return(
            <div id = "landingPage" style={{display:"flex"}}>
               <CreateRoom/>
               <RoomsList/>
            </div>
        );
    }
}
export default withRouter(LandingPage)