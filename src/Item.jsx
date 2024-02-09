import React, { useState, useEffect } from 'react';
import './styles/Item.css'

function Item({ item, onRemove, onUpdate, onKeyPressedEnter, inputRef }) {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState(item.description);

  useEffect(() => {
    setChecked(item.checked);
    setText(item.description);
  }, [item]);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    const updatedItem = { ...item, checked: newChecked, timestamp: Date.now() };
    onUpdate(updatedItem);
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      onKeyPressedEnter();
    }
  }

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    const updatedItem = { ...item, description: newText, timestamp: Date.now() };
    onUpdate(updatedItem);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="Item slide-in-from-top handle-z-index">
      <input className='custom-checkbox' type="checkbox" checked={checked} onChange={handleCheckboxChange} />
      <input
        ref={inputRef} 
        className='item-text' 
        type='text' 
        placeholder="New Item" 
        value={text} 
        maxLength="15" 
        onChange={handleTextChange}
        onKeyDown={handleKeyPress}
         />
      <button className='remove-button' onClick={handleRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#ffffff"
        >
          <path
            fill="none"
            d="M0 0h24v24H0V0z"
          />
          <path
            fill="#ffffff"
            d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 0 1 1 1v2h-2v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8H4V6a1 1 0 0 1 1-1h4V4a1 1 0 0 1 1-1zm5 3H10V4h4v2zm-1 14V8h2v12h-2z"
    />
        </svg>
      </button>
    </div>
  );
}

export default Item;
