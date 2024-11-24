import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vercel-project-294e7.firebaseapp.com",
  projectId: "vercel-project-294e7",
  storageBucket: "vercel-project-294e7.firebasestorage.app",
  messagingSenderId: "1042667126510",
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { auth }


// github auth token f5e2b36e7197acccc74d416f797554bb03d0cc24


