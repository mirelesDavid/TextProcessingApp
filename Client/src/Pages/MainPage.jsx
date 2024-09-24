import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './MainPage.css';

const MainPage = () => {
  const [fileContent1, setFileContent1] = useState('');
  const [fileContent2, setFileContent2] = useState('');

  const handleFileUpload = (event, setFileContent) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setFileContent(e.target.result); 
      };
      reader.readAsText(file);
    }
  };

  const highlightPalindrome = (text, startIndex, endIndex) => {
    const beforePalindrome = text.slice(0, startIndex);
    const palindrome = text.slice(startIndex, endIndex + 1);
    const afterPalindrome = text.slice(endIndex + 1);
    return `${beforePalindrome}<span class="highlight">${palindrome}</span>${afterPalindrome}`;
  };

  const runManacher = async () => {
    try {
      const response = await axiosInstance.post('/manacher', { text: fileContent1 });
      const { startIndex, endIndex } = response.data;
      const highlightedText = highlightPalindrome(fileContent1, startIndex, endIndex);
      setFileContent1(highlightedText);
    } catch (error) {
      console.error('Error running Manacher:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="textarea-container">
        <div className="file-container">
          <div
            id="textbox1"
            className="highlighted-text"
            dangerouslySetInnerHTML={{ __html: fileContent1 }}
          ></div>
          <br />
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileUpload(e, setFileContent1)}
          />
        </div>

        <div className="file-container">
          <textarea
            id="textbox2"
            value={fileContent2}
            readOnly
            placeholder="File content will appear here..."
          />
          <br />
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileUpload(e, setFileContent2)}
          />
        </div>
      </div>

      <div className="button-container">
        <button onClick={runManacher}>Run Manacher</button>
      </div>
    </div>
  );
};

export default MainPage;
