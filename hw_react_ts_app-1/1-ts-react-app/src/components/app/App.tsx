import './App.css';
import React from 'react';
import Header from '../header/Header'
import Main from '../main/Main';
import Footer from '../footer/Footer';


const App: React.FC = () => {
  return (
    <div className='page'>
      <Header/> 
      <Main/>
      <Footer/> 
    </div>
  );
};

export default App;