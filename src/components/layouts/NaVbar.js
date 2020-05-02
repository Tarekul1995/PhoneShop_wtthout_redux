import React, { useContext, useState } from 'react';
import AutoSug from './AutoComplete'
import { stateContext, AuthContext } from './../../App'
import { Link } from 'react-router-dom'
import { signOut, removeCart, updateCart } from "./../../store/action";


function Navigation(props) {

  const essentail = useContext(stateContext);
  let y = [...new Set(essentail.Data.data.map(value => value.Brand))]
  let cartarr = [];
  const authstate = useContext(AuthContext)
  const PATH = "http://Tarekul1995.github.io/PhoneShop_wtthout_redux"

  
  if (essentail.cartData.item.length > 0) {

     essentail.cartData.item.forEach(el=>{
      essentail.Data.data.forEach(value=>{
        if (value.id === el.id) {
          cartarr.push({...value,quantity:el.quantity})
        }
      })
    })

    
  }
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: 'relative' }}>
      <Link className="navbar-brand" to='/Home'>MobileShop</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse mr-5 d-lg-flex" id="navbarSupportedContent">

        <AutoSug items={essentail.Data.data} />

        <ul className="navbar-nav ml-auto" >
          <li className="nav-item active">
            <Link className="nav-link" to={`${PATH}/Home`}>Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Brand
              </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {
                y.map(value => <Link className="dropdown-item" key={value} to={`${PATH}/Brand/${value}`}>{value}</Link>)
              }
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link">About</a>
          </li>
          {
            authstate.Authen.isAuth === 'no' || props.fbAuth === 'no' ? (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to={`${PATH}/login`}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`${PATH}/SignUp`}>SginUp</Link>
                </li>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <li className="nav-item" data-toggle="modal" data-target="#exampleModalScrollable"> <span className="nav-link"> <i className="fa fa-cart-plus"></i> Cart <span className="badge badge-info">{ essentail.cartData.item.length }</span></span> </li>
                  <li className="nav-item"> <span className="nav-link" onClick={() => signOut(authstate.dispatchAuth)}> Logout</span></li>

                  <div className="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalScrollableTitle">Your Cart List</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="list-group list-group-flush">
                            {
                              cartarr.length > 0  ? cartarr.map(item=>(
                                <li key={ item.id } className="list-group-item d-flex">
                              <div className="d-flex justify-content-around align-items-center">
                                <img src={require(`./../../image/${item.imageUrl}`)} className="mr-3" alt="..." width="64px" height="64px" />
                                <div className="mr-4" >
                              <h5 className="mt-0">{ item.Brand+' '+item.Name }</h5>
                                  <div className="d-flex">
                                    {
                                      item.quantity < 2 ? null : <button type="button" className="btn btn-outline-primary" onClick={()=>updateCart(authstate.user,item.id,item.quantity-1)}>&lt;</button>
                                    }
                                      <p className="h4 mx-3"><mark>{item.quantity}</mark></p>
                                    {
                                      item.quantity < 5 ? <button type="button" className="btn btn-outline-primary" onClick={()=>updateCart(authstate.user,item.id,item.quantity+1)}>&gt;</button> : null
                                    }
                                  </div>
                                </div>
                                <div className="mr-5">
                                  <h6>Price</h6>
                                  <p> { parseInt( item.price.replace(',','')) * parseInt(item.quantity) } </p>
                                </div>
                                <span onClick={()=>removeCart(authstate.user,item.id)} style={{ color: 'red', fontSize: "30px" }} ><i className="fa fa-trash-o"></i></span>
                              </div>
                            </li>
                              )) : (<li className="mx-auto"><h5 > Cart is Empty </h5></li>)
                            }

                          </ul>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
          }
        </ul>
      </div>
    </nav>

  )
}

export default React.memo(Navigation);
