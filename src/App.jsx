import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Profile from "./components/profile/profile";
import Users from "./components/users/users";
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createThunkGetDataAuthMe} from "./redux-toolkit/reducers/authReducer";
import Loading from "./components/common/loading/loading";
import Login from "./components/common/login/login";
import Dialogs from "./components/dialogs/dialogs";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createThunkGetDataAuthMe())
    }, [])


    return (
        <div className="App">
            <div>
                <Header/>
                <div className="container">
                    <div className='main'>
                        <Sidebar/>
                        <div className='content'>
                            <Routes>
                                <Route path={`/`} element={<Loading />} />
                                <Route path="users" element={<Users />} />
                                <Route path="profile/*" element={<Profile />} />
                                <Route path="login" element={<Login />} />
                                <Route path="dialogs/*" element={<Dialogs />} />
                                <Route path="dialogs/*/messages" element={<Dialogs />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
