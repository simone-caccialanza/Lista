import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './styles/ListContainer.css';

import List from './List';

function ListContainer() {
  const [items, setItems] = useState([]);
  const [listId,setListId] = useState(null);
  const [textValue, setTextValue] = useState('');

  const getRemoteList = () => fetch('http://localhost:8080/items?listaId='+listId)
      .then(response => response.json())
      .then(data => {
        console.log(data.payload.items)
        setItems(mergeLists(items, data.payload.items))
      });


  const handleTextAreaChange = (event) => {
      setTextValue(event.target.value);
  };

  const removeItem = (id) => {
    console.log("request to delete " + id)
    console.log("Items was:")
    items.forEach(item=>console.log(item.description+" "+id))
    setItems(prevItems => {
      prevItems.filter(item => item.id !== id)
    });
    console.log("Items is:")
    items.forEach(item=>console.log(item.description))
  };

  const addItem = () => {
    const newItem = {
      description: ""
    };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const mergeLists = (list1, list2) => {
    if (list1 == null && list2 == null) return [];
    if (list1 == null) return mergeLists(list2,list2);
    if (list2 == null) return mergeLists(list1,list1);
    const mergedSet = new Set([...list1, ...list2].map(item => item.description));
    const mergedArray = Array.from(mergedSet).map(description => {
      return [...list1, ...list2].find(item => item.description === description);
    });
    return mergedArray;
  };

  const updateList = () => {
    if(listId==null){
      var requestMethod = 'POST'
    }else{var requestMethod = 'PATCH'}
    const url = 'http://localhost:8080/items';
    const requestOptions = {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "lista":{"id":listId,"items":items} }),
    };
    console.log("Sending to "+url+"\n"+requestOptions.body)
    fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setListId(data.payload.id)
      console.log('List updated successfully, received: ', data);
      setItems(data.payload.items)
      console.log('Now Items contains: ', data);
    })
    .catch(error => {
      console.error('Error updating list:', error);
    });
  };

  const updateText = (id, newText) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, description: newText } : item
      )
    );
  };


  return (
    <>
    <div style={{display: 'flex'}}>
    <textarea name="idReference" id="idReferenceTextarea" cols="30" rows="1" onChange={handleTextAreaChange}></textarea>
    <button onClick={() => setListId(textValue)}>SET ID</button>
    </div>
    
    <List items={items} onRemove={removeItem} updateText={updateText}/>

    <div className='button-container'>
    <button className='add-button' type="button" onClick={addItem}>
        ADD
      </button>
      <button className='get-button' type="button" onClick={getRemoteList}>
        GET
      </button>
      <button className='update-button' type="button" onClick={updateList}>
        UPDATE
      </button>
    </div>
    </>
  );
}

export default ListContainer;
