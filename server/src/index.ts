import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import expRouter from "./routers/expeditions.js"

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/exp", expRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
