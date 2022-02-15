import firebase from "firebase/app";
import "firebase/auth";

// API keys for eventCloud
// To-do change to hardcoded api keys to env vars
const firebaseConfig = {
    apiKey: "AIzaSyBSEx2-ykPTb70keLZh3LAuDtQT2VyCsco",
    authDomain: "evencloud-26d32.firebaseapp.com",
    databaseURL: "https://evencloud-26d32.firebaseio.com",
    projectId: "evencloud-26d32",
    storageBucket: "evencloud-26d32.appspot.com",
    messagingSenderId: "599725599274",
    appId: "1:599725599274:web:8f9a716ca577fc72a1f153",
    measurementId: "G-VSJNQ5LYK5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

let auth = firebase.auth();

var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();

export {
    auth,
    googleProvider,
    facebookProvider,
    firebase as default,
};