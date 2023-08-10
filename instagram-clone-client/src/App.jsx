import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SignUp from './pages/Authentication/Register';
import SignIn from './pages/Authentication/Log-in';
import PostCard from './components/post-card';
import PostFeed from './components/post-feed';

function App() {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn setUser={setUser}/>} />
      <Route path='/' element={<PostFeed />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
