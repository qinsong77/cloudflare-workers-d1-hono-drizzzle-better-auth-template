import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'

import { auth } from './lib/better-auth'
import books from './routes/books'
import user from './routes/user'
import { AppType } from './type/hono-app'

const app = new Hono<AppType>()

app.onError((err, c) => {
  console.error(`${err}`)
  if (err instanceof HTTPException) {
    return c.text(err.message, err.status)
  }
  return c.text('Internal Server Error', 500)
})

app.use('*', requestId())
app.use(contextStorage())

app.get('/', (c) => c.json('hello world'))
app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

app.use('/api/*', logger())

app.on(['GET', 'POST'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.basePath('/api').route('/user', user).route('/books', books)

export type AppClientType = typeof routes

export default app
