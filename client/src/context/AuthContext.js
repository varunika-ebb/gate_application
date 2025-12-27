import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || '';
axios.defaults.withCredentials = true;

// Create Auth Context
const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      // Store token in localStorage
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      }
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      // Remove token from localStorage
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      // Remove token from localStorage
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'LOAD_USER':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case 'AUTH_ERROR':
      // Remove token from localStorage
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);



  // Load user
  const loadUser = useCallback(async () => {
    try {
      const res = await axios.get('/api/auth/me');
      dispatch({ type: 'LOAD_USER', payload: res.data });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.response?.data?.message || 'Failed to load user' });
    }
  }, []);

  // Load user on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      // No token found - set loading to false so login page can render
      dispatch({ type: 'AUTH_ERROR', payload: null });
    }
  }, []); // Remove loadUser from dependencies to prevent infinite loop

  // Register user
  const register = async (userData) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const res = await axios.post('/api/auth/register', userData);

      // Store token and set authorization header
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }

      // Dispatch success with user data
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });

      return { success: true, message: res.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'REGISTER_FAIL', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  // Login user
  const login = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/api/auth/login', userData);

      // Store token and set authorization header
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }

      // Dispatch success with user data
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });

      return { success: true, message: res.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put('/api/auth/profile', profileData);
      dispatch({ type: 'UPDATE_USER', payload: res.data.user });
      return { success: true, message: res.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      return { success: false, message: errorMessage };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      const res = await axios.put('/api/auth/change-password', passwordData);
      return { success: true, message: res.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed';
      return { success: false, message: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Update user stats
  const updateStats = async (statsData) => {
    try {
      const res = await axios.post('/api/users/update-stats', statsData);
      dispatch({ type: 'UPDATE_USER', payload: { stats: res.data.stats } });
      return { success: true, stats: res.data.stats };
    } catch (error) {
      console.error('Stats update error:', error);
      return { success: false, message: error.response?.data?.message || 'Stats update failed' };
    }
  };

  const value = {
    ...state,
    register,
    login,
    logout,
    loadUser,
    updateProfile,
    changePassword,
    clearError,
    updateStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
