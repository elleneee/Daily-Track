/**
 * TagManager class holds a list of tag
 */
// export default class TagManager {
//   tags = ["Food", "Medicine", "Drink", "Personal care"];
// }

import { myFirebase } from "./myFirebaseDB";

export default function TagManager() {
  const me = {};
  const myDB = myFirebase;

  async function getTags() {
    return myDB.getTags();
  }

  async function addTag(tag){
    await myDB.addTag(tag);
  }

  me.getTags = getTags;
  me.addTag = addTag;

  return me;
}