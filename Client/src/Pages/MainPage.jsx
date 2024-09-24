import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; 
import './MainPage.css';

const MainPage = () => {
  const [title, setTitle] = useState('');

  const getTitle = async () => {
    try {
      const response = await axiosInstance.post('/manchester');
      setTitle(response.data.title);
    } catch (error) {
      console.error('Error fetching title:', error);
    }
  };

  return (
    <div>
      <h1>{title || 'Default Title'}</h1>
      <button onClick={getTitle}>Get Título</button>
    </div>
  );
};

export default MainPage;
