import { Hono } from "hono";
import { expeditionsController } from "../controller/expeditions.js";

const router = new Hono()

router.post("/create", expeditionsController.create)

export default router