// import React from 'react'
import ItemView from './ItemView'
import PropTypes from "prop-types";

export default function ItemGallery({ items, tags, modifyItem, expired = false, deleteItem } = {}) {
  return (
    <div className='m-3 me-0 overflow-y-auto pe-3' style={{height:470}}>
      { items && 
          items.map((item) => (
          <ItemView 
            key={item.id} 
            item={item} 
            tags={tags}
            modifyItem={modifyItem}
            expired={expired}
            deleteItem={deleteItem}
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
};