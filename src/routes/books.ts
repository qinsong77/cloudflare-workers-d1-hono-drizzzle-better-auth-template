import { Hono } from 'hono'

import { authMiddleware } from '~/middleware/auth'
import { AuthedAppType } from '~/type/hono-app'

const app = new Hono<AuthedAppType>()
  .use('*', authMiddleware)
  .get('/', (c) => c.json('list books'))
  .post('/', (c) => c.json('create a book', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
