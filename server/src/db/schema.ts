import { pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable('users', (t) => ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    email: varchar('email', { length: 254 }),
    username: varchar('username', { length: 256, }),
    name: varchar('name', { length: 256, }),
    password: varchar('password', { length: 256 }),
    avatar: varchar('avatar', { length: 256 }),
    bio: varchar('bio', { length: 256 }),
    createdAt: t.timestamp({ mode: "date" }).defaultNow(),
    updatedAt: t.timestamp({ mode: "date" }).defaultNow().$onUpdate(() => new Date),
}))

export type User = typeof usersTable.$inferSelect