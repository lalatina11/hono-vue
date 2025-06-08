import { eq } from "drizzle-orm"
import db from "../db/index.js"
import { expeditionsTable } from "../db/schema.js"

export const expeditionsRepo = {
    getExpById: async (id: number) => {
        const expedition = await db.select().from(expeditionsTable).where(eq(expeditionsTable.id, id))
        return expedition[0]
    }
}