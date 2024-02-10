// App.js

import React, { useState, useEffect } from 'react';
import List from './List';
import './App.css';
import { BASE_URL } from './Constants';
import OneSignal from 'react-onesignal';

function App() {
  const [selectedListId, setSelectedListId] = useState('');

  let lastUsedListId = localStorage.getItem("ListaId")

  const [initialized, setInitialized] = useState(false);
  
  // useEffect(() => {
  //   async function startOneSignal(){
  //     await OneSignal.init({ appId: 'da49eaab-8f0d-4479-b8ae-db7b75e0cafa', allowLocalhostAsSecureOrigin: true }).then(() => {
  //       setInitialized(true);
  //       OneSignal.Slidedown.promptPush();
  //     })
  //   };
  //   startOneSignal();
  // },[]);

  const createList = async (listItems) => {
    try {
      const newList = { lista:{items: listItems!=null?listItems:[], friendlyId: selectedListId!=null?selectedListId:'common'} }
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
      setSelectedListId(data.payload.friendlyId);
      lastUsedListId = data.payload.friendlyId;
    } catch (error) {
      console.error('Error creating a new Lista:', error);
    }
  };

  return (
    <div className="App">
      <input
      className='listId-input'
        type="text"
        placeholder="Enter List ID"
        value={lastUsedListId != null? lastUsedListId: selectedListId}
        onChange={(e) => {setSelectedListId(e.target.value);}
        }
      />
      <List selectedListId={lastUsedListId != null? lastUsedListId: selectedListId} createList={createList} />
    </div>
  );
}

export default App;
