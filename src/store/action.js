import firebase from '../config/fbconfig'
import { notification } from './Notification'


const db = firebase.firestore()


 export function actionSignup(data,dispatch){  
      db.collection("User").where("Contact",'==',data.Contact).get().then((snap)=>{    
        if (snap.empty) {
            if(data.password === data.rePassword){        
                    firebase.auth().createUserWithEmailAndPassword(data.email,data.password).then((respons)=>{
                        db.collection("User").doc(respons.user.uid).set({
                            Name:data.firstName+' '+data.lastName,
                            Address:data.address,
                            Contact:data.Contact,
                            Gender:data.gender,
                        }).then(()=>{
                            
                            dispatch({ type:"Register",payload:{isAuth:"yes"} })
                        }).catch((err)=>{
                            notification("Error",err.message,'danger')
                            dispatch({ type:"Register",payload:{ isAuth:"no"} })
                        })
                    })
            }

        } else {
            notification("Error","This contact number already saved in database",'danger')
            dispatch({ type:"Register",payload:{ isAuth:"no"} })
        }
    }).catch(err=>{
        
    })
    
}

export function login(data,dispatch){
    firebase.auth().signInWithEmailAndPassword(data.email,data.password).then(()=>{
        
        dispatch({ type:"Login", payload:{isAuth:"yes"} })
    }).catch(error=>{
        notification("Error",error.message,'danger')
        dispatch({ type:"Login", payload:{isAuth:"no"}  })
    })
}

export function signOut(dispatch){
    firebase.auth().signOut().then(()=>{
        notification("LogOut","Logout Success",'success')
        dispatch({  type:"Authentication", payload:{isAuth:"no"} })
    })
}

export function addCart(user,id,dispatch){
    if (user === 'no') {
        dispatch({ type:"Redirect", payload:true })
    } else {
        db.collection("User").doc(user.uid).collection("Cartgoods").doc(id).set({
            id:id,quantity:1
        }).then(()=>{
            notification("Add Cart","Item has added successfully","info")
        }).catch(err=>{
            dispatch({ type:'ActionCart', payload:{ error:false,variant:'danger',message: "Sorry, Internet cnnection is disconnect"  } })
        })
    }
}

export function updateCart(user,id,amount){
    db.collection("User").doc(user.uid).collection("Cartgoods").doc(id).update({
        quantity:amount
    })
}

export function removeCart(user,id){
    db.collection("User").doc(user.uid).collection("Cartgoods").doc(id).delete()
}