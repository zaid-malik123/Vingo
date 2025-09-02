import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vingo-food-delivery-app.firebaseapp.com",
  projectId: "vingo-food-delivery-app",
  storageBucket: "vingo-food-delivery-app.firebasestorage.app",
  messagingSenderId: "748676882740",
  appId: "1:748676882740:web:e1f529a6b629c3fcb74561"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default {
  app,
  auth
}
