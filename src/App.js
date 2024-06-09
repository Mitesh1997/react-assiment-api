import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from './Components/Users/Users';
import UserAddEdit from './Components/Users/UserAddEdit';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/user/:id" element={<UserAddEdit />} />
        <Route path="/user" element={<UserAddEdit />} />
        <Route path="/" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
