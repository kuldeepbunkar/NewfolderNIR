import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  margin-bottom: 3rem;
`;

const MainImageContainer = styled.div`
  position: relative;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

const ThumbnailContainer = styled.div`
  height: 100px;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  opacity: ${props => props.active ? 1 : 0.7};
  transition: all 0.3s;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ViewAllButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 90vh;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  
  ${props => props.direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

function PropertyGallery({ images }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <GalleryContainer>
      <MainImageContainer>
        <MainImage src={images[activeImage]} alt="Property" />
        <ViewAllButton onClick={() => setShowModal(true)}>
          View All Photos
        </ViewAllButton>
      </MainImageContainer>

      <GalleryGrid>
        {images.slice(0, 5).map((image, index) => (
          <ThumbnailContainer
            key={index}
            active={index === activeImage}
            onClick={() => setActiveImage(index)}
          >
            <Thumbnail src={image} alt={`Thumbnail ${index + 1}`} />
          </ThumbnailContainer>
        ))}
      </GalleryGrid>

      {showModal && (
        <Modal>
          <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
          <ModalContent>
            <img src={images[activeImage]} alt="Property" />
            <NavigationButton direction="prev" onClick={handlePrev}>
              ‹
            </NavigationButton>
            <NavigationButton direction="next" onClick={handleNext}>
              ›
            </NavigationButton>
          </ModalContent>
        </Modal>
      )}
    </GalleryContainer>
  );
}

export default PropertyGallery; 