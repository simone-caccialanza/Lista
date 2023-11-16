// App.js

import React, { useState } from 'react';
import List1 from './List1';
import './App.css';

function App() {
  const [selectedListId, setSelectedListId] = useState('');

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter List ID"
        value={selectedListId}
        onChange={(e) => setSelectedListId(e.target.value)}
      />
      <List1 selectedListId={selectedListId} />
    </div>
  );
}

export default App;
