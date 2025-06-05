import type { Context } from "hono";
import db from "../db/index.js";
import { expeditionsTable, type Expeditions } from "../db/schema.js";
import { getCookie } from "hono/cookie";
import { adminRepository } from "../repository/admin.js";

export const expeditionsController = {
    create: async (c: Context) => {
        try {
            const { adminId } = await adminRepository.getAdminByToken(c)
            const { title, desc } = await c.req.json() as Expeditions
            if (title.trim().length < 1 || desc.trim().length < 1) {
                throw new Error("Fill in the fields!")
            }
            const newExpedition = await db.insert(expeditionsTable).values({ adminId: adminId, desc, title }).returning()
            return c.json(await newExpedition, { status: 201 })
        } catch (error) {
            return c.json({ error: (error as Error).message })
        }
    }
}