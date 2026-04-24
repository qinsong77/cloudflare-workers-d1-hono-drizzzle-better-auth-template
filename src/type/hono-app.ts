import type { RequestIdVariables } from 'hono/request-id'

import type { auth } from '../lib/better-auth'

type Variables = RequestIdVariables

export type AppType = {
  Bindings: Env // Env refer to wrangler.toml, worker-configuration.d.ts
  Variables: Variables
}

export type AuthedAppType = AppType & {
  Variables: Variables & {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}
