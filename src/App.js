import React from 'react';
import './App.css';
import Header from './pages/Header';
import Work from './pages/Work';
import Home from './pages/Home';

const App = () => {
  return (
    <div>
        <Header />
        {/* <Home /> */}
        <Work/>
    </div>
  );
};

export default App;
