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
  trustedOrigins: [
    'http://localhost:8787',
    'sidekickapp://*',
    // below from: https://www.better-auth.com/docs/integrations/expo#development-mode
    // Development mode - Expo's exp:// scheme with local IP ranges
    ...(process.env.NODE_ENV === 'development'
      ? [
          'exp://*/*', // Trust all Expo development URLs
          'exp://10.0.0.*:*/*', // Trust 10.0.0.x IP range
          'exp://192.168.*.*:*/*', // Trust 192.168.x.x IP range
          'exp://172.*.*.*:*/*', // Trust 172.x.x.x IP range
          'exp://localhost:*/*', // Trust localhost
        ]
      : []),
  ],
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
