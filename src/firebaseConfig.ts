// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//add database from firebase
import { getFirestore, collection } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDGI5Z8KKCj-JnbBzyqsniGXQPMaUo3g5o",
    authDomain: "moviewatchlist-3831d.firebaseapp.com",
    projectId: "moviewatchlist-3831d",
    storageBucket: "moviewatchlist-3831d.appspot.com",
    messagingSenderId: "469596024562",
    appId: "1:469596024562:web:d8e9d01537ae65f58baa6b",
    measurementId: "G-N4MDRQRFNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, analytics, db };
