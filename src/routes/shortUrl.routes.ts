import { Router } from "express";

//Controllers
import { shortUrl, shortUrlCounter, verifyUrl } from "../controllers/shortUrl.controller";

const router = Router();

router.post("/shorturl", shortUrl);
router.get("/urlshortcount", shortUrlCounter)
router.post("/verify", verifyUrl);

export default router;