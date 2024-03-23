/**
 * SearchBar class
 * This component is a search bar for user to select tag or input name to find items.
 */
import { React, useState } from "react";
import PropTypes from "prop-types";
import ItemView from "./ItemView";
import ItemGallery from "./ItemGallery";

export default function SearchTab( { searchItems, tags, modifyItem, deleteItem }) {

  const [items, setItems] = useState([]);

  async function onSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("searchName");
    let tag = formData.get("searchTag");
    // if(tag === "")
    const expiration = formData.get("searchExp");
    console.log(name, tag, expiration);
    setItems(await searchItems(name, tag, expiration));
    console.log("🪞Search items,", items);
    // event.target.reset();
  }
  
  return(
    <div className="m-3">
      <form className="d-flex flex-row gap-2"
        onSubmit={onSearch}>
        {/* <label htmlFor="seachName" className="form-label">
          Name
        </label> */}
        <input type="text" className="form-control" name="searchName" id="searchName" placeholder="Name"/>
        {/* <label htmlFor="SeachTag" className="form-label">
          Tag
        </label> */}
        <select name="searchTag" id="searchTag" className="form-select">
          <option value="">Tag</option>
          {tags.map((tag) => (
            <option key={tag.name} value={tag.name}>{tag.name}</option>
          ))}
        </select>
        <input type="date" name="searchExp" id="searchExp" className="form-control"/>
        <button type="submit" id="search-btn" className="btn btn-outline-success">
          Search
        </button>
        <button type="click" id="search-btn" className="btn btn-outline-success">
          Clear
        </button>
      </form>
      <ItemGallery items={items} tags={tags} modifyItem={modifyItem} deleteItem={deleteItem}/>
      {/* <div className="mt-4 border-top pt-2">
        { items && 
            items.map((item) => (
            <ItemView 
              key={item.id} 
              item={item} 
              tags={tags}
              modifyItem={modifyItem}
              deleteItem={deleteItem}
              // isModify={isModify} 
              // onRemoveItem={onRemoveItem} 
              // onModifyItem={onModifyItem}
            />
          )) }
      </div> */}
    </div>
  )
}

SearchTab.propTypes = {
  searchItems: PropTypes.func.isRequired,
  tags: PropTypes.array,
  modifyItem: PropTypes.func,
  expired: PropTypes.bool,
  deleteItem: PropTypes.func,
};