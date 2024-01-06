// App.js

import React, { useState } from 'react';
import List from './List';
import './App.css';
import { BASE_URL } from './Constants';

function App() {
  const [selectedListId, setSelectedListId] = useState('');

  const createList = async (listItems) => {
    try {
      const newList = { lista:{items: listItems!=null?listItems:[]} }
      const response = await fetch(`${BASE_URL}/items`, {
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
        onChange={(e) => {
          setSelectedListId(e.target.value);
          console.log(selectedListId);
        }
        }
      />
      <List selectedListId={selectedListId} createList={createList} />
    </div>
  );
}

export default App;
