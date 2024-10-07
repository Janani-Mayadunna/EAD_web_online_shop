import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Uncomment the line below only if you plan to use Analytics
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRSVlyj67nIOSc4oKv6iYRuIsz_JCQ110",
  authDomain: "ractapp-3412c.firebaseapp.com",
  projectId: "ractapp-3412c",
  storageBucket: "ractapp-3412c.appspot.com",
  messagingSenderId: "171096033565",
  appId: "1:171096033565:web:91b38cf197dd8932f2f9f4",
  measurementId: "G-4PLWD7Q9HN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage
const storage = getStorage(app);

// If you need analytics and it's a browser environment, initialize Analytics
// if (typeof window !== "undefined") {
//   const analytics = getAnalytics(app);
// }

export { app, storage };
