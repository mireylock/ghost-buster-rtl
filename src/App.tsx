import React from 'react';
import { MainContainer } from './App.styles';
import { GhostBoard } from './components/GhostBoard';

const App: React.FC = () => {
  return (
    <MainContainer>
      <h1>🎃 Ghost Buster 🎃</h1>
      <p>Catch the ghosts before they disappear! If you missclick you lose</p>
      <GhostBoard />
    </MainContainer>
  );
};

export default App;
