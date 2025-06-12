import { Hono } from "hono";
import { adminController } from "../controller/admin.js";

const router = new Hono()

router.post("/request-add", adminController.requestAddAdmin)
router.post("/request-add/logout", adminController.logoutReqAdmin)
router.get("/request-add", adminController.getAdminAuthority)
router.post("/create", adminController.create)
router.post("/login", adminController.login)
router.get("/current-admin", adminController.getLoggedAdmin)
router.post("/logout", adminController.logout)

export default router