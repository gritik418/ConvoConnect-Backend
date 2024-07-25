import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  acceptFriendRequest,
  declineFriendRequest,
  getActiveFriends,
  getFriendRequests,
  getFriends,
  searchUsers,
  sendFriendRequest,
} from "../controllers/friendControllers.js";

const router = Router();

router.get("/", authenticate, getFriends);

router.get("/searchUser", authenticate, searchUsers);

router.get("/getFriendRequests", authenticate, getFriendRequests);

router.patch("/sendFriendRequest/:id", authenticate, sendFriendRequest);

router.patch("/acceptFriendRequest/:id", authenticate, acceptFriendRequest);

router.patch("/declineFriendRequest/:id", authenticate, declineFriendRequest);

router.get("/getActiveFriends", authenticate, getActiveFriends);

export default router;
