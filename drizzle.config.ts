import './envConfig'
import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema.ts',
  dialect: 'postgresql',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
    url: process.env.POSTGRES_URL!
  }
} satisfies Config
