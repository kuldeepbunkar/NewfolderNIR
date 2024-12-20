import React from 'react';
import styled from 'styled-components';
import PropertyCard from './PropertyCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Container = styled.div`
  margin: 4rem 0;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

const SliderContainer = styled.div`
  .swiper {
    padding: 1rem;
    margin: -1rem;
  }

  .swiper-slide {
    height: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #3498db;
    
    &:after {
      font-size: 1.5rem;
    }
  }

  .swiper-pagination-bullet-active {
    background: #3498db;
  }
`;

function SimilarProperties({ currentProperty, similarProperties }) {
  return (
    <Container>
      <Header>
        <h2>Similar Properties</h2>
        <p>You might also be interested in these properties</p>
      </Header>

      <SliderContainer>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            968: {
              slidesPerView: 3,
            }
          }}
        >
          {similarProperties.map(property => (
            <SwiperSlide key={property.id}>
              <PropertyCard property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderContainer>
    </Container>
  );
}

export default SimilarProperties; 