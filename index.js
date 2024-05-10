import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAqMqDKrlJ9ksiLKBBGpIhdW6gEkWDV3gE",
//   authDomain: "chatapp-b7b7d.firebaseapp.com",
//   databaseURL: "https://chatapp-b7b7d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "chatapp-b7b7d",
//   storageBucket: "chatapp-b7b7d.appspot.com",
//   messagingSenderId: "638799677869",
//   appId: "1:638799677869:web:f4987b308f7a965c2cb924",
//   measurementId: "G-GTKFPCHHQG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
