import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGMNKKkYHH4j3-Rtt28gSiDpIIB5ezKx0",
    authDomain: "engg-analysis.firebaseapp.com",
    projectId: "engg-analysis",
    storageBucket: "engg-analysis.firebasestorage.app",
    messagingSenderId: "573640276931",
    appId: "1:573640276931:web:556a4e2f5702ae8e531b76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
