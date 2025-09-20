const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'YOUR_RENDER_URL' // You'll replace this with your Render.com backend URL
    : 'http://localhost:5000'
};

export default config;