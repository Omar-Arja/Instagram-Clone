import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SignUp from './pages/Authentication/Register';
import SignIn from './pages/Authentication/Log-in';
import PostFeed from './components/post-feed';
import Search from './components/search';
import Sidebar from './components/sidebar';

function App() {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn setUser={setUser}/>} />
      <Route path='/' element={<Sidebar />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
