// import { useState } from 'react'
import { useEffect, useRef, useState } from 'react';
import './App.css';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import SearchTab from './components/SearchTab';
import NewItem from './components/NewItem';
import ItemGallery from './components/ItemGallery';
import ItemManager from './models/ItemManager';
import TagManager from './models/TagManager';

function App() {

  // items that are not expired
  const [items, setItems] = useState([]);

  // expired items
  const [expiredItems, setExpItems] = useState([])

  // tags
  const [tags, setTags] = useState([]);
  
  const itemManager = ItemManager();

  const tagManager = TagManager();

  useEffect(() => {
    refreshItems();
    refreshExpItems();
    refreshTags();
  }, [])
  
  // Retreive items from db
  async function refreshItems() {
    setItems(await itemManager.getItems());
  }

  // Retreive expired items from db
  async function refreshExpItems() {
    setExpItems(await itemManager.getExpiredItems());
  }

  // get tags from db
  async function refreshTags() {
    setTags(await tagManager.getTags());
  }

  // New item
  async function newItem(item) {
    await itemManager.addItem(item);
    await refreshItems();
  }

  // add new tag
  async function addTag(tag) {
    await tagManager.addTag(tag);
    setTags(await tagManager.getTags());
  }

  // Modify item
  async function modifyItem(item) {
    await itemManager.modifyItem(item);
    await refreshItems();
  }

  // Delete item
  async function deleteItem(id, expired) {
    await itemManager.removeItem(id);
    if(expired){
      await refreshExpItems();
    } else {
      await refreshItems();
    }
  }

  // search items by name, tag, expiration
  async function searchItems(name, tag, expiration){
    return await itemManager.searchItems(name, tag, expiration);
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
                  <NewItem tags={tags} newItem={newItem} addTag={addTag}/>
                </Tab.Pane>
                <Tab.Pane eventKey="home">
                  <ItemGallery items={items} tags={tags} modifyItem={modifyItem} deleteItem={deleteItem}/>
                </Tab.Pane>
                <Tab.Pane eventKey="expired">
                  <ItemGallery items={expiredItems} modifyItem={modifyItem} deleteItem={deleteItem}/>
                </Tab.Pane>
                <Tab.Pane eventKey="search">
                  <SearchTab searchItems={searchItems} tags={tags} modifyItem={modifyItem} deleteItem={deleteItem}/>
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
