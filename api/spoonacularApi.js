import axios from 'axios';
// import { recipe_detail } from '../search_result';
// import { recipe_detail_data } from '../recipe_detail_data';

const API_KEY = 'a409b8ffc3e748afba9a096a759a4c2c';

// ===== CORS Proxy Configuration =====
// Option 1: Public Proxy (for testing, may have limits)
const PUBLIC_CORS_PROXY = 'https://cors-anywhere.herokuapp.com';

// Option 2: Your Self-Hosted Proxy (recommended for production)
// const YOUR_CORS_PROXY = 'https://your-proxy.example.com';

const BASE_URL = 'https://api.spoonacular.com/recipes';
const USE_MOCK_DATA = false; // Set to true for mock responses

// ===== Axios Instance =====
const spoonacularApi = axios.create({
  //baseURL: `${PUBLIC_CORS_PROXY}/${BASE_URL}`, // Prepend proxy URL
  baseURL: `${BASE_URL}`, // Prepend proxy URL
  params: {
    apiKey: API_KEY,
  },
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // Avoid CORS preflight for simple requests
  },
});

// ===== Error Handling =====
// 1. Check for missing API key
if (!API_KEY && !USE_MOCK_DATA) {
  console.error('API Key is missing. Check environment variables.');
}

// 2. Request interceptor
spoonacularApi.interceptors.request.use(
  (config) => {
    if (!API_KEY && !USE_MOCK_DATA) {
      return Promise.reject(new Error('API Key not configured'));
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 3. Response interceptor
spoonacularApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Invalid API Key');
          break;
        case 402:
          console.error('API Quota Exceeded');
          break;
        case 429:
          console.error('Rate Limit Exceeded');
          break;
        case 404:
          console.error('API Endpoint Not Found');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  },
);

// ===== API Functions =====
export const findRecipesByIngredients = async (ingredients) => {
  if (USE_MOCK_DATA) return recipe_detail; // Mock response

  try {
    const response = await spoonacularApi.get('/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 10,
        ranking: 2,
        ignorePantry: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch Recipes Error:', error);
    throw error;
  }
};

export const getRecipeInstructions = async (id) => {
  if (USE_MOCK_DATA) return recipe_detail_data; // Mock response

  try {
    const response = await spoonacularApi.get(`/${id}/analyzedInstructions`);
    return response.data;
  } catch (error) {
    console.error('Fetch Instructions Error:', error);
    throw error;
  }
};

// Mock data exports (optional)
export const findRecipesByIngredientsMock = () => recipe_detail;
export const getRecipeInstructionsMock = () => recipe_detail_data;