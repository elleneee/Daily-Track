import moment from 'moment'
import React from 'react'
// import { Nav } from 'react-bootstrap';
import PropTypes from "prop-types";

export default function NewItem({ newItem }) {
  
  const tags = ["Food", "Medicine", "Drink", "Personal care"];
  const period = ["Day", "Week", "Month", "Year"];

  function onNew(event) {
    event.preventDefault();
    // get inputs from form
    const formData = new FormData(event.target);
    const item = {
      name: formData.get("name"),
      quantity: formData.get("quantity"),
      expiration: formData.get("expiration"),
      tags: formData.getAll("tags"),
      period: formData.get("period"),
    };
    // console.log("comfirm item", item);
    newItem(item);
    alert("Add sucessfully!");
    event.target.reset();
  }

  return (
    <div>
      <h3>New Item</h3>
      <form className='gap-2' onSubmit={onNew}>
        <label htmlFor="item-name" className="form-label">
          Name:
        </label>
        <input type="text" className="form-control" id="item-name" name="name" required/>
        <label htmlFor="item-qty" className="form-label">
          Quantity:
        </label>
        <input type="number" className="form-control" id="item-qty" name="quantity"/>
        <label htmlFor="item-exp" className="col-form-label">
          Expiration:
        </label>
        <input type="date" className="form-control" id="item-exp" name="expiration" 
          defaultValue={moment().format ("YYYY-MM-DD")} min={moment().format("YYYY-MM-DD")}/>
        <label htmlFor="item-tags" className="col-form-label">
          Tags:
        </label>
        <button className='btn btn-sm btn-outline-secondary ms-5'>Add Tag</button>
        {tags.map((tag) => (
          <div className="form-check" key={tag}>
            <input
              className="form-check-input"
              type="checkbox"
              id={tag}
              name="tags"
              value={tag}
              defaultChecked={tag==="All"}
            />
            <label className="form-check-label" htmlFor={tag}>
              {tag}
            </label>
          </div>
        ))}
        <label htmlFor="item-period" className="form-label me-2 mt-2 d-block">
          Reminder period:
        </label>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          {period.map((p) => (
            <div key={p}>
              <input
                type="radio"
                className="btn-check"
                name="period"
                id={p}
                value={p}
                autoComplete="off"
                defaultChecked={p==="Day"?"Checked":""} />
              <label className="btn btn-outline-primary" htmlFor={p}>
                {p}
              </label>
            </div>
          ))}
        </div>
        <div className='d-flex justify-content-end gap-2'>
          <button type="click" className="btn btn-primary d-block ">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary d-block ">
            Comfirm
          </button>

        </div>
      </form>
    </div>
  )
}
NewItem.propTypes = {
  newItem: PropTypes.func.isRequired,
  // onRemoveItem: PropTypes.func.isRequired,
  // onModifyItem: PropTypes.func,
  // isModify: PropTypes.bool,
};