import axios from 'axios';

const API_URL = 'http://localhost:8888'; // Your API base URL

export const register = (data) => {
    return axios.post(`${API_URL}/auth/register`, data);
};

export const login = (data) => {
    return axios.post(`${API_URL}/auth/login`, data);
};

export const getUserProfile = (token) => {
    return axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getMyAccounts = (token) => {
    return axios.get(`${API_URL}/accounts`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createNewAccount = (token) => {
    return axios.post(`${API_URL}/accounts`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const depositFunds = async (token, depositData) => {
  const response = await axios.post(`${API_URL}/transaction/deposit`, depositData, {
      headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const withdrawFunds = async (token, withdrawData) => {
  const response = await axios.post(`${API_URL}/transaction/withdraw`, withdrawData, {
      headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const transferFunds = async (token, transferDetails) => {
  const response = await fetch(`${API_URL}/transaction/transfer`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(transferDetails)
  });
  return response.json();
};

export const getUserTransactions = async (token) => {
  return await axios.get(`${API_URL}/transaction/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};