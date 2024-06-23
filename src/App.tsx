import { useState } from 'react'
import styled from 'styled-components'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import { nanoid } from 'nanoid';
import { FaTrash, FaEdit } from 'react-icons/fa';



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
padding: 8px 16px;
font-size: 16px;
cursor: pointer;
color: #fff;
background-color: black;
border: none;
border-radius: 4px;
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

const ModalBackground = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
align-item:center;
justify-content:center;



`;
const ModalContainer = styled.div`
padding: 20px;
border-radius:8px;
display:flex;
align-item:center;
gap:10px;
`;

const EditDeleteContainer = styled.div`
 display: flex;
 gap:10px;
`;



interface ItemsProps {
  id: string;
  content: string
}



function App() {

  const [items, setItems] = useState<ItemsProps[]>([])
  const [newItemContent, setNewItemContent] = useState<string>("")

  const [open,setOpen] = useState<boolean>(false)
  const [inputEdit,setInputEdit] = useState<string>("")
  const [selectedId, setSelectedId] = useState<string>("")

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

  const openEditModal = (id: string, content:string) =>{
    setOpen(true)
    setInputEdit(content)
    setSelectedId(id)
  }

  const saveEditItem = () => {
    const selectedItem = items.find((item) => item.id === selectedId)
    if (selectedItem) {
      selectedItem.content = inputEdit
      setItems([...items])
    }
    setOpen(false)
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
                          <EditDeleteContainer>
                            <Button onClick={()=>deleteItem(id)}>
                              <FaTrash  />
                            </Button>
                            <Button onClick={()=>openEditModal(id, content)}> <FaEdit/></Button>
                          </EditDeleteContainer>
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
      {open &&(
        <ModalBackground>
          <ModalContainer>
            <Input
            type='text'
            value={inputEdit}
            onChange={(e) => setInputEdit(e.target.value)}
             />
             <Button onClick={saveEditItem}>Kaydet</Button>
          </ModalContainer>
        </ModalBackground>
      )}
   
    </>
  )
}

export default App
