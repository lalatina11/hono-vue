import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import "dotenv/config"
import { adminTable, type Admin } from "../db/schema.js";
import db from "../db/index.js";
import { eq } from "drizzle-orm";
import { compareSync, hashSync } from "bcrypt-ts";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { adminRepository } from "../repository/admin.js";

export const adminController = {
    create: async (c: Context) => {
        try {
            const adminPermit = await getCookie(c, "admin_permit")
            if (adminPermit !== "OK_Jalan" || !adminPermit) throw new Error("Invalid Permit")
            const { username, name, password: inputPassword } = await c.req.json() as Admin
            if (username.trim().length < 1 || name.trim().length < 1 || inputPassword.trim().length < 1) {
                throw new Error("Semua field wajib diisi")
            }
            const password = hashSync(inputPassword, 12)
            await db.insert(adminTable).values({ username, password, name })
            return c.json({ message: "OK", error: false }, 201)
        } catch (error) {
            return c.json({ message: (error as Error).message, error: true }, 201)

        }
    },
    requestAddAdmin: async (c: Context) => {
        try {
            const { password } = await c.req.json()
            if (password !== "candraganteng") {
                return c.json({ message: "OK", error: false, invalidPassword: true }, 200)
            }
            await setCookie(c, "admin_permit", "OK_Jalan", { path: "/", httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24, secure: process.env.NODE_ENV === "production" })
            return c.json({ message: "OK", error: false }, 200)
        } catch (error) {
            return c.json({ message: (error as Error).message, error: true }, 400)

        }
    },
    login: async (c: Context) => {
        try {
            const { username, password } = await c.req.json() as Admin
            const existingAdmin = await db.select().from(adminTable).where(eq(adminTable.username, username))
            if (!existingAdmin.length) throw new Error("Admin does not exist")
            const passwordFromDb = existingAdmin[0].password
            const validPassword = compareSync(password, passwordFromDb)
            if (!validPassword) throw new Error("Password tidak valid")
            const token = jwt.sign({ id: existingAdmin[0].id }, process.env.SECRET_KEY || "", { expiresIn: "1w" })
            await setCookie(c, "admin_token", token, { path: "/", httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7, secure: process.env.NODE_ENV === "production" })
            return c.json({ message: "OK", error: true }, 400)
        } catch (error) {
            return c.json({ message: (error as Error).message, error: true }, 400)
        }
    },
    getLoggedAdmin: async (c: Context) => {
        try {
            if (await getCookie(c, "admin_permit")) {
                deleteCookie(c, "admin_permit")
            }
            const { adminData } = await adminRepository.getAdminByToken(c)
            const { password, ...adminDataWithoutPassword } = adminData
            return c.json({ message: "OK", data: adminDataWithoutPassword, error: false }, 200)
        } catch (error) {
            return c.json({ message: (error as Error).message, data: null, error: true }, 400)

        }
    },
    logout: async (c: Context) => {
        if (await getCookie(c, "admin_permit")) {
            deleteCookie(c, "admin_permit")
        }
        await deleteCookie(c, "admin_token")
        return c.json({ message: "ok" }, 200)
    }
}