/**
 * TagManager class holds a list of tag
 */
import { myFirebase } from "./myFirebaseDB";

export default function TagManager() {
  const me = {};
  const myDB = myFirebase;

  async function getTags() {
    return await myDB.getTags();
  }

  async function addTag(tag){
    await await myDB.addTag(tag);
  }

  me.getTags = getTags;
  me.addTag = addTag;

  return me;
}