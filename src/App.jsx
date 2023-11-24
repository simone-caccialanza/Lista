// App.js

import React, { useState } from 'react';
import List1 from './List1';
import './App.css';

function App() {
  const [selectedListId, setSelectedListId] = useState('');

  const createList = async (listItems) => {
    try {
      const newList = { lista:{items: listItems!=null?listItems:[]} }
      const response = await fetch('http://localhost:8081/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newList),
      });
      if (!response.ok) {
        throw new Error('Failed create a new Lista');
      }
      const data = await response.json();
      setSelectedListId(data.payload.id);
    } catch (error) {
      console.error('Error creating a new Lista:', error);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter List ID"
        value={selectedListId}
        onChange={(e) => setSelectedListId(e.target.value)}
      />
      <List1 selectedListId={selectedListId} createList={createList} />
    </div>
  );
}

export default App;
