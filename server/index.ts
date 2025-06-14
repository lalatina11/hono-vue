import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import expRouter from "./routers/expeditions.js"
import adminRouter from './routers/admin.js'
import { logger } from 'hono/logger'
import "dotenv/config"
import { cors } from 'hono/cors'
//! test comment
const app = new Hono()

app.use(logger())
app.use(cors({ origin: process.env.FRONTEND_URL || ["http://localhost:5173", "http://localhost:4173"], credentials: true }))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/exp", expRouter)
app.route("/api/admin", adminRouter)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
