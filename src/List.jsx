import ListItem from './ListItem'
import './styles/List.css'

function List(props){
    return(
        <>
          <ul className='list-container'>
            {props.items && props.items.length > 0 ? (
                props.items.map(item => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        description={item.description}
                        onRemove={props.onRemove}
                        updateText={props.updateText}
                    />
                ))
            ) : (
                <li>No items available {props.items==undefined?"Null":":)"}</li>
            )}
        </ul>
        </>
    )
}

export default List;