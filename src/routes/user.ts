import { Hono } from 'hono'

import { drizzleD1Client } from '~/d1/drizzleD1Client'

const app = new Hono()
  .get('/', async (c) => {
    const user = await drizzleD1Client.query.users.findFirst()
    console.log('user', user)
    if (!user) {
      return c.json('No user found')
    }
    return c.json(user)
  })
  .post('/', (c) => c.json('create an author', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
