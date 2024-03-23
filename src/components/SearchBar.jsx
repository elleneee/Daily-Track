/**
 * SearchBar class
 * This component is a search bar for user to select tag or input name to find items.
 */
import { React } from "react";
import PropTypes from "prop-types";

export default function SearchBar( { onSearchItem }) {

  function onSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("seachName");
    let tag = formData.get("searchTag");
    const expiration = formData.get("searchExp");
    onSearchItem(name, tag, expiration);
    // event.target.reset();
  }
  
  return(
    <div className="mt-3">
        <form className="d-flex flex-row gap-2"
          onSubmit={onSearch}>
          {/* <label htmlFor="seachName" className="form-label">
            Name
          </label> */}
          <input type="text" className="form-control" name="seachName" id="seachName" placeholder="Name"/>
          {/* <label htmlFor="SeachTag" className="form-label">
            Tag
          </label> */}
          <select name="searchTag" id="SeachTag" className="form-select">
            <option value="">Tag</option>
            {/* {this.tags.tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))} */}
          </select>
          <input type="date" name="searchExp" id="searchExp" className="form-control"/>
          <button type="submit" id="search-btn" className="btn btn-outline-success">
            Search
          </button>
          <button type="click" id="search-btn" className="btn btn-outline-success">
            Clear
          </button>
        </form>
      </div>
  )
}

SearchBar.propTypes = {
  onSearchItem: PropTypes.func.isRequired,
  // onRemoveItem: PropTypes.func.isRequired,
  // onModifyItem: PropTypes.func,
  // isModify: PropTypes.bool,
};