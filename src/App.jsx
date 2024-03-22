// import { useState } from 'react'
import { useEffect, useState } from 'react';
import './App.css'
import ItemView from './components/ItemView'
import { myFirebase } from './models/myFirebaseDB';

function App() {

  const [items, setItems] = useState([]);
  
  const myDB = myFirebase;
  // Retreive data from db
  async function refreshitems() {
    setItems(await myDB.getItems(">="));
  }

  useEffect(() => {
    refreshitems();
  }, [])

  return (
    <>
      <p>hello!</p>
      {/* { items?.map((i) => <ItemView key={i.id} item={i}/>)} */}
      {items[0]?.name}
    </>
  )
}

export default App
