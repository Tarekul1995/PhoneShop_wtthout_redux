import React from "react";
import { Link } from 'react-router-dom'
import { addCart } from "./../../store/action"


function Itemcrad(props) {


    const PATH = "http://Tarekul1995.github.io/PhoneShop_wtthout_redux"
    return (
        <React.Fragment>
            {
                props.value && props.value.map(data => {
                    return (
                        <div className="col-lg-3 " key={data.id} >
                            <div className="card shadow-sm p-3 mb-5 bg-white rounded" style={{ width: '15rem' }}>
                                <img src={require(`./../../image/${data.imageUrl}`)} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <span> {data.Brand} </span>
                                    <Link to={`${PATH}/Mobile/${data.id}`}  style={{ textDecoration:'none' }}><h3>{data.Name}</h3></Link>
                                    <h5> {data.price} </h5>
                                    <button type="button" className="btn btn-primary" onClick={ ()=>addCart(props.user,data.id,props.disAction) }>
                                        <span><i className="fa fa-shopping-cart"></i> </span>
                                        Add Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

export default Itemcrad;