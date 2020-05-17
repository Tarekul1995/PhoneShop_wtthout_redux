import React, { useState,useContext, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { stateContext, AuthContext } from './../../App'
import Spinner from './../layouts/Spinner'
import { addCart, updateCart } from "./../../store/action"
import ReactNotification from 'react-notifications-component'
import { Redirect } from 'react-router-dom'



function Mobiledetail() {

    const { id } = useParams()
    const fillterContext = useContext(stateContext)
    const authstate = useContext(AuthContext)
    const fillterId = fillterContext.Data.data.filter(value => value.id === id)
    const [amount,setAmount] = useState(0)
    
    console.log(amount);

    useEffect(()=>{
        
        setAmount(()=>{
            let c =  fillterContext.cartData.item.filter(value=>value.id===fillterId[0].id)
            if (c[0]) {
                return c[0].quantity;
            }       
            
        })
        
    },[fillterContext.cartData.item])
    
    if(fillterContext.cartData.redirect) return <Redirect to={{ pathname: '/login', state: { message: "Please login your accont" }}} />
    
    return (
        <div style={{ background: "linear-gradient(-45deg,#EE7752,#E73C7E,#23A6D5,#23D5AB)" }}>
            <ReactNotification />
            <div className="container" >
            {
                fillterId[0] ? (
                    <div className="row" style={{  padding:'100px' }}>
                        <div className="col-lg-4 col-sm-12">
                            <img src={require(`./../../image/${fillterId[0].imageUrl}`)} className="img-thumbnail" alt="" />
                        </div>
                        <div className="col-lg-8  col-sm-12 py-lg-5">
                            <h1>{fillterId[0].Brand + ' ' + fillterId[0].Name}</h1>
                            <h5> {fillterId[0].price} </h5>
                            {
                                authstate.user !== 'no' && amount ? (
                                    <div className="d-flex">
                                    {
                                      amount < 2 ? null : <button type="button" className="btn btn-outline-primary" onClick={()=>updateCart(authstate.user,fillterId[0].id,amount-1)}>&lt;</button>
                                    }
                                      <p class="h4 mx-3"><mark>{amount}</mark></p>
                                    {
                                      amount < 5 ? <button type="button" className="btn btn-outline-primary" onClick={()=>updateCart(authstate.user,fillterId[0].id,amount+1)}>&gt;</button> : null
                                    }
                                  </div>
                                ) : null
                            }
                            <button type="button" className="btn btn-primary" onClick={()=>addCart(authstate.user,fillterId[0].id,fillterContext.dispatchCart)}>
                                <span><i className="fa fa-shopping-cart"></i> </span>
                                Add Cart
                            </button>
                            <table className="table table-hover my-3">
                                <thead>
                                    <tr>
                                        <th scope="col">Specification</th>
                                        <th scope="col">Specification value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(fillterId[0].Specification).map(value=>(
                                            <tr key={value} >
                                                <th>{value}</th>
                                                <th>{ fillterId[0].Specification[value] }</th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : <Spinner />
            }
        </div>
        </div>
    )
}



export default Mobiledetail;