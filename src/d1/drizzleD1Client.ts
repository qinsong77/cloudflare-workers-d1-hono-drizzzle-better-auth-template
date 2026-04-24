import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/d1'

import * as schema from './schemas'

export const drizzleD1Client = drizzle(env.D1, {
  schema,
  logger: true,
})
