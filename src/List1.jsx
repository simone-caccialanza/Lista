// List.js

import React, { useState, useEffect } from 'react';
import Item from './Item';

function List1({ selectedListId, createList }) {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   if (selectedListId) {
  //     fetchItems(selectedListId);
  //   }
  // }, [selectedListId]);

  const fetchItems = async (listId) => {
    try {
      const response = await fetch(`http://localhost:8080/items?listaId=${listId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data.payload.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItemToBackend = async () => {
    try {
      const newItem = { description: 'New Item' }; // Replace with actual new item data
      const response = await fetch('http://localhost:8080/items', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lista:{id: selectedListId, items: [newItem]} }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
      const data = await response.json();
      setItems(prevItems => [...prevItems, ...data.payload.items]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItemFromBackend = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/items/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const updateItemInBackend = async (updatedItem) => {
    try {
      const response = await fetch(`http://localhost:8080/items`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lista:{id: selectedListId, items: [updatedItem]} }),
      });
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      const updatedItems = items.map(item => (item.id === updatedItem.id ? updatedItem : item));
      setItems(updatedItems);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Rest of the List component remains the same

  return (
    <>
    <button onClick={()=>fetchItems(selectedListId)}>Get List</button>
    <button onClick={()=>createList()}>Create List</button>
    <div className="List">
      <h2>List Items</h2>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onRemove={removeItemFromBackend}
          onUpdate={updateItemInBackend}
        />
      ))}
      <button onClick={addItemToBackend}>Add Item</button>
    </div>
    </>
    
  );
}

export default List1;
