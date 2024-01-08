import React, { useState, useEffect } from 'react';
import Item from './Item';
import './styles/List.css';
import { BASE_URL, UPDATE_INTERVAL_MS } from './Constants';

function List({ selectedListId, createList }) {
  const [items, setItems] = useState([]);
  const [itemsToUpdateArray, setItemsToUpdateArray] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (itemsToUpdateArray.length > 0) {
        updateItems(itemsToUpdateArray);
        setItemsToUpdateArray([]);
      }
      if(selectedListId != null && selectedListId != ""){
        fetchItems(selectedListId); 
      }
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [selectedListId, itemsToUpdateArray]);

  const updateItems = async (itemsToUpdate) => {
    try {
      const promises = itemsToUpdate.map(updateItemInBackend);
      await Promise.all(promises);
    } catch (error) {
      console.error('Error updating items:', error);
    }
  };

  const addItemToUpdate = (item) => {
    if (item != null) {
      setItemsToUpdateArray((prev) => [...prev, item]);
    }
  };

  const fetchItems = async (listId) => {
    try {
      const response = await fetch(`${BASE_URL}/items?listaId=${listId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      mergeItems(data.payload.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const mergeItems = (backendItems) => {
    setItems((prevItems)=>{
      const updatedItems = [...prevItems];
      backendItems.forEach((backendItem)=>{
        const existingItemIndex = updatedItems.findIndex(
          (item) =>
            item.id === backendItem.id
        );
        if (existingItemIndex !== -1) {
          if (backendItem.timestamp > updatedItems[existingItemIndex].timestamp){
            updatedItems[existingItemIndex] = backendItem;
          }
        } else {
          updatedItems.push(backendItem);
        }
      });
      return updatedItems;
    });
  }

  const addItemToBackend = async () => {
    try {
      const newItem = { description: 'New Item', timestamp: Date.now() }; // Replace with actual new item data
      const response = await fetch(`${BASE_URL}/items`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lista: { id: selectedListId, items: [newItem] } }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data.payload.items]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItemFromBackend = async (itemId) => {
    try {
      const response = await fetch(`${BASE_URL}/items/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const updateItemInBackend = async (updatedItem) => {
    try {
      const response = await fetch(`${BASE_URL}/items`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lista: { id: selectedListId, items: [updatedItem] } }),
      });
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      const updatedItems = items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
      setItems(updatedItems);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Rest of the functions remain the same

  return (
    <div>
      <div className='button-container'>
        <button className='bouncy-button' onClick={() => fetchItems(selectedListId)}>Get List</button>
        <button className='bouncy-button' onClick={() => createList()}>Create List</button>
      </div>
      <div className="List">
        <h2>LISTA</h2>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemove={removeItemFromBackend}
            onUpdate={addItemToUpdate}
          />
        ))}
        <button className='add-button bouncy-button' onClick={addItemToBackend}>Add Item</button>
      </div>
    </div>
  );
}

export default List;
