-- Initial database schema for Financial Management System

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS financial_insights (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    insight_type VARCHAR(100),
    content TEXT,
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add more tables as needed