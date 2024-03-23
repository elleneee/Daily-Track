// import { useState } from 'react'
import { useEffect, useState } from 'react';
import './App.css';
import { myFirebase } from './models/myFirebaseDB';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import NewItem from './components/NewItem';
import ItemGallery from './components/ItemGallery';
import ItemManager from './models/ItemManager';

function App() {

  // items that are not expired
  const [items, setItems] = useState([]);

  // expired items
  const [expiredItems, setExpItems] = useState([])

  // tags
  const [tags, setTags] = useState([]);
  
  const itemManager = ItemManager();

  useEffect(() => {
    refreshItems();
    refreshExpItems();
  }, [])
  
  // Retreive items from db
  async function refreshItems() {
    setItems(await itemManager.getItems());
  }

  // Retreive expired items from db
  async function refreshExpItems() {
    setExpItems(await itemManager.getExpiredItems());
  }

  // New item
  async function newItem(item) {
    await itemManager.addItem(item);
    await refreshItems();
  }

  async function searchItems(name, tag, expiration){
    // setItems(await itemManager.searchItems())
  }
  async function searchExpItems(name, tag, expiration){
    
  }

  return (
    <>
      <div className="container">
        {/* <BrowserRouter>
          <Routes>
            <Route path="/" exact Component={}/>
            <Route path="/expired" Component={}/>
          </Routes>
        </BrowserRouter> */}
        <Tab.Container className="center" defaultActiveKey={"home"}>
          <Row className='gap-2'>
            <Col sm={2} className='border-end border-success-subtle'>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="new">New</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="expired">Expired</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="search">Search</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="analytics">Analytics</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              {/* <div>
                <SearchBar/>
              </div> */}
              <Tab.Content>
                <Tab.Pane eventKey="new">
                  <NewItem newItem={newItem}/>
                </Tab.Pane>
                <Tab.Pane eventKey="home">
                  {/* <SearchBar onSearchItem={searchItems}/> */}
                  <ItemGallery items={items}/>
                </Tab.Pane>
                <Tab.Pane eventKey="expired">
                  {/* <SearchBar onSearchItem={searchItems}/> */}
                  <ItemGallery items={expiredItems}/>
                </Tab.Pane>
                <Tab.Pane eventKey="search">
                  
                </Tab.Pane>
                <Tab.Pane eventKey="analytics">
                  I guess this is for the third nav tab
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  )
}

export default App
