import './styles/ListItem.css'

function ListItem(props){
    return(
        <>
          <li>
          <input type="checkbox" id={`checkbox-${props.id}`}/>
          <textarea className='list-item' col='1'></textarea>
          <button 
              id={`delete-${props.id}`} 
              className='delete-button' 
              type="button" 
              onClick={()=>props.onRemove(props.id)}>R</button>
          </li>
        </>
    )
}

export default ListItem