import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const LOCAL_DB_PATH = String(process.env.LOCAL_DB_PATH || '')

export default defineConfig(
  LOCAL_DB_PATH
    ? {
        // local mode: connect to sqlite file, without driver, just for studio
        out: './drizzle_migrations/d1',
        schema: './src/d1/schema/**.sql.ts',
        dialect: 'sqlite',
        dbCredentials: {
          url: LOCAL_DB_PATH,
        },
      }
    : {
        // remote mode: use d1-http driver
        out: './drizzle_migrations/d1',
        schema: './src/d1/schema/**.sql.ts',
        dialect: 'sqlite',
        driver: 'd1-http',
      },
)
