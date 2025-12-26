import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables
dotenv.config()

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

// Auto-initialize database on first run
import { query } from './config/database.js'
const initDbOnStartup = async () => {
  try {
    // Check if users table exists
    const result = await query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')")
    if (!result.rows[0].exists) {
      console.log('📦 First run detected, initializing database...')
      const { default: initDb } = await import('./config/initDb.js')
    }
  } catch (error) {
    console.log('⚠️ Database check failed, will try to initialize:', error.message)
  }
}
initDbOnStartup()

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false // Disable for development
}))
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from frontend build
const distPath = join(__dirname, '../../dist')
app.use(express.static(distPath))

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

// For SPA - serve index.html for non-API routes
app.get('*', (req, res, next) => {
  // If it's an API route, return 404 JSON
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ 
      success: false, 
      message: 'Route not found' 
    })
  }
  // Otherwise serve the SPA
  res.sendFile(join(__dirname, '../../dist/index.html'))
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

// Start server - listen on all interfaces (0.0.0.0) for remote access
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════╗
║     🎓 GSNSD API Server Started 🎓         ║
╠════════════════════════════════════════════╣
║  Port: ${PORT}                               ║
║  Mode: ${process.env.NODE_ENV || 'development'}                    ║
║  URL: http://0.0.0.0:${PORT}                 ║
╚════════════════════════════════════════════╝
  `)
})

export default app
