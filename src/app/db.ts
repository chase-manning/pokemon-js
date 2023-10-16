import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsS3qmLF4mHn8irsGzqUCYh9Pm872RGUE",
  authDomain: "lien-pokemon.firebaseapp.com",
  projectId: "lien-pokemon",
  storageBucket: "lien-pokemon.appspot.com",
  messagingSenderId: "2050363386",
  appId: "1:2050363386:web:c1d4cf61c9e657bb9b1e43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
