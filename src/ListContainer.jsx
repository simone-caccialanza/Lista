import { useState } from 'react'
import './styles/ListContainer.css'
import List from './List'



function ListContainer() {
    const [items, setItems] = useState([]);
    const removeItem = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
      };
    const addItem = () =>{
        const newItem = {
            id: getCurrentTimeAsInteger()+Math.random()
        };
        setItems(prevItems => [...prevItems, newItem]);
    }
    
    return (
        <>
            <button className='add-button' type="button" 
                onClick={addItem}
                onKeyUp={()=>console.log(items)}
                    >ADD</button>
            <List items={items} onRemove={removeItem}/>
        </>
    )
}

export default ListContainer

function getCurrentTimeAsInteger() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeAsInteger = hours * 3600 + minutes * 60 + seconds;
    return timeAsInteger;
  }

