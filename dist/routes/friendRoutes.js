import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { getActiveFriends, sendFriendRequest, } from "../controllers/friendControllers.js";
const router = Router();
router.patch("/sendFriendRequest/:id", authenticate, sendFriendRequest);
router.get("/getActiveFriends", authenticate, getActiveFriends);
export default router;
