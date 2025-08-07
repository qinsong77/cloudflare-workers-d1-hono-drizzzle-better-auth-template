import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle_migrations/d1',
  schema: './server/d1/schema/**.sql.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
})
