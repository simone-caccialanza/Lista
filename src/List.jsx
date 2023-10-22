import ListItem from './ListItem'
import './styles/List.css'

function List(props){
    return(
        <>
          <ul className='list-container'>
            {props.items.map(item => (
                  <ListItem 
                      key={item.id}
                      id={item.id}
                      description={item.description}
                      onRemove={props.onRemove}
                  />
              ))}
            </ul>
        </>
    )
}

export default List;