import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyC1UkWsYp1q-woO4C0-j0Aien2P5vK6ibY",
    authDomain: "product-24cbb.firebaseapp.com",
    databaseURL: "https://product-24cbb.firebaseio.com",
    projectId: "product-24cbb",
    storageBucket: "product-24cbb.appspot.com",
    messagingSenderId: "495185627160",
    appId: "1:495185627160:web:1a54789d941822835adb6d",
    measurementId: "G-PJH3JJSXGE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const Database = firebase.database();