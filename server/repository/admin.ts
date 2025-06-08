import { getCookie } from "hono/cookie"
import * as jwt from "jsonwebtoken"
import { type JwtPayload } from "jsonwebtoken"
import db from "../db/index.js"
import { adminTable } from "../db/schema.js"
import type { Context } from "hono"
import { eq } from "drizzle-orm"

export const adminRepository = {
    getAdminByToken: async (c: Context) => {
        const token = await getCookie(c, "admin_token")
        if (!token) throw new Error("Token are required!")
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY || "") as JwtPayload
        const adminId = verifyToken?.id
        const existingAdmin = await db.select().from(adminTable).where(eq(adminTable.id, adminId))
        if (!existingAdmin || !existingAdmin.length) throw new Error("Akun admin tidak dikenali")

        return { adminId, adminData: existingAdmin[0] }
    }
}