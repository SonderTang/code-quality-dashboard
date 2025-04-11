import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  interface Credentials {
    username: string;
    password: string;
  }

  // login变化时 handleLogin函数才会被重新创建
  const handleLogin = useCallback((credentials: Credentials) => {
    login(credentials, () => {
      navigate('/home')
    });
  }, [login, navigate]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin
  };
};