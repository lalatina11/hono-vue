import { Hono } from "hono";
import { expeditionsController } from "../controller/expeditions.js";

const router = new Hono()

router.post("/", expeditionsController.create)
router.get("/", expeditionsController.read)
router.get("/single", expeditionsController.getExpById)
router.post("/update", expeditionsController.update)
router.post("/delete", expeditionsController.delete)

export default router