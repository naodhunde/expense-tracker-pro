const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Category = require('./models/Category');

dotenv.config();

const app = express();

connectDB();


app.use(cors({
  origin: [
    'http://localhost:5173',
    // Main production domain
    'https://expense-tracker-pro-gamma.vercel.app',
    // Main branch deployment
    'https://expense-tracker-pro-git-main-naods-projects-65dac5db.vercel.app',
    // Preview or other deploys
    'https://expense-tracker-4yazyxni2-naods-projects-65dac5db.vercel.app',
    // Allow all Vercel subdomains (wildcard, optional but powerful):
    /^https:\/\/.*\.vercel\.app$/
  ],
  credentials: true
}));


// Comment out routes temporarily to test
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/categories', require('./routes/categories'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const initCategories = async () => {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany([
        { name: 'Food & Dining', icon: '🍔', color: '#FF6B6B' },
        { name: 'Transportation', icon: '🚗', color: '#4ECDC4' },
        { name: 'Entertainment', icon: '🎬', color: '#95E1D3' },
        { name: 'Shopping', icon: '🛍️', color: '#FFE66D' },
        { name: 'Bills & Utilities', icon: '💰', color: '#FF8B94' },
        { name: 'Healthcare', icon: '🏥', color: '#C7CEEA' },
        { name: 'Education', icon: '📚', color: '#B4A7D6' },
        { name: 'Other', icon: '📌', color: '#A8DADC' }
      ]);
      console.log('✅ Categories initialized');
    }
  } catch (error) {
    console.error('Error initializing categories:', error);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  initCategories();
});
