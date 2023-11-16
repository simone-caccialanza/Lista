import {useState} from 'react'
import './styles/ListItem.css'

function ListItem(props){
    const [isChecked, setIsChecked] = useState(false);
    const [text, setText] = useState(props.description);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleTextareaChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        props.updateText(props.description, newText);
      };
    return(
    <>
        <li>
            <input 
                type="checkbox"
                id={`checkbox-${props.description}`}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <textarea 
                className='list-item' 
                col='1' 
                style={{ textDecoration: isChecked ? 'line-through' : 'none' }}
                value={text}
                onChange={handleTextareaChange}/>
            <button 
                id={`delete-${props.description}`} 
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