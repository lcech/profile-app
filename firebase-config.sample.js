const firebase = require('firebase');
//import firestore from 'firebase/firestore'

const config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
}

firebase.initializeApp(config)

const settings = {timestampsInSnapshots: true}
firebase.firestore().settings(settings)

module.exports = firebase;