import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { expenseAPI, analyticsAPI } from '../services/api';
import { DollarSign, Receipt, TrendingDown, FolderOpen, Plus, Edit2, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, analyticsRes] = await Promise.all([
        expenseAPI.getAll(),
        analyticsAPI.getSummary(),
      ]);
      setExpenses(expensesRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await expenseAPI.create(expenseData);
      fetchData();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    try {
      await expenseAPI.update(editingExpense._id, expenseData);
      setEditingExpense(null);
      fetchData();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading...
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Top Navigation */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-brand">💰 ExpenseTracker</h1>
          <div className="navbar-user">
            <span>Welcome, <strong>{user?.username}</strong>!</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="stat-title">Total Spent</div>
                <div className="stat-value">${analytics?.totalSpent.toFixed(2) || '0.00'}</div>
              </div>
              <div style={{ color: 'var(--primary)', width: '24px', height: '24px' }}>
                <DollarSign />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="stat-title">Total Expenses</div>
                <div className="stat-value">{analytics?.expenseCount || 0}</div>
              </div>
              <div style={{ color: 'var(--primary)', width: '24px', height: '24px' }}>
                <Receipt />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="stat-title">Average Expense</div>
                <div className="stat-value">${analytics?.averageExpense.toFixed(2) || '0.00'}</div>
              </div>
              <div style={{ color: 'var(--primary)', width: '24px', height: '24px' }}>
                <TrendingDown />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="stat-title">Categories</div>
                <div className="stat-value">{Object.keys(analytics?.categoryBreakdown || {}).length}</div>
              </div>
              <div style={{ color: 'var(--primary)', width: '24px', height: '24px' }}>
                <FolderOpen />
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Expense Form */}
        <div className="card">
          <h2 className="card-title">
            <Plus style={{ display: 'inline-block', width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }} />
            {editingExpense ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            initialData={editingExpense}
            onCancel={() => setEditingExpense(null)}
          />
        </div>

        {/* Expense List Table */}
        <div className="card">
          <h2 className="card-title">Recent Expenses</h2>
          {expenses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              <Receipt style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.5 }} />
              <p>No expenses yet. Add your first expense above!</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td>{formatDate(expense.date)}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 500,
                          background: 'hsl(173 80% 40% / 0.1)',
                          color: 'var(--primary)',
                          border: '1px solid hsl(173 80% 40% / 0.2)'
                        }}>
                          {expense.category}
                        </span>
                      </td>
                      <td>{expense.description || '—'}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        ${expense.amount.toFixed(2)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => setEditingExpense(expense)}
                          className="btn-icon"
                          style={{ marginRight: '8px' }}
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense._id)}
                          className="btn-icon delete"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Expense Form Component
const ExpenseForm = ({ onSubmit, initialData, onCancel }) => {
  const [amount, setAmount] = useState(initialData?.amount || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [date, setDate] = useState(
    initialData?.date?.split('T')[0] || new Date().toISOString().split('T')[0]
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categoriesAPI } = await import('../services/api');
        const response = await categoriesAPI.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        amount: parseFloat(amount),
        category,
        description,
        date: new Date(date),
      });
      if (!initialData) {
        setAmount('');
        setCategory('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]);
      }
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label className="form-label">Amount ($)</label>
        <input
          type="number"
          step="0.01"
          className="form-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional"
        />
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px' }}>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading && <span className="spinner"></span>}
          {loading ? 'Saving...' : initialData ? 'Update Expense' : 'Add Expense'}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              background: 'var(--input)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default Dashboard;
