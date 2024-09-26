import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './MainPage.css';

const MainPage = () => {
  const [fileContent1, setFileContent1] = useState('');
  const [fileContent2, setFileContent2] = useState('');
  const [originalContent1, setOriginalContent1] = useState('');
  const [originalContent2, setOriginalContent2] = useState('');
  const [pattern, setPattern] = useState('');
  const [positions, setPositions] = useState([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  const handleFileUpload = (event, setFileContent, setOriginalContent) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFileContent(e.target.result);
        setOriginalContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const highlightSubstring = (text, ranges) => {
    let highlightedText = '';
    let lastIndex = 0;

    ranges.forEach(({ start, end }) => {
      highlightedText += text.slice(lastIndex, start);
      highlightedText += `<span class="highlight">${text.slice(start, end + 1)}</span>`;
      lastIndex = end + 1;
    });

    highlightedText += text.slice(lastIndex);
    return highlightedText;
  };

  const runZAlgorithm = async () => {
    try {
      const response = await axiosInstance.post('/zAlgorithm', { text: fileContent1, pattern });
      const { positions } = response.data;
      setPositions(positions);
      setCurrentPositionIndex(0);
      if (positions.length > 0) {
        const highlightedText = highlightSubstring(fileContent1, [{ start: positions[0], end: positions[0] + pattern.length - 1 }]);
        setFileContent1(highlightedText);
      }
    } catch (error) {
      console.error('Error running Z Algorithm:', error);
    }
  };

  const nextMatch = () => {
    if (positions.length > 0) {
      const nextIndex = (currentPositionIndex + 1) % positions.length;
      const highlightedText = highlightSubstring(originalContent1, [{ start: positions[nextIndex], end: positions[nextIndex] + pattern.length - 1 }]);
      setFileContent1(highlightedText);
      setCurrentPositionIndex(nextIndex);
    }
  };

  const prevMatch = () => {
    if (positions.length > 0) {
      const prevIndex = (currentPositionIndex - 1 + positions.length) % positions.length;
      const highlightedText = highlightSubstring(originalContent1, [{ start: positions[prevIndex], end: positions[prevIndex] + pattern.length - 1 }]);
      setFileContent1(highlightedText);
      setCurrentPositionIndex(prevIndex);
    }
  };

  const runManacher = async () => {
    try {
      const response = await axiosInstance.post('/manacher', { text: fileContent1 });
      const { startIndex, endIndex } = response.data;
      const highlightedText = highlightSubstring(fileContent1, [{ start: startIndex, end: endIndex }]);
      setFileContent1(highlightedText);
    } catch (error) {
      console.error('Error running Manacher:', error);
    }
  };

  const runLongestCommonSubstring = async () => {
    try {
      const response = await axiosInstance.post('/longestCommonSubString', { text1: fileContent1, text2: fileContent2 });
      const { substringCoordinates1, substringCoordinates2 } = response.data;

      if (substringCoordinates1 && substringCoordinates2) {
        const highlightedText1 = highlightSubstring(fileContent1, substringCoordinates1);
        const highlightedText2 = highlightSubstring(fileContent2, substringCoordinates2);
        
        setFileContent1(highlightedText1);
        setFileContent2(highlightedText2);
      }
    } catch (error) {
      console.error('Error running Longest Common Substring:', error);
    }
  };

  const resetHighlight = () => {
    setFileContent1(originalContent1);
    setFileContent2(originalContent2);
    setPositions([]);
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

      <div className="pattern-input-container">
        <input
          className="pattern-input"
          type="text"
          placeholder="Enter pattern to search"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
        <button onClick={runZAlgorithm}>Search Pattern (Z Algorithm)</button>
      </div>

      <div className="button-container">
        <button onClick={runManacher}>Run Manacher</button>
        <button onClick={runLongestCommonSubstring} disabled={!fileContent1 || !fileContent2}>
          Run Longest Common Substring
        </button>
        <button onClick={resetHighlight}>Reset Highlight</button>
        <button onClick={prevMatch} disabled={positions.length === 0}>Prev Match</button>
        <button onClick={nextMatch} disabled={positions.length === 0}>Next Match</button>
      </div>
    </div>
  );
};

export default MainPage;
