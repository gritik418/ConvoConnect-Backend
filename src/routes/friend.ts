import express from "express";
import {
  acceptFriendRequest,
  declineFriendRequest,
  searchUsers,
  sendFriendRequest,
} from "../controllers/friend.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/search", authenticate, searchUsers);

router.patch("/request", authenticate, sendFriendRequest);

router.patch("/decline/:senderId", authenticate, declineFriendRequest);

router.patch("/accept/:senderId", authenticate, acceptFriendRequest);

export default router;
