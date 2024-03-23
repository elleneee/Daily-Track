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

  /**
   *  Table Items operations
   * */

  // Retrieve the items data from Firebase, not expired using >=, expired using <
  async function getItems(operator) {
    if (!db) {
      console.error("Database not initialized!");
      return [];
    }
    const itemsCollection = collection(db, "Items");
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
    console.log("Items,",items);
    return items;
  }

  // update expired items which period are not day
  async function updateItems() {
    if (!db) {
      console.error("Database not initialized!");
      return;
    }
    const items = await getItems("<");
    // Get a new write batch
    const batch = writeBatch(db);
    items.forEach((item) => {
      switch(item.period) {
        case "Week":
          item.expiration = moment(item.expiration).add(1, "weeks").format("YYYY-MM-DD");
          batch.set(doc(db, "Items", item.id), item);
          break;
        case "Month":
          item.expiration = moment(item.expiration).add(1, "months").format("YYYY-MM-DD");
          batch.set(doc(db, "Items", item.id), item);
          break;
        case "Year":
          item.expiration = moment(item.expiration).add(1, "years").format("YYYY-MM-DD");
          batch.set(doc(db, "Items", item.id), item);
          break;
        default: 
          break;
      }
    });
    await batch.commit();
  }

  // Add item into db
  async function addItem(item) {
    if (!db) {
      console.error("Database not initialized!");
      return;
    }
    const itemsCollection = collection(db, "Items");
    await addDoc(itemsCollection, item);
  }

  // Remove item from db by id
  async function removeItem(id) {
    if(!db) {
      console.error("Database not initialized!");
      return;
    }
    await deleteDoc(doc(db, "Items", id));
  }

  // Modify item from db by id
  async function modifyItem(item) {
    if(!db) {
      console.error("Database not initialized!");
      return;
    }
    await updateDoc(doc(db, "Items", item.id), item);
  }

  // Search items from db by name and tag
  // async function searchItems(name, tag, expiration, operator) {
  async function searchItems(name, tag, expiration) {
    if(!db) {
      console.error("Database not initialized!");
      return;
    }
    // Get collection Items
    const itemsCollection = collection(db, "Items");
    // Set query select items with name and tag order by expiration
    let q;
    // Search by tag and expiration, then filter data by name
    if(tag){
      q = query(itemsCollection, orderBy("expiration"), where("expiration", "<=", expiration ? expiration : moment().format("YYYY-MM-DD")), where("tags", "array-contains", tag));
    } else {
      q = query(itemsCollection, orderBy("expiration"), where("expiration", "<=", expiration ? expiration : moment().format("YYYY-MM-DD")));
    }
    // Retrieve items data from db
    const res = await getDocs(q);
    // push data to items
    let items = [];
    name = name.toLowerCase();
    // filter by name
    if(name){
      res.docs.forEach((doc) => {
        const item = doc.data();
        if(item.name.toLowerCase().includes(name)) {
          item.id = doc.id;
          items.push(item);
        }
      });
    } else {
      for (let doc of res.docs) {
        const item = doc.data();
        item.id = doc.id;
        items.push(item);
      }
    }
    return items;
  }

  /**
   * Table Tags operations
   */

  // Get all tags from db
  async function getTags() {
    if (!db) {
      console.error("Database not initialized!");
      return [];
    }
    const tagsCollection = collection(db, "Tags");
    return (await getDocs(tagsCollection)).docs.data();
  }

  async function addTag(name) {
    if (!db) {
      console.error("Database not initialized!");
      return [];
    }
    const tagsCollection = collection(db, "Tags");
    await addDoc(tagsCollection, name);
  }

  me.getItems = getItems;
  me.updateItems = updateItems;
  me.addItem = addItem;
  me.removeItem = removeItem;
  me.modifyItem = modifyItem;
  me.searchItems = searchItems;

  me.getTags = getTags;
  me.addTag = addTag;

  return me;
}

export const myFirebase = myFirebaseDB();