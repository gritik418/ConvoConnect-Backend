import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import { acceptFriendRequest, getActiveFriends, getFriendRequests, sendFriendRequest, } from "../controllers/friendControllers.js";
const router = Router();
router.get("/getFriendRequests", authenticate, getFriendRequests);
router.patch("/sendFriendRequest/:id", authenticate, sendFriendRequest);
router.patch("/acceptFriendRequest/:id", authenticate, acceptFriendRequest);
router.get("/getActiveFriends", authenticate, getActiveFriends);
export default router;
