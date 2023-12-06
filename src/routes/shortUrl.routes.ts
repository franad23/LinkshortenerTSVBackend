import { Router } from "express";

//Controllers
import { shortUrl, shortUrlCounter } from "../controllers/shortUrl.controller";

const router = Router();

router.post("/shortUrl", shortUrl);
router.get("/urlshortcount", shortUrlCounter)

export default router;