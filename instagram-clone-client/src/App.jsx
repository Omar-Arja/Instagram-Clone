import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SignUp from './pages/Authentication/Register';
import SignIn from './pages/Authentication/Log-in';
import PostCard from './components/post-card';

function App() {

  const [user, setUser] = useState(null);

  const test_post = {
      id: 3,
      user_id: 2,
      username: 'example_user',
      image_url: 'http://127.0.0.1:8000/images/1691683358.png',
      is_liked: false,
      total_likes: 123,
      caption: 'lorem jwk e2hejb1 e2h1be21 wb2jh1bw 21wv2h1 hw21e wb12 e2 e e 21e 3e rwqfrewq fewq fewq f wqfrwqf r wqf rq wfe wq f rwe qfewqfreq f ew',
    };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn setUser={setUser}/>} />
      <Route path='/' element={<PostCard {...test_post} />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
