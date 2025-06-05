import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import expRouter from "./routers/expeditions.js"
import adminRouter from './routers/admin.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/exp", expRouter)
app.route("/api/admin", adminRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
