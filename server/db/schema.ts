import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const adminTable = pgTable('admin', (t) => ({
    id: uuid().notNull().primaryKey().defaultRandom(),
    username: varchar('username', { length: 256, }).notNull(),
    name: varchar('name', { length: 256, }).notNull(),
    password: varchar('password', { length: 256 }).notNull(),
    avatar: varchar('avatar', { length: 256 }),
    createdAt: t.timestamp({ mode: "date" }).defaultNow(),
    updatedAt: t.timestamp({ mode: "date" }).defaultNow().$onUpdate(() => new Date),
}))

export const expeditionsTable = pgTable('expeditions', (t) => ({
    id: integer().notNull().primaryKey().generatedAlwaysAsIdentity(),
    resi: varchar('resi', { length: 255 }).notNull().unique().$defaultFn(() => createId()),
    adminId: uuid().notNull().references(() => adminTable.id),
    title: varchar().notNull(),
    desc: varchar().notNull(),
    createdAt: t.timestamp({ mode: "date" }).defaultNow(),
    updatedAt: t.timestamp({ mode: "date" }).defaultNow().$onUpdate(() => new Date),
}))


export type Admin = typeof adminTable.$inferSelect
export type Expeditions = typeof expeditionsTable.$inferSelect