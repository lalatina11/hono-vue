import type { Context } from "hono";
import db from "../db/index.js";
import { expeditionsTable, type Expeditions } from "../db/schema.js";
import { getCookie } from "hono/cookie";

export const expeditionsController = {
    create: async (c: Context) => {
        try {
            const token = await getCookie(c, 'admin_token') as string
            const { title, desc } = await c.req.json() as Expeditions
            const newExpedition = await db.insert(expeditionsTable).values({ adminId: token, desc, title }).returning()
            return c.json(await newExpedition, { status: 201 })

        } catch (error) {
            return c.json({ error: (error as Error).message })
        }
    }
}