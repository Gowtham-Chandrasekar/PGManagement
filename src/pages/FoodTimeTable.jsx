import React from 'react';
import { Container, Table } from 'react-bootstrap';

const FoodTimeTable = () => {
  const foodSchedule = [
    {
      day: 'Monday',
      morning: 'Idli & Sambar',
      afternoon: 'Rice, Dal, Veg Curry',
      night: 'Chapati & Kurma',
    },
    {
      day: 'Tuesday',
      morning: 'Dosa & Chutney',
      afternoon: 'Rice, Sambar, Beans Poriyal',
      night: 'Parotta & Gravy',
    },
    {
      day: 'Wednesday',
      morning: 'Pongal & Vada',
      afternoon: 'Rice, Rasam, Potato Fry',
      night: 'Lemon Rice & Chips',
    },
    {
      day: 'Thursday',
      morning: 'Upma & Banana',
      afternoon: 'Rice, Kootu, Curd',
      night: 'Chapati & Paneer Masala',
    },
    {
      day: 'Friday',
      morning: 'Poori & Masala',
      afternoon: 'Rice, Veg Biryani',
      night: 'Idiyappam & Coconut Milk',
    },
    {
      day: 'Saturday',
      morning: 'Aloo Paratha & Curd',
      afternoon: 'Rice, Fish Curry (non-veg)',
      night: 'Vegetable Pulao',
    },
    {
      day: 'Sunday',
      morning: 'Bread & Jam, Boiled Eggs',
      afternoon: 'Chicken Biryani (non-veg)',
      night: 'Fried Rice & Manchurian',
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Weekly Food Time Table</h2>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Day</th>
            <th>Morning Food</th>
            <th>Afternoon Food</th>
            <th>Night Food</th>
          </tr>
        </thead>
        <tbody>
          {foodSchedule.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>{item.morning}</td>
              <td>{item.afternoon}</td>
              <td>{item.night}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FoodTimeTable;
