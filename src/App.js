import React from 'react';
import './scss/main.scss';
import FamousMountains from './components/Famous_mountains';
import KoreanTourist from './components/KoreanTourist';
import WorldTravel from './components/WorldTravel';
import Movies from './components/Movies';
import Masterpiece from './components/Masterpiece';

function App() {

  return (
    <div className="App">
      <h1>Database 입력하기</h1>
      <div className='inner'>
        <FamousMountains />
        <KoreanTourist />
        <WorldTravel />
        <Movies />
        <Masterpiece />
      </div>
    </div>
  );
}

export default App;
