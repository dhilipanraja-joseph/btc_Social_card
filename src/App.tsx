import React from 'react';
import UserProfiles from './components/UserProfiles';
import AddUser from './components/AddUser';
import './App.css';

function App() {
  return (
    <div className="App">
        <UserProfiles />
        <AddUser />
    </div>
  );
}

export default App;
