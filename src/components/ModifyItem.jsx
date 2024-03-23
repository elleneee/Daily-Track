import React, { useRef, useState } from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'react-bootstrap';
import { utils } from '../models/Utils';
import moment from 'moment';

export default function ModifyItem({ item, tags, modifyItem }) {

  const period = utils.period;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onModify(event) {
    event.preventDefault();
    // get inputs from form
    const formData = new FormData(event.target);
    const Moditem = {
      id: item.id,
      name: formData.get("name"),
      quantity: +formData.get("quantity"),
      expiration: formData.get("expiration"),
      tags: formData.getAll("tags"),
      period: formData.get("period"),
    };
    // console.log("✏️Modify comfirm item", Moditem);
    modifyItem(Moditem);
    alert("Modified sucessfully!");
    handleClose();
    event.target.reset();
  }

  return (
    <>
      <button className='btn btn-sm btn-outline-success ms-5' onClick={handleShow}>Modify</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onModify}>
            <label htmlFor="item-name" className="form-label">
              Name:
            </label>
            <input type="text" className="form-control" id="item-name" name="name" defaultValue={item.name} required/>
            <label htmlFor="item-qty" className="form-label">
              Quantity:
            </label>
            <input type="number" className="form-control" id="item-qty" name="quantity" min={1} defaultValue={item.quantity} required/>
            <label htmlFor="item-exp" className="col-form-label">
              Expiration:
            </label>
            <input type="date" className="form-control" id="item-exp" name="expiration" 
              defaultValue={item.expiration}/>
            <label htmlFor="item-tags" className="col-form-label">
              Tags:
            </label>
            <div className='d-flex flex-wrap'>
              {tags?.map((tag) => (
              <div className="form-check me-2" key={tag.name}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={tag.name}
                  name="tags"
                  value={tag.name}
                  defaultChecked={item.tags.includes(tag.name)}
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
                    id={item.id+p}
                    value={p}
                    autoComplete="off"
                    defaultChecked={p===item.period} />
                  <label className="btn btn-outline-success" htmlFor={item.id+p}>
                    {p}
                  </label>
                </div>
              ))}
            </div>
            <div className='mt-4 border-top pt-2 d-flex justify-content-end gap-2'>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" type='submit'>
                Comfirm
              </Button>

            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Comfirm
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

ModifyItem.propTypes = {
  item: PropTypes.object.isRequired,
  tags: PropTypes.array,
  modifyItem: PropTypes.func,
};