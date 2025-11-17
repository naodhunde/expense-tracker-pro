# EXPENSE TRACKER PRO

A full-stack MERN expense tracking application with JWT authentication, real-time analytics, and a beautiful teal-themed dark UI.

## FEATURES

- **Secure Authentication** - JWT-based user registration and login with password hashing
- **Real-time Analytics** - Dynamic statistics including total spent, expense count, and category breakdown
- **Expense Management** - Full CRUD operations for tracking expenses with categories
- **Date Tracking** - Record and filter expenses by date
- **Modern UI** - Beautiful teal-themed dark mode interface with smooth animations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Category Organization** - 8 predefined expense categories (Food, Transport, Entertainment, etc.)
- **Budget Insights** - Average expense calculations and spending patterns
- **Fast & Efficient** - Built with Vite for optimal performance
- **Data Privacy** - User-specific data isolation with secure API endpoints

## TECH STACK

### Frontend
- React - UI library
- React Router - Client-side routing
- Axios - HTTP client
- Lucide React - Icon library
- Vite - Build tool
- CSS3 - Custom styling with CSS variables

### Backend
- Node.js - Runtime environment
- Express - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin resource sharing

## INSTALLATION

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Clone the Repository
```bash
git clone https://github.com/naodhunde/expense-tracker-pro.git
cd expense-tracker-pro
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## USAGE

1. **Register** - Create a new account with username, email, and password
2. **Login** - Sign in with your credentials
3. **Add Expenses** - Record expenses with amount, category, date, and description
4. **View Dashboard** - See real-time statistics and all your expenses
5. **Edit/Delete** - Manage your expenses with edit and delete options
6. **Logout** - Securely log out of your account

## PROJECT STRUCTURE

```
expense-tracker-pro/
├── backend/
│   ├── config/db.js (MongoDB connection)
│   ├── middleware/auth.js (JWT authentication middleware)
│   ├── models/User.js (User schema)
│   ├── models/Expense.js (Expense schema)
│   ├── models/Category.js (Category schema)
│   ├── routes/auth.js (Authentication routes)
│   ├── routes/expenses.js (Expense CRUD routes)
│   ├── routes/analytics.js (Analytics routes)
│   ├── routes/categories.js (Category routes)
│   ├── .env.example (Environment variables template)
│   ├── server.js (Express server setup)
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ExpenseForm.jsx
│   │   ├── components/ExpenseList.jsx
│   │   ├── components/StatCard.jsx
│   │   ├── context/AuthContext.jsx (Authentication state)
│   │   ├── pages/Login.jsx
│   │   ├── pages/Register.jsx
│   │   ├── pages/Dashboard.jsx
│   │   ├── services/api.js (API service layer)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css (Global styles)
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## API ENDPOINTS

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Expenses
- `GET /api/expenses` - Get all expenses (protected)
- `POST /api/expenses` - Create expense (protected)
- `PUT /api/expenses/:id` - Update expense (protected)
- `DELETE /api/expenses/:id` - Delete expense (protected)

### Analytics
- `GET /api/analytics/summary` - Get expense statistics (protected)

### Categories
- `GET /api/categories` - Get all categories

## DESIGN FEATURES

### Color Palette
- Primary: `hsl(173, 80%, 40%)` - Teal
- Accent: `hsl(173, 70%, 50%)` - Light Teal
- Background: `hsl(222, 47%, 11%)` - Dark Blue
- Card: `hsl(220, 20%, 14%)` - Dark Gray

### Key UI Elements
- Gradient buttons with hover effects
- Glassmorphism cards with backdrop blur
- Smooth transitions and animations
- Elegant shadows and glows
- Modern form inputs with focus states

## SECURITY FEATURES

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- Protected API routes with middleware
- User-specific data isolation
- Environment variable configuration
- Input validation and sanitization
- Secure HTTP headers with CORS

## FUTURE ENHANCEMENTS

- Data visualization with charts (pie, line, bar)
- Date range filters (weekly, monthly, yearly)
- Budget goals and spending alerts
- Export to CSV/PDF reports
- Search and advanced filtering
- Recurring expense tracking
- Multi-currency support
- Dark/Light mode toggle
- Email notifications
- Receipt image upload

## CONTRIBUTING

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## LICENSE

This project is open source and available under the MIT License.

## AUTHOR

**Naod Hunde**
- GitHub: [@naodhunde](https://github.com/naodhunde)
- Email: naodhunde@gmail.com

## ACKNOWLEDGMENTS

- Inspired by modern expense tracking applications
- Built as a portfolio project demonstrating full-stack MERN development
- Icons provided by [Lucide React](https://lucide.dev/)
- Color palette inspired by modern design trends

## SUPPORT

For support, email naodhunde@gmail.com or open an issue on GitHub.

If you found this project helpful, please give it a star! ⭐

---

This project demonstrates proficiency in:
- Full-stack JavaScript development
- RESTful API design
- Database modeling and management
- Authentication and security
- Modern React patterns
- Responsive UI design
- Git version control

Made with love by Naod Hunde ❤️
