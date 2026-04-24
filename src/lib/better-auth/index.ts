import { expo } from '@better-auth/expo'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { anonymous, magicLink, openAPI } from 'better-auth/plugins'
import { env } from 'cloudflare:workers'

import { drizzleD1Client } from '~/d1/drizzleD1Client'

import { betterAuthOptions } from './options'

export const auth = betterAuth({
  ...betterAuthOptions,
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  plugins: [
    expo({
      // fix same issue: https://github.com/better-auth/better-auth/issues/5568
      disableOriginOverride: true,
    }),
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
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    },
  },
  // TODO: https://www.better-auth.com/docs/concepts/database#implementation => KV
  // secondaryStorage:
  database: drizzleAdapter(drizzleD1Client, {
    provider: 'sqlite',
    usePlural: true,
  }),
})
