import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: `${import.meta.env.VITE_FIREBASE_KEY}`,
//   authDomain: "meatup-28a8e.firebaseapp.com",
//   projectId: "meatup-28a8e",
//   storageBucket: "meatup-28a8e.appspot.com",
//   messagingSenderId: "848230416037",
//   appId: "1:848230416037:web:cf5661f0386f08e4cfd74c"
// };

// const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
