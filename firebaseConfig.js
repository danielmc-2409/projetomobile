import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBHXl_F31xi05Pwc_AKwEsQhPKZmoHDxVo",
  authDomain: "ortos-6f205.firebaseapp.com",
  projectId: "ortos-6f205",
  storageBucket: "ortos-6f205.firebasestorage.app",
  messagingSenderId: "1080894369864",
  appId: "1:1080894369864:web:2fbe41f3489c6767c8687d",
  measurementId: "G-M2R56GFEZ7"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
