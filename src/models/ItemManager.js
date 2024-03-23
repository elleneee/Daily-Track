/**
 * ItemManager class, manage the item list by calling DB functions, have search, add, remove, modify, update functions
 */
import { myFirebase } from "./myFirebaseDB";

export default function ItemManager() {
  const me = {};
  const myDB = myFirebase;

  // Get items (not expired)
  async function getItems() {
    return await myDB.getItems(">=");
  }

  // Update all items, check if their expiration need to update based on period 
  async function updateItems() {
    await myDB.updateItems();
  }
  
  // Get items (not expired)
  async function getExpiredItems() {
    return await myDB.getItems("<");
  }

  // Add item
  async function addItem(item) {
    await myDB.addItem(item);
  }

  // Remove item by id
  async function removeItem(id){
    await myDB.removeItem(id);
  }

  // Modify item
  async function modifyItem(item) {
    await myDB.modifyItem(item);
  }

  // Search items (not expired) by name and tag
  async function searchItems(name, tag) {
    return await myDB.searchItems(name, tag, ">=");
  }

  // Search items (expired) by name and tag
  async function searchExpiredItems(name, tag) {
    return await myDB.searchItems(name, tag, "<");
  }

  me.getItems = getItems;
  me.updateItems = updateItems;
  me.getExpiredItems = getExpiredItems;
  me.addItem = addItem;
  me.removeItem = removeItem;
  me.modifyItem = modifyItem;
  me.searchItems = searchItems;
  me.searchExpiredItems = searchExpiredItems;

  return me;
}