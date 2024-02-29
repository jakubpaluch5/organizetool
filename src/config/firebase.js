import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8kGnhutAxOq-UNREeT7L983HwVeLdNgU",
  authDomain: "organizetool.firebaseapp.com",
  databaseURL: "https://organizetool-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "organizetool",
  storageBucket: "organizetool.appspot.com",
  messagingSenderId: "350472743542",
  appId: "1:350472743542:web:72425d27d27c25f66f4d57"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);