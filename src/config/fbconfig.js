import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCBJony9Srsm5DluvruAx63cHQm8bLMUh0",
    authDomain: "onlineshop-d09a7.firebaseapp.com",
    databaseURL: "https://onlineshop-d09a7.firebaseio.com",
    projectId: "onlineshop-d09a7",
    storageBucket: "onlineshop-d09a7.appspot.com",
    messagingSenderId: "516105907813",
    appId: "1:516105907813:web:d336c9ac9649f8e18d208c",
    measurementId: "G-8XVR0GLMPP"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;