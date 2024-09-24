import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './MainPage.css';

const MainPage = () => {
  const [fileContent1, setFileContent1] = useState('');
  const [fileContent2, setFileContent2] = useState('');
  const [originalContent1, setOriginalContent1] = useState('');
  const [originalContent2, setOriginalContent2] = useState('');

  const handleFileUpload = (event, setFileContent, setOriginalContent) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setFileContent(e.target.result); 
        setOriginalContent(e.target.result); // Guarda el contenido original
      };
      reader.readAsText(file);
    }
  };

  const highlightSubstring = (text, ranges) => {
    let highlightedText = '';
    let lastIndex = 0;
    
    ranges.forEach(({start, end}) => {
      highlightedText += text.slice(lastIndex, start);
      highlightedText += `<span class="highlight">${text.slice(start, end + 1)}</span>`;
      lastIndex = end + 1;
    });

    highlightedText += text.slice(lastIndex);
    return highlightedText;
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

  const runLongestCommonSubstring = async () => {
    try {
      const response = await axiosInstance.post('/longestCommonSubString', { text1: fileContent1, text2: fileContent2 });
      const { substringCoordinates1, substringCoordinates2 } = response.data;

      const highlightedText1 = highlightSubstring(fileContent1, substringCoordinates1);
      const highlightedText2 = highlightSubstring(fileContent2, substringCoordinates2);

      setFileContent1(highlightedText1);
      setFileContent2(highlightedText2);
    } catch (error) {
      console.error('Error running Longest Common Substring:', error);
    }
  };

  // Función para restablecer los textos originales
  const resetHighlight = () => {
    setFileContent1(originalContent1); // Restablece el contenido original de fileContent1
    setFileContent2(originalContent2); // Restablece el contenido original de fileContent2
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
            onChange={(e) => handleFileUpload(e, setFileContent1, setOriginalContent1)}
          />
        </div>

        <div className="file-container">
          <div
            id="textbox2"
            className="highlighted-text"
            dangerouslySetInnerHTML={{ __html: fileContent2 }}
          ></div>
          <br />
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileUpload(e, setFileContent2, setOriginalContent2)}
          />
        </div>
      </div>

      <div className="button-container">
        <button onClick={runManacher}>Run Manacher</button>
        <button onClick={runLongestCommonSubstring}>Run Longest Common Substring</button>
        <button onClick={resetHighlight}>Reset Highlight</button>
      </div>
    </div>
  );
};

export default MainPage;
