import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import expRouter from "./routers/expeditions.js"
import adminRouter from './routers/admin.js'
import { logger } from 'hono/logger'
import "dotenv/config"
const app = new Hono()

app.use(logger())

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
