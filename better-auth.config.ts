/**
 * Better Auth CLI configuration file
 *
 * Docs: https://www.better-auth.com/docs/concepts/cli
 */
import { expo } from '@better-auth/expo'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { anonymous, magicLink, openAPI } from 'better-auth/plugins'
import { drizzle } from 'drizzle-orm/d1'

import { betterAuthOptions } from './src/lib/better-auth/options'

const mockDb = {} as D1Database

const db = drizzle(mockDb)

export const auth = betterAuth({
  // only user.additionalFields session.additionalFields ... will impact table schema, if no addition configuration, ignore the shared options
  ...betterAuthOptions,
  database: drizzleAdapter(db, { provider: 'sqlite', usePlural: true }),
  plugins: [
    expo(),
    anonymous(),
    openAPI(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log(email, url)
      },
    }),
  ],
})
