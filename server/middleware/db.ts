import { drizzle } from 'drizzle-orm/d1'
import { Context } from 'hono'

import * as schema from '../d1/schema'

export const dbMiddleware = async (c: Context, next: () => Promise<void>) => {
  const drizzleClient = drizzle(c.env.D1, { schema })
  c.set('drizzle', drizzleClient)
  await next()
}
