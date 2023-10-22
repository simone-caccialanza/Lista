import React, { useState, useEffect } from 'react';
import './styles/ListContainer.css';
import List from './List';

function ListContainer() {
  const [items, setItems] = useState([]);

  const getRemoteList = () => fetch('http://localhost:8080/items')
      .then(response => response.json())
      .then(data => {
        console.log(data.items)
        setItems(mergeLists(items, data.items))
      });

  const getCurrentTimeAsInteger = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeAsInteger = hours * 3600 + minutes * 60 + seconds;
    return timeAsInteger;
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addItem = () => {
    const newItem = {
      id: getCurrentTimeAsInteger() + Math.random(),
      description: ""
    };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const mergeLists = (list1, list2) => {
    const mergedSet = new Set([...list1, ...list2].map(item => item.id));
    const mergedArray = Array.from(mergedSet).map(id => {
      return [...list1, ...list2].find(item => item.id === id);
    });
    return mergedArray;
  }

  const updateList = () => {
    const url = 'http://localhost:8080/updateList';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    };
    fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('List updated successfully:', data);
    })
    .catch(error => {
      console.error('Error updating list:', error);
    });
  }
  

  return (
    <>
    <List items={items} onRemove={removeItem}/>

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
