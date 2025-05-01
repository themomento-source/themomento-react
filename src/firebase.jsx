import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Initialize Firebase first
export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_APP_API_KEY,
  authDomain: "themomento.firebaseapp.com", 
  projectId: import.meta.env.VITE_FIREBASE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_APP_ID
});

// Initialize App Check
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6Lf1YCorAAAAACZmW19_EwErCrQ2xIx9hwpfdGyR'),
  isTokenAutoRefreshEnabled: true
});