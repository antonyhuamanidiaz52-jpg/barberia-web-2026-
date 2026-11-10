
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrSpqzCSN8onivZ2zTm-tWhOggG5hKqSY",
    authDomain: "los-tilines-luxury.firebaseapp.com",
    projectId: "los-tilines-luxury",
    storageBucket: "los-tilines-luxury.firebasestorage.app",
    messagingSenderId: "598091696216",
    appId: "1:598091696216:web:f01c3e1406ebfde0dea22d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

console.log("Firebase conectado correctamente.");
