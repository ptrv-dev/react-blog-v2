import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        {/* {/* <Route path="/auth/login" element={<LoginPage />} /> */}
        {/* <Route path="/auth/registration" element={<RegistrationPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
