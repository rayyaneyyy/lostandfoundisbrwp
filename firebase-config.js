import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAFRbU_MCU2bF_TuK2hlEmxC38X07Yhr8g",
  authDomain: "lostandfound-isbrwp.firebaseapp.com",
  projectId: "lostandfound-isbrwp",
  storageBucket: "lostandfound-isbrwp.appspot.com",
  messagingSenderId: "728695681280",
  appId: "1:728695681280:web:a58e8898fc36a4f21403e5",

  // ✅ Use this region-specific URL:
  databaseURL: "https://lostandfound-isbrwp-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

