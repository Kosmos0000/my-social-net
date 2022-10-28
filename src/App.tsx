import React from 'react';
import './App.css';
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Profile from "./components/Profile/profile";

function App() {

    return (
        <div className="App">
            <div>
                <Header/>
                <div className="container">
                    <div className='main'>
                        <Sidebar/>
                        <div className='content'>
                            <Profile/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
