import React from 'react'
import ItemView from './ItemView'
import PropTypes from "prop-types";

export default function ItemGallery({ items, tags, modifyItem, expired = false, deleteItem } = {}) {
  return (
    <div className='m-3 me-0 overflow-y-auto pe-3' style={{height:470}}>
      {/* <div className='d-flex flex-row justify-content-between align-items-center pb-2 pt-2 border-bottom'>
        <span>Name</span>
        <span>Quantity</span>
        <span>Expiration</span>
        <span>Operation</span>
      </div> */}
      { items && 
          items.map((item) => (
          <ItemView 
            key={item.id} 
            item={item} 
            tags={tags}
            modifyItem={modifyItem}
            expired={expired}
            deleteItem={deleteItem}
            // isModify={isModify} 
            // onRemoveItem={onRemoveItem} 
            // onModifyItem={onModifyItem}
          />
        )) }
    </div>
  )
}
ItemGallery.propTypes = {
  items: PropTypes.array,
  tags: PropTypes.array,
  modifyItem: PropTypes.func,
  expired: PropTypes.bool,
  deleteItem: PropTypes.func,
  // onRemoveItem: PropTypes.func.isRequired,
  // onModifyItem: PropTypes.func,
  // isModify: PropTypes.bool,
};