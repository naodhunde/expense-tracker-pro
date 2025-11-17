const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

router.get('/summary', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate ? new Date(endDate) : new Date();

    const expenses = await Expense.find({
      user: req.userId,
      date: { $gte: start, $lte: end }
    });

    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categoryBreakdown = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    res.json({
      totalSpent: parseFloat(totalSpent.toFixed(2)),
      expenseCount: expenses.length,
      averageExpense: expenses.length > 0 ? parseFloat((totalSpent / expenses.length).toFixed(2)) : 0,
      categoryBreakdown
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
