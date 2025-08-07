import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { anonymous, magicLink, openAPI } from 'better-auth/plugins'
import type { Context } from 'hono'

import { getDrizzleD1Client } from '~server/d1/getDrizzleD1Client'

import { betterAuthOptions } from './options'

export function getAuth(c: Context): ReturnType<typeof betterAuth> {
  return betterAuth({
    ...betterAuthOptions,
    secret: c.env.BETTER_AUTH_SECRET,
    baseURL: c.env.BETTER_AUTH_URL,
    plugins: [
      anonymous(),
      openAPI(),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          console.log(email, url)
        },
      }),
    ],
    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }) => {
        // Send verification email to user
        console.log(user, url, token)
      },
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 3600, // 1 hour
    },
    socialProviders: {
      google: {
        enabled: true,
        clientId: c.env.GOOGLE_CLIENT_ID!,
        clientSecret: c.env.GOOGLE_CLIENT_SECRET!,
      },
    },
    // TODO: https://www.better-auth.com/docs/concepts/database#implementation => KV
    // secondaryStorage:
    database: drizzleAdapter(getDrizzleD1Client(), {
      provider: 'sqlite',
      usePlural: true,
    }),
  })
}
