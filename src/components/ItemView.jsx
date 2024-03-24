// import React from 'react';
import PropTypes from "prop-types";
import ModifyItem from './ModifyItem';

export default function ItemView({ item, tags, modifyItem, expired = false, deleteItem } = {}) {

  function onDelete(event) {
    const id = event.target.id;
    console.log("Delete id:", id);
    deleteItem(id, expired);
  }

  return (
    <div className='d-flex flex-row justify-content-between align-items-center pb-2 pt-2 border-bottom'>
      <span className='col'>{item.name}</span>
      <span className='col'>Quantity: {item.quantity}</span>
      <span className='col'>{item.expiration}</span>
      {!expired && <ModifyItem item={item} tags={tags} modifyItem={modifyItem}/>}
      <button className='btn btn-sm btn-outline-success ms-2' type='click' id={item.id} onClick={onDelete}>Delete</button>
    </div>
  );
}

ItemView.propTypes = {
  item: PropTypes.object.isRequired,
  tags: PropTypes.array,
  modifyItem: PropTypes.func,
  expired: PropTypes.bool,
  deleteItem: PropTypes.func,
};
