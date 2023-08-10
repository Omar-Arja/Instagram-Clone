import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SignUp from './components/Authentication/Register';
import SignIn from './components/Authentication/Log-in';

function App() {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn setUser={setUser}/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
