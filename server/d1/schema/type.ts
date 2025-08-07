import { accounts, sessions, users, verifications } from './auth.sql'

export type User = typeof users.$inferSelect
export type Account = typeof accounts.$inferSelect
export type Session = typeof sessions.$inferSelect
export type Verification = typeof verifications.$inferSelect
