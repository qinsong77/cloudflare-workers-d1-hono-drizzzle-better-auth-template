import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'

import { getAuth } from './lib/better-auth'
import { dbMiddleware } from './middleware/db'
import authors from './routes/authors'
import books from './routes/books'

const app = new Hono()

app.onError((err, c) => {
  console.error(`${err}`)
  if (err instanceof HTTPException) {
    return c.text(err.message, err.status)
  }
  return c.text('Internal Server Error', 500)
})

app.use('*', requestId())
app.use(contextStorage())
app.use(dbMiddleware)

app.get('/', (c) => {
  return c.text('Hello World!')
})

app.use('/api/*', logger())

app.on(['GET', 'POST'], '/api/auth/*', (c) => {
  return getAuth(c).handler(c.req.raw)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .basePath('/api')
  .route('/authors', authors)
  .route('/books', books)

export type AppClientType = typeof routes

export default app
