import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: #2c3e50;
    font-weight: 500;
  }

  input, select {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
`;

const TimeSlot = styled.button`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${props => props.selected ? '#3498db' : 'white'};
  color: ${props => props.selected ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.selected ? '#2980b9' : '#f8f9fa'};
  }

  &:disabled {
    background: #f8f9fa;
    color: #999;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }
`;

function PropertyScheduleTour() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [tourType, setTourType] = useState('in-person');

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle tour scheduling
    console.log({
      date: selectedDate,
      time: selectedTime,
      type: tourType
    });
  };

  return (
    <Container>
      <Title>Schedule a Tour</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Tour Type</label>
          <select
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
          >
            <option value="in-person">In-Person Tour</option>
            <option value="video">Video Tour</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="Choose a date"
            dateFormat="MMMM d, yyyy"
          />
        </FormGroup>

        {selectedDate && (
          <FormGroup>
            <label>Available Time Slots</label>
            <TimeSlots>
              {timeSlots.map(time => (
                <TimeSlot
                  key={time}
                  selected={selectedTime === time}
                  onClick={() => setSelectedTime(time)}
                  type="button"
                >
                  {time}
                </TimeSlot>
              ))}
            </TimeSlots>
          </FormGroup>
        )}

        <SubmitButton 
          type="submit"
          disabled={!selectedDate || !selectedTime}
        >
          Schedule Tour
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default PropertyScheduleTour; 