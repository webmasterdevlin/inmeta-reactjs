import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './root-router';

function App() {
  return (
    <BrowserRouter>
      <>
        <h2>Logo and NavBar</h2>
        <RootRouter />
      </>
    </BrowserRouter>
  );
}
export default App;
