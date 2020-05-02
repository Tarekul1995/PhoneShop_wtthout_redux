import React, { useContext,useEffect } from "react";
import Itemcrad from "../layouts/Card";
import Spinner from "../layouts/Spinner";
import { stateContext, AuthContext } from "./../../App";
import ReactNotification from 'react-notifications-component'
import { Redirect,useLocation } from 'react-router-dom'
import { notification } from "./../../store/Notification"
import Carousel from "../layouts/Carousel";

function Home() {

    const itemContext = useContext(stateContext);
    const logContext = useContext(AuthContext);
    const location = useLocation()

    useEffect(()=>{
        if (location.state) {
            if (location.state.status === "Register Success") {
                notification("Register Success","Your account make successful login",'success');
            } else if(location.state.status === "Login Success"){
                notification("Login","You've successfully login",'success')
            }
            location.state=null;
            console.log(location.state);
        }
    },[location.state])

   
    
   
    if(itemContext.cartData.redirect) return <Redirect to={{ pathname: '/login', state: { message: "Please login your accont" }}} />


    return (
        <React.Fragment>
            <Carousel />
            <div  style={itemContext.Data.loading ? null : { background: "linear-gradient(-45deg,#EE7752,#E73C7E,#23A6D5,#23D5AB)", paddingTop:'30px' }}>
             <ReactNotification />
            {
                itemContext.Data.loading ? <Spinner /> : (
                    <div className="container">
                        <div className="row">
                            <Itemcrad value={itemContext.Data.data} user={logContext.user} disAction={ itemContext.dispatchCart }/>
                        </div>
                    </div>
                )
            }
        </div>
        </React.Fragment>
    )
}

export default React.memo(Home);