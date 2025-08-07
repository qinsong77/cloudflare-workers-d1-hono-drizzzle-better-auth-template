import { BetterAuthOptions } from 'better-auth'

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const betterAuthOptions: BetterAuthOptions = {
  /**
   * The name of the application.
   */
  appName: 'app-name',
  /**
   * Base path for Better Auth.
   * @default "/api/auth"
   */
  // basePath: '/api',
  trustedOrigins: ['http://localhost:8787'],
  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: 'lax',
      partitioned: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
}
