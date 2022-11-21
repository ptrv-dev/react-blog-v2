import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      {/* {/* <Route path="/auth/login" element={<LoginPage />} /> */}
      {/* <Route path="/auth/registration" element={<RegistrationPage />} /> */}
    </Routes>
  );
};

export default App;
