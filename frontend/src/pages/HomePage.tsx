// src/pages/HomePage.tsx
import React from 'react';
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {

    const navigate = useNavigate();  // Initialize the useNavigate hook

    // Function to navigate to the items page
    const goToItems = () => {
      navigate('/items');  // Navigate to the "/items" page when the button is clicked
    };

  return (
    <div className='bg-background mx-auto w-full h-screen'>
        <div className='flex flex-col justify-center items-center max-w-screen-md mx-auto h-full'>
            <h1 className='text-5xl font-bold text-body'>Arkminds Technical Assesment</h1>
            <Button className='mt-12' type="primary" onClick={goToItems}>Begin Assestment</Button>
        </div>
    </div>
  );
};

export default HomePage; 
