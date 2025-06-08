import type { Context, Next } from "hono";
import { adminRepository } from "../repository/admin.js";

const authMiddleware = async (c: Context, next: Next) => {
    try {
        const { adminData, adminId } = await adminRepository.getAdminByToken(c)
        if (adminData && adminId) {
            (c.req as any).adminId = () => adminId
                (c.req as any).adminData = () => adminData
        } else {
            throw new Error("Not authorized!")
        }
    } catch (error) {
        return c.json({ message: (error as Error).message, error: true }, 400)
    } finally {
        await next()
    }
}

export default authMiddleware