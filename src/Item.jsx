import React, { useState, useEffect } from 'react';

function Item({ item, onRemove, onUpdate }) {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState(item.description);

  useEffect(() => {
    setText(item.description);
  }, [item.description]);

  const handleCheckboxChange = () => {
    const updatedItem = { ...item, checked: !checked };
    setChecked(!checked);
    onUpdate(updatedItem);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    const updatedItem = { ...item, description: newText };
    onUpdate(updatedItem);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="Item">
      <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
      <textarea value={text} onChange={handleTextChange} />
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default Item;
