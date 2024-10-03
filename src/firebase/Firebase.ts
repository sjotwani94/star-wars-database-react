// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDmz3uejp625gZGjCZ9QgqlKQKEPYX3o7M',
    authDomain: 'star-wars-encyclopedia-auth.firebaseapp.com',
    projectId: 'star-wars-encyclopedia-auth',
    storageBucket: 'star-wars-encyclopedia-auth.appspot.com',
    messagingSenderId: '694429991360',
    appId: '1:694429991360:web:7387a26bfaad1eb3dc0825',
    measurementId: 'G-TR9T4PC6RZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };
