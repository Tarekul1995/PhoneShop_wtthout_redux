import React, { useState, useEffect, useReducer } from 'react';
import firebase from './config/fbconfig'
import { fetchReducer, authReducer, cartReducer } from './store/reducer'
import Home from './components/Pages/Home'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from "./components/layouts/NaVbar";
import BrandShow from './components/Pages/BrandShow'
import Mobiledetail from './components/Pages/Mobiledetail'
import SignUp from './components/Pages/SignUp'
import Login from './components/Pages/Login'
import 'react-notifications-component/dist/theme.css'


const datainitialState = {
  loading: true,
  data: [],
  error: ''
}

const authinitialState = {
  error:false,
  variant:'',
  message:'',
  isAuth:''
}

const cartinitialState = {

  item: [],
  error: '',
  length:0,
  redirect:false

}

export const stateContext = React.createContext()
export const AuthContext = React.createContext()

function App() {

  const [state, dispatch] = useReducer(fetchReducer, datainitialState);
  const [auth, dispatchAuth] = useReducer(authReducer,authinitialState);
  const [ Cart, dispatchCart ] = useReducer(cartReducer, cartinitialState);
  let option = []
  let [status, setStatus] = useState('')
  const PATH = "/PhoneShop_wtthout_redux"

  useEffect(() => {

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        setStatus(user)
        firebase.firestore().collection('User').doc(user.uid).collection("Cartgoods").onSnapshot(querySnapShot=>{
          if (!querySnapShot.empty) {
            let fetchcart = []
            querySnapShot.forEach(doc=>{
              fetchcart.push(doc.data())
            })
            dispatchCart({ type:"FetchCart", payload:fetchcart })
          }
        })
      }else{
        setStatus('no')
      }
    })

    async function fetchData() {
      
      
      await firebase.firestore().collection('Phone').get().then((querySnap) => {
        querySnap.forEach((doc) => {
          option.push(doc.data())
        })
        dispatch({ type: "FETCH_SUCCESS", payload: option })
      }).catch((err) => {
        dispatch({ type: "FETCH_FAILURE", payload: err })
      })
    }

    
    fetchData();
  }, [])


  


  return (
    <Router>
      <AuthContext.Provider value={{Authen:auth, user:status, dispatchAuth:dispatchAuth }}>
      <stateContext.Provider value={{ Data: state, cartData:Cart, dispatchCart:dispatchCart }}>
        {
          status && (
            <Navigation fbAuth={status} />
        )
        }
        <Switch>
          <Route path={`${PATH}/`} >
            <Home />
          </Route>
          <Route path={`${PATH}/Brand/:name`}>
            <BrandShow />
          </Route>
          <Route path={`${PATH}/Mobile/:id`}>
            <Mobiledetail />
          </Route>
          <Route path={`${PATH}/SignUp`}>
            <SignUp />
          </Route>
          <Route path={`${PATH}/login`}>
            <Login />
          </Route>
        </Switch>
      </stateContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;


