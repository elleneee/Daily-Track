/**
 * Item that holds all info of redcored item, including name, quantity, expiration, tags and reminder period
 */

export function Item({_id, _name, _quantity = 1, _expiration, _tags, _period = "Day"} = {}) {
  const me = {
    id: _id,
    name: _name,
    quantity: _quantity,
    expiration: _expiration,
    tags: _tags,
    period: _period,
  };
  
  function show() {
    console.log(`Item id:${this.id} name:${this.name} qty:${this.quantity} exp:${this.expiration} tags:${this.tags} period:${this.period}`);
  }

  me.show = show;
  return me;
}