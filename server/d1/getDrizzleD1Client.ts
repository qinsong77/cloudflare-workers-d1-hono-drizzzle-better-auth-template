import { getContext } from 'hono/context-storage'

import type { AppType } from '~server/type/hono-app'

export const getDrizzleD1Client = () => {
  return getContext<AppType>().var.drizzle
}
