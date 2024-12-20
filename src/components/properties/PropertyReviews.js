import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 3rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #2c3e50;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .stars {
    color: #f1c40f;
  }
  
  .count {
    color: #666;
  }
`;

const ReviewsList = styled.div`
  display: grid;
  gap: 2rem;
`;

const ReviewCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Reviewer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .info {
    h4 {
      color: #2c3e50;
      margin: 0;
    }

    .date {
      color: #666;
      font-size: 0.9rem;
    }
  }
`;

const ReviewStars = styled.div`
  color: #f1c40f;
`;

const ReviewContent = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

const WriteReviewButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #2980b9;
  }
`;

const ReviewForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  h3 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
    min-height: 150px;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: ${props => props.rating >= props.value ? '#f1c40f' : '#ddd'};
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #f1c40f;
    }
  }
`;

function PropertyReviews() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "/images/avatars/user1.jpg",
      date: "2 weeks ago",
      rating: 5,
      content: "Excellent property with great amenities. The location is perfect and the staff is very helpful."
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "/images/avatars/user2.jpg",
      date: "1 month ago",
      rating: 4,
      content: "Beautiful property with modern amenities. Slight issue with parking but overall a great experience."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle review submission
    console.log({ rating, reviewText });
    setShowReviewForm(false);
    setRating(0);
    setReviewText('');
  };

  return (
    <Container>
      <Header>
        <h2>Property Reviews</h2>
        <Rating>
          <div className="stars">★★★★★</div>
          <div className="count">(12 reviews)</div>
        </Rating>
      </Header>

      {!showReviewForm && (
        <WriteReviewButton onClick={() => setShowReviewForm(true)}>
          Write a Review
        </WriteReviewButton>
      )}

      {showReviewForm && (
        <ReviewForm onSubmit={handleSubmit}>
          <h3>Write Your Review</h3>
          <StarRating rating={rating}>
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
              >
                ★
              </button>
            ))}
          </StarRating>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience..."
            required
          />
          <WriteReviewButton type="submit">Submit Review</WriteReviewButton>
        </ReviewForm>
      )}

      <ReviewsList>
        {reviews.map(review => (
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <Reviewer>
                <img src={review.avatar} alt={review.name} />
                <div className="info">
                  <h4>{review.name}</h4>
                  <div className="date">{review.date}</div>
                </div>
              </Reviewer>
              <ReviewStars>
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </ReviewStars>
            </ReviewHeader>
            <ReviewContent>{review.content}</ReviewContent>
          </ReviewCard>
        ))}
      </ReviewsList>
    </Container>
  );
}

export default PropertyReviews; 