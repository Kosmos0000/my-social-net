import React from 'react';
import './App.css';
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";

function App() {

  return (
    <div className="App">
      <div>
        <Header />
        <div className='main'>
            <Sidebar/>
            <div className='content'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
