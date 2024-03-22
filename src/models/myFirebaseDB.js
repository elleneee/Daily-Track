// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  writeBatch,
} from "firebase/firestore/lite";
import moment from "moment/moment";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function myFirebaseDB() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCEzDKK4Ou5Fm17r3AAjpyTtaka3LeIORQ",
    authDomain: "dailytrack-functional.firebaseapp.com",
    projectId: "dailytrack-functional",
    storageBucket: "dailytrack-functional.appspot.com",
    messagingSenderId: "1094234895674",
    appId: "1:1094234895674:web:ddcf6a22c5c74306f98c03"
  };

  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);

  // Me object containing the public methods and properties
  const me = {};

  function initializeFirebase() {
    let db;
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    console.log("Firebase initialized!", app, analytics);

    db = getFirestore(app);

    return db;
  }
  // Firebase database
  let db = initializeFirebase();

  // Retrieve the items data from Firebase, not expired using >=, expired using <
  async function getItems(operator) {
    if (!db) {
      console.error("Database not initialized!");
      return [];
    }
    const itemsCollection = collection(db, "items");
    // Set query select items order by expiration
    const q = query(itemsCollection, orderBy("expiration"), where("expiration", operator, moment().format("YYYY-MM-DD")));
    // Retrieve items data from db
    const res = await getDocs(q);
    // const res = await getDocs(itemsCollection);
    const items = [];
    // push data to items
    for (let doc of res.docs) {
      const item = doc.data();
      item.id = doc.id;
      items.push(item);
    }
    console.log("items,",items);
    return items;

  }

  me.getItems = getItems;

  return me;
}

export const myFirebase = myFirebaseDB();