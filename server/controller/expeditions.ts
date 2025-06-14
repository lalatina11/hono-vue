import { eq } from "drizzle-orm";
import type { Context } from "hono";
import db from "../db/index.js";
import { expeditionsTable, type Expeditions } from "../db/schema.js";
import { adminRepository } from "../repository/admin.js";
import { expeditionsRepo } from "../repository/expeditions.js";

export const expeditionsController = {
    create: async (c: Context) => {
        try {
            const { adminId } = await adminRepository.getAdminByToken(c)
            const { title, desc } = await c.req.json() as Expeditions
            if (title.trim().length < 1 || desc.trim().length < 1) {
                throw new Error("Fill in the fields!")
            }
            const newExpedition = await db.insert(expeditionsTable).values({ adminId: adminId, desc, title }).returning()
            return c.json({ data: newExpedition[0] }, { status: 201 })
        } catch (error) {
            return c.json({ error: (error as Error).message }, 400)
        }
    },
    update: async (c: Context) => {
        try {
            const expId = await Number(c.req.query("id"))
            if (!expId || typeof expId !== "number") {
                throw new Error("Expedition ID are required!")
            }

            const { title, desc } = await c.req.json() as Expeditions
            if (title.trim().length < 1 || desc.trim().length < 1) {
                throw new Error("Fill in the fields!")
            }
            if (!expId || !+expId) throw new Error("Expedition ID are required!")
            const { adminId } = await adminRepository.getAdminByToken(c)
            const existingExpedition = await db.select().from(expeditionsTable).where(eq(expeditionsTable.id, +expId))

            if (!existingExpedition || !existingExpedition.length) throw new Error("expedition does not exist")

            const updatedExpedition = await db.update(expeditionsTable).set({
                title,
                desc,
                adminId
            })
                .where(eq(expeditionsTable.id, +expId))
                .returning()
            const data = updatedExpedition[0]
            return c.json({ data }, { status: 201 })
        } catch (error) {
            return c.json({ error: (error as Error).message }, 400)
        }
    },
    read: async (c: Context) => {
        try {
            const expeditions = (await db.select().from(expeditionsTable)).sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
            return c.json({ data: expeditions }, { status: 201 })
        } catch (error) {
            return c.json({ error: (error as Error).message }, 400)
        }
    },
    delete: async (c: Context) => {
        try {
            const id = await Number(c.req.query("id"))
            if (!id || typeof id !== "number") {
                throw new Error("Expedition ID are required!")
            }
            const getExp = await expeditionsRepo.getExpById(id)
            if (!getExp) throw new Error(`Expedition with ID ${id} does not exist`)
            await db.delete(expeditionsTable).where(eq(expeditionsTable.id, id))
            return c.json({ message: "OK", error: false }, 203)
        } catch (error) {
            return c.json({ error: (error as Error).message }, 400)
        }

    },
    getExpById: async (c: Context) => {
        try {
            const id = await Number(c.req.query("id"))
            if (!id || typeof id !== "number") {
                throw new Error("Expedition ID are required!")
            }
            const getExp = await expeditionsRepo.getExpById(id)
            if (!getExp) throw new Error(`Expedition with ID ${id} does not exist`)
            return c.json({ data: getExp }, { status: 200 })
        } catch (error) {
            return c.json({ error: (error as Error).message }, 400)
        }
    }
}