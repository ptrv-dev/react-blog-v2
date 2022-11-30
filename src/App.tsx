import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { login, logout } from './redux/slices/user.slice';
import { useAppDispatch } from './redux/store';

import { IGetMeResponse } from './@types/custom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import FullPostPage from './pages/FullPostPage';
import PostsPage from './pages/PostsPage';
import FullUserPage from './pages/FullUserPage';
import UserFavoritesPage from './pages/UserFavoritesPage';
import UserSettingsPage from './pages/UserSettingsPage';

import Header from './components/Header';
import Footer from './components/Footer';

export const appAxios = axios.create({
  baseURL: 'https://express-likbezz-production.up.railway.app/',
  withCredentials: true,
});

const App: React.FC = () => {
  console.log(process.env.BASE_URI_API);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await appAxios.get<IGetMeResponse>('/auth/me');
        dispatch(login({ ...data, isAuth: true }));
      } catch (error) {
        dispatch(logout());
      }
    }
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/registration" element={<RegistrationPage />} />
        <Route path="/post/:postId" element={<FullPostPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/users/:userId" element={<FullUserPage />} />
        <Route
          path="/users/:userId/favorites"
          element={<UserFavoritesPage />}
        />
        <Route path="/user/settings" element={<UserSettingsPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
