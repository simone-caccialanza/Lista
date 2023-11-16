// Item.js

import React, { useState } from 'react';

function Item({ item, onRemove, onUpdate }) {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState(item.description);

  const handleCheckboxChange = async () => {
    setChecked(!checked);
    const updatedItem = { ...item, checked: !checked }; // Update the checked status locally
    await onUpdate(updatedItem); // Update checked status in the backend
  };

  const handleTextChange = async (e) => {
    setText(e.target.value);
    const updatedItem = { ...item, description: e.target.value }; // Update the text locally
    await onUpdate(updatedItem); // Update text in the backend
  };

  const handleRemove = () => {
    onRemove(item.id); // Remove item from the backend
  };

  return (
    <div className="Item">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <textarea value={text} onChange={handleTextChange} />
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default Item;
