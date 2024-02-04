import { useState } from 'react';
import { Card, Modal } from '../components';
import './DashBoard.css';
import { data } from '../assets/mockData';

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
    const updatedData = mockData.map((item) =>
      item?.id === newContent?.id ? newContent : item
    );
    const newSelectedCard = mockData.find((item) => item?.id === newContent?.id);
    setMockData(updatedData);
    setSelectedCard(newSelectedCard);
  };

  const handleDelete = (id) => {
    const updatedData = mockData.filter((item) => item.id !== id);
    setMockData(updatedData);
    closeModal();
  };

  const handleLike = (id, isLiked) => {
    const updatedData = mockData.map((item) =>
      item.id === id ? { ...item, isLiked: !isLiked } : item
    );
    setMockData(updatedData);
  };

  return (
    <>
      <div id='dashboard-container'>
        {mockData.map((item) => (
          <Card
            name={item?.name}
            email={item?.email}
            phone={item?.phone}
            website={item?.website}
            key={item?.id}
            id={item?.id}
            onEdit={() => openModal(item)}
            onDelete={() => handleDelete(item.id)}
            onLike={() => handleLike(item.id, item.isLiked)}
            isLiked={item.isLiked}
          />
        ))}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onUpdateContent={updateCardContent}
            selectedCard={selectedCard}
          />
        )}
      </div>
    </>
  );
}

export default DashBoard;
