import firebase from 'firebase/app'
import 'firebase/database'

const db = firebase.initializeApp({
  apiKey: 'AIzaSyAuVnR8wRnJdim4mKUvCn24mOPXeeUfomM',
  authDomain: 'etud-seminar-live.firebaseapp.com',
  databaseURL: 'https://etud-seminar-live-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'etud-seminar-live',
  storageBucket: 'etud-seminar-live.appspot.com',
  messagingSenderId: '201471706764',
  appId: '1:201471706764:web:54cd6ad814f3291e021da9',
  measurementId: 'G-P2KHJFTKG6'
}).database()

export default db
