import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config =  {
    apiKey: "AIzaSyCWBdo5j-TPgWGy4FbJbZc_ZtzLDI59JRM",
    authDomain: "crwn-db-fd63d.firebaseapp.com",
    projectId: "crwn-db-fd63d",
    storageBucket: "crwn-db-fd63d.appspot.com",
    messagingSenderId: "1024324791855",
    appId: "1:1024324791855:web:e8e18355681526d75220da",
    measurementId: "G-FPCTMT6RFT"
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)


  export default firebase