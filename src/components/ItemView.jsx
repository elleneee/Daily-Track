import React from 'react';
import PropTypes from "prop-types";

export default function ItemView({ item }) {


  return (
    <div className='d-flex flex-row justify-content-between align-items-center pb-2 pt-2 border-bottom'>
      <span>{item.name}</span>
      <span>Quantity: {item.quantity}</span>
      <span>{item.expiration}</span>
      <button className='btn btn-sm btn-outline-success'>Delete</button>
    </div>
  );
}

ItemView.propTypes = {
  item: PropTypes.object.isRequired,
  // onRemoveItem: PropTypes.func.isRequired,
  // onModifyItem: PropTypes.func,
  // isModify: PropTypes.bool,
};
