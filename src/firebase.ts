import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRGnnMMe2UyLVxWmmB9oa3SoThtQ3T5UA",
  authDomain: "undergrounds-review-center-app.firebaseapp.com",
  projectId: "undergrounds-review-center-app",
  storageBucket: "undergrounds-review-center-app.firebasestorage.app",
  messagingSenderId: "535962277932",
  appId: "1:535962277932:web:206ad111e7c38fdc2e5989",
  measurementId: "G-XELE87G7P4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
