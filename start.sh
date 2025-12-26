#!/bin/bash

# GSNSD - Startup Script
echo "🎓 Starting GSNSD School Management System..."

# Ensure PostgreSQL is running
echo "📦 Checking PostgreSQL..."
sudo service postgresql start 2>/dev/null || true

# Start backend in background
echo "🚀 Starting Backend API on port 5000..."
cd /workspace/backend
npm start &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 2

# Start frontend
echo "🌐 Starting Frontend on port 5173..."
cd /workspace
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║     🎓 GSNSD System Running 🎓             ║"
echo "╠════════════════════════════════════════════╣"
echo "║  Frontend: http://localhost:5173           ║"
echo "║  Backend:  http://localhost:5000           ║"
echo "╠════════════════════════════════════════════╣"
echo "║  Login: mayare.mbaye@gsnsd.sn              ║"
echo "║  Password: 1234                            ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for user to stop
wait
