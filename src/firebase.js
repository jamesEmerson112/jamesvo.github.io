// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// using old syntax 
// https://stackoverflow.com/questions/69395321/typeerror-firebaseapp-firestore-is-not-a-function
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrt-A-D9Pcyf6VAVrdKLYXXcvmwF9HZZU",
  authDomain: "tweetfolio-1c5cb.firebaseapp.com",
  projectId: "tweetfolio-1c5cb",
  storageBucket: "tweetfolio-1c5cb.appspot.com",
  messagingSenderId: "190459148195",
  appId: "1:190459148195:web:12573debde9964e581cc16",
  measurementId: "G-2DYN3FQXWV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// database - us-west1
const db = getFirestore(firebaseApp);

export default db;


// You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.
// Sign in to Google
// firebase login
// Initiate your project

// Run this command from your app’s root directory:
// firebase init
// When you’re ready, deploy your web app

// Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:
// firebase deploy

// After deploying, view your app at tweetfolio-1c5cb.web.app