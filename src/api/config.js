// src/api/config.js
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
export default API_BASE_URL;

/*
// src/config.js ou src/api.js
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:10000/api';
// ou, para simplicidade e direto para produção:
// const API_BASE_URL = 'https://seu-backend.onrender.com/api';

export default API_BASE_URL; */