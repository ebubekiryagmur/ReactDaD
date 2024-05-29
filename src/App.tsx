import { useState } from 'react'
import styled from 'styled-components'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import { nanoid } from 'nanoid';
import { FaTrash } from 'react-icons/fa';


const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-item: center;
 margin-top: 50px;

`;
const InputContainer = styled.div`
 display: flex;
 justify-content: center;
 margin-bottom: 20px;
 gap: 1rem;

`;

const Input  = styled.input`
 padding: 8px;
 font-size: 16px;

`;
const Button = styled.div`
display: inline-block;
padding: 15px 25px;
font-size: 16px;
cursor: pointer;
text-align: center;
text-decoration: none;
outline: none;
color: #fff;
background-color: black;
border: none;
border-radius: 15px;
box-shadow: 0 9px #999;

&:hover {
  background-color: grey;
}
 
`;



const ListContainer = styled.div`
display: flex;
justify-content: center;
margin: 50px;
gap: 1 rem;


`;

const List = styled.div`
 display: flex;
 flex-direction: column;
 text-align: center;
 width: 300px;
 
 
`;

const Listbox = styled.div`
 display: flex;
 justify-content: space-between;
 align-item: center;
 padding: 16px;
 margin-bottom: 8px;
 border-radius: 4px;
 background-color: white;
 border : 1px solid;
 


 
`;

const DeleteContainer = styled.div`
 display: flex;
`

interface ItemsProps {
  id: string;
  content: string
}



function App() {

  const [items, setItems] = useState<ItemsProps[]>([])
  const [newItemContent, setNewItemContent] = useState<string>("")

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const itemsContent = [...items];
    const [removedItem] = itemsContent.splice(result.source.index , 1);
    itemsContent.splice(result.destination.index, 0, removedItem);
    setItems(itemsContent);

  };

  const addItem = () => {
    if (!newItemContent.trim()) return;
    const ListItemId = nanoid()
    const newList ={
      id: ListItemId,
      content: newItemContent,
    };
    setItems([...items, newList])
    setNewItemContent("")
  };

  const deleteItem = (id: string) => {
    setItems((items)=> {
      return items.filter((item)=> item.id !== id)
    })
  }


  return (
    <>
      <Container>
        <InputContainer>
          <Input 
          type= "text"
          value={newItemContent}
          onChange={(e)=>{setNewItemContent(e.target.value)}}
          />
          <Button onClick={addItem}>Ekle</Button>
        </InputContainer>
        <ListContainer>
          <List>
            <p>Drag and Drop</p>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="mylist">
                {(provider)=>(
                  <div {...provider.droppableProps} ref={provider.innerRef}>
                  {items.map(({id, content}: ItemsProps, index)=>(
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provider)=>(
                        <Listbox
                        ref={provider.innerRef}
                        {...provider.draggableProps}
                        {...provider.dragHandleProps} 
                        >
                          {content}
                          <DeleteContainer>
                            <Button onClick={()=>deleteItem(id)}>
                              <FaTrash  />
                            </Button>
                          </DeleteContainer>
                        </Listbox>
                    )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </List>
        </ListContainer>

      </Container>
        
    </>
  )
}

export default App
