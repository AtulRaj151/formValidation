import { useState } from 'react'
import { Card, Modal } from '../components'
import './DashBoard.css'
import {data} from '../assets/mockData'

function DashBoard() {
  const [mockData, setMockData] = useState(data);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  const updateCardContent = (newContent) => {
    const updatedData = mockData.map((item)=> 
       item?.id === newContent?.id ?  newContent : item
    )
    const newSelectedCard = mockData.find((item)=> {
        return item?.id === newContent?.id
    })
    setMockData(updatedData);
    setSelectedCard(newSelectedCard);
  };



  return (
    <>
       <div id='dashboard-container'>
         {mockData.map((item)=>(
          <Card
           name={item?.name}
           email={item?.email}
           phone={item?.phone}
           website={item?.website}
           key={item?.id}
           data-id={item?.id}
           onEdit={()=> openModal(item)}
          />
         ))}

         {isModalOpen && (<Modal isOpen={isModalOpen} onClose={closeModal} onUpdateContent={updateCardContent} selectedCard={selectedCard} />)}
       </div>
    </>
  )
}

export default DashBoard
