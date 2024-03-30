/**
 * SearchBar class
 * This component is a search bar for user to select tag or input name to find items.
 */
import { React, useRef, useState } from "react";
import PropTypes from "prop-types";
import ItemGallery from "./ItemGallery";

export default function SearchTab( { searchItems, tags, modifyItem, deleteItem }) {

  // save search result
  const [items, setItems] = useState([]);

  const formRef = useRef();

  // search items
  async function onSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("searchName");
    let tag = formData.get("searchTag");
    const expiration = formData.get("searchExp");
    setItems(await searchItems(name, tag, expiration));
  }

  // clear the form
  function onClear() {
    formRef.current.reset();
  }
  
  return(
    <div className="m-3">
      <form className="d-flex flex-row gap-2"
        onSubmit={onSearch} ref={formRef}>
        <input type="text" className="form-control" name="searchName" id="searchName" placeholder="Name"/>
        <select name="searchTag" id="searchTag" className="form-select">
          <option value="">Tag</option>
          {tags.map((tag) => (
            <option key={tag.name} id={tag.name} value={tag.name}>{tag.name}</option>
          ))}
        </select>
        <input type="date" name="searchExp" id="searchExp" className="form-control"/>
        <button type="submit" id="search-btn" className="btn btn-outline-success">
          Search
        </button>
        <button type="click" id="search-btn" className="btn btn-outline-success" onClick={onClear}>
          Clear
        </button>
      </form>
      <ItemGallery items={items} tags={tags} modifyItem={modifyItem} deleteItem={deleteItem}/>
    </div>
  );
}

SearchTab.propTypes = {
  searchItems: PropTypes.func.isRequired,
  tags: PropTypes.array,
  modifyItem: PropTypes.func,
  expired: PropTypes.bool,
  deleteItem: PropTypes.func,
};