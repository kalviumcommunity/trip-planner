const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://trip-planner-dhqi.onrender.com' 
    : 'http://localhost:5000'
};

export default config;