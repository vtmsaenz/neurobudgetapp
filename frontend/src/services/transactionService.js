import api from './api';

export const transactionService = {
  async getTransactions(accountId = null, startDate = null, endDate = null) {
    let url = '/transactions';
    const params = [];
    
    if (accountId) params.push(`accountId=${accountId}`);
    if (startDate) params.push(`startDate=${startDate}`);
    if (endDate) params.push(`endDate=${endDate}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    const response = await api.get(url);
    return response.data;
  },

  async getTransaction(id) {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  async createTransaction(data) {
    const response = await api.post('/transactions', data);
    return response.data;
  },

  async updateTransaction(id, data) {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  },

  async deleteTransaction(id) {
    await api.delete(`/transactions/${id}`);
  },
};
