import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Import routes
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import eleveRoutes from './routes/eleve.routes.js'
import enseignantRoutes from './routes/enseignant.routes.js'
import classeRoutes from './routes/classe.routes.js'
import noteRoutes from './routes/note.routes.js'
import presenceRoutes from './routes/presence.routes.js'
import paiementRoutes from './routes/paiement.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'GSNSD API is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/eleves', eleveRoutes)
app.use('/api/enseignants', enseignantRoutes)
app.use('/api/classes', classeRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/presences', presenceRoutes)
app.use('/api/paiements', paiementRoutes)
app.use('/api/dashboard', dashboardRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err)
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║     🎓 GSNSD API Server Started 🎓         ║
╠════════════════════════════════════════════╣
║  Port: ${PORT}                               ║
║  Mode: ${process.env.NODE_ENV || 'development'}                    ║
║  URL: http://localhost:${PORT}               ║
╚════════════════════════════════════════════╝
  `)
})

export default app
