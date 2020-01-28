import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD4QJQn8taKoIjDovIggk1B7HQ7H6NEF8w",
    authDomain: "unicar-platform.firebaseapp.com",
    databaseURL: "https://unicar-platform.firebaseio.com",
    projectId: "unicar-platform",
    storageBucket: "unicar-platform.appspot.com",
    };
    const firebaseApp = firebase.initializeApp(firebaseConfig);