import React, { useContext } from "react";
import { useParams } from 'react-router-dom'
import { stateContext, AuthContext } from './../../App'
import Itemcrad from './../layouts/Card'
import ReactNotification from 'react-notifications-component'
import Carousel from "../layouts/Carousel";

function BrandShow() {
    const { name } = useParams()
    const fillterContext = useContext(stateContext)
    const authen=useContext(AuthContext)
    const fillterBrand = fillterContext.Data.data.filter(value => value.Brand === name)
    return (
        <React.Fragment>
            <Carousel />
            <div style={{ background: "linear-gradient(-45deg,#EE7752,#E73C7E,#23A6D5,#23D5AB)", paddingTop:'30px' }}>
            <ReactNotification />
            <div className="container">
                <div className="row">
                    <Itemcrad value={fillterBrand} user={authen.user}  />
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default BrandShow;
