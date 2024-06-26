// app.js
const express = require('express');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);


module.exports = app;
