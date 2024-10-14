import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../Helper/AxiosInstance';

const fetchData = () => {
  return axiosInstance.post('/auth/login', {
      username: 'admin123',
      password: 'Buiduy131@'
    })
    .then(response => {
      const data = response.data;
      
      console.log('Response Data:', data);
      const accessToken = data.data.accessToken;
      const refreshToken = data.data.refreshToken;
      
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
      
      return JSON.stringify(data);
    })
    .catch(err => {
      console.log(err);
    });
}

function TestApi() {
  const [showUserDataJson, setShowUserDataJson] = useState('');

  useEffect(() => {
    fetchData().then(randomData => {
      setShowUserDataJson(randomData);
    });
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <button onClick={() => fetchData().then(randomData => setShowUserDataJson(randomData))}>
        Fetch Data
      </button>
      <p>{showUserDataJson}</p>
    </div>
  );
}

export default TestApi;
