import { initializeApp } from "firebase/app";


const firebaseConfig = {
     apiKey: "AIzaSyBkeckeO_nwKa6K5xR-AyWfHdE6-pdNNNU",
    authDomain: "business-services-b4f01.firebaseapp.com",
    projectId: "business-services-b4f01",
    storageBucket: "business-services-b4f01.appspot.com",
    messagingSenderId: "230033718426",
    appId: "1:230033718426:web:bcb05eec857fcad2df7323",
    measurementId: "G-0NKMJ67QCZ"
  };
  
  const app = initializeApp(firebaseConfig);

export default app