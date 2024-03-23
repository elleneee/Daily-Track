import moment from 'moment';
import React, { useEffect, useRef } from 'react';
// import { Nav } from 'react-bootstrap';
import PropTypes from "prop-types";
import NewTag from './NewTag';
import { utils } from '../models/Utils';

export default function NewItem({ tags, newItem, addTag }) {
  
  const period = utils.period;

  const formRef = useRef();

  function onNew(event) {
    event.preventDefault();
    // get inputs from form
    const formData = new FormData(event.target);
    const item = {
      name: formData.get("name"),
      quantity: +formData.get("quantity"),
      expiration: formData.get("expiration"),
      tags: formData.getAll("tags"),
      period: formData.get("period"),
    };
    // console.log("comfirm item", item);
    newItem(item);
    alert("Added sucessfully!");
    event.target.reset();
  }

  // reset the form
  function onCancel() {
    formRef.current.reset();
  }

  return (
    <div>
      <h3>New Item</h3>
      <form className='gap-2' onSubmit={onNew} ref={formRef}>
        <label htmlFor="item-name" className="form-label">
          Name:
        </label>
        <input type="text" className="form-control" id="item-name" name="name" required/>
        <label htmlFor="item-qty" className="form-label">
          Quantity:
        </label>
        <input type="number" className="form-control" id="item-qty" name="quantity" min={1} required/>
        <label htmlFor="item-exp" className="col-form-label">
          Expiration:
        </label>
        <input type="date" className="form-control" id="item-exp" name="expiration" 
          defaultValue={moment().format ("YYYY-MM-DD")} min={moment().format("YYYY-MM-DD")}/>
        <label htmlFor="item-tags" className="col-form-label">
          Tags:
        </label>
        {/* <button className='btn btn-sm btn-outline-secondary ms-5' onClick={onAddTag}>Add Tag</button> */}
        <NewTag addTag={addTag}/>
        <div className='d-flex flex-wrap'>
          {tags.map((tag) => (
          <div className="form-check me-2" key={tag.name}>
            <input
              className="form-check-input"
              type="checkbox"
              id={tag.name}
              name="tags"
              value={tag.name}
              defaultChecked={tag.name==="All"}
            />
            <label className="form-check-label" htmlFor={tag.name}>
              {tag.name}
            </label>
          </div>
        ))}
        </div>
        
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
              <label className="btn btn-outline-success" htmlFor={p}>
                {p}
              </label>
            </div>
          ))}
        </div>
        <div className='d-flex justify-content-end gap-2'>
          <button type="click" className="btn btn-success d-block" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success d-block">
            Comfirm
          </button>
        </div>
      </form>
    </div>
  )
}
NewItem.propTypes = {
  tags: PropTypes.array.isRequired,
  newItem: PropTypes.func.isRequired,
  addTag: PropTypes.func,
  // onRemoveItem: PropTypes.func.isRequired,
  // onModifyItem: PropTypes.func,
  // isModify: PropTypes.bool,
};