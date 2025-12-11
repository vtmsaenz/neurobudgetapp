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
    return !!token;
  },

  async getCurrentUser() {
    const userId = await AsyncStorage.getItem('userId');
    const email = await AsyncStorage.getItem('userEmail');
    const name = await AsyncStorage.getItem('userName');
    
    return { userId, email, name };
  },
};
