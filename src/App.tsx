import React from 'react';
import './App.css';
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Profile from "./components/profile/profile";

import Users from "./components/users/users";
import {Route, Routes} from "react-router-dom";

function App() {


    return (
        <div className="App">
            <div>
                <Header/>
                <div className="container">
                    <div className='main'>
                        <Sidebar/>
                        <div className='content'>
                            <Routes>
                                <Route path="/" element={<Profile />} />
                                <Route path="users" element={<Users />} />
                                <Route path="profile" element={<Profile />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
