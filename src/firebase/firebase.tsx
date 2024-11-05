import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCt9A-hh9g9nM8OdeUrQCap3SdYXvCQi7U",

  authDomain: "queridometro-9f708.firebaseapp.com",

  projectId: "queridometro-9f708",

  storageBucket: "queridometro-9f708.appspot.com",

  messagingSenderId: "62545340928",

  appId: "1:62545340928:web:5599b05636d7f3f457c6e5",

  measurementId: "G-GYY70LRRCZ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
