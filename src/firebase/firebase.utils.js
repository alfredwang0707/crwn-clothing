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

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()
    
    //documentRef => crud actions
    //collectionRed returns query  snapshot object
    console.log(snapShot);
    if(!snapShot.exists){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({ 
            displayName,
            email,
            createdAt,
            ...additionalData})
         
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    
    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)


  export default firebase