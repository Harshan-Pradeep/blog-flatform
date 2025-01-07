import api from './api';
import { LoginCredentials, User } from '../types/auth.types';

export const authService = {
  login: (credentials: LoginCredentials) => 
    api.post<User>('/auth/login', credentials),

  logout: () => 
    api.post('/auth/logout'),

  getCurrentUser: () => 
    api.get<User>('/auth/profile'),
};