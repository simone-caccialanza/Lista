import {useState} from 'react'
import './styles/ListItem.css'

function ListItem(props){
    const [isChecked, setIsChecked] = useState(false);
    const [text, setText] = useState(props.description);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return(
    <>
        <li>
            <input 
                type="checkbox"
                id={`checkbox-${props.id}`}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <textarea 
                className='list-item' 
                col='1' 
                style={{ textDecoration: isChecked ? 'line-through' : 'none' }}
                defaultValue={text}>
            </textarea>
            <button 
                id={`delete-${props.id}`} 
                className='delete-button' 
                type="button" 
                onClick={()=>props.onRemove(props.id)}>
                R
            </button>
        </li>
    </>
    )
}

export default ListItem