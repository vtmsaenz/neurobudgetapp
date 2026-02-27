import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { token, refreshToken, userId, firstName, lastName, role } = response.data;
    
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('userId', userId.toString());
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userName', `${firstName} ${lastName}`);
    
    return response.data;
  },

  async register(email, password, firstName, lastName) {
    const response = await api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
    
    const { token, refreshToken, userId } = response.data;
    
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('userId', userId.toString());
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userName', `${firstName} ${lastName}`);
    
    return response.data;
  },

  async logout() {
    await AsyncStorage.clear();
  },

  async isAuthenticated() {
    const token = await AsyncStorage.getItem('token');
    if (!token) return false;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
        await AsyncStorage.clear();
        return false;
      }
      return true;
    } catch {
      await AsyncStorage.clear();
      return false;
    }
  },

  async getCurrentUser() {
    const userId = await AsyncStorage.getItem('userId');
    const email = await AsyncStorage.getItem('userEmail');
    const name = await AsyncStorage.getItem('userName');
    
    return { userId, email, name };
  },
};
