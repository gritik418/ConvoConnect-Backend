import User from "../models/User.js";
export const sendFriendRequest = async (req, res) => {
    try {
        const user = req.params.user;
        const friendId = req.params.id;
        const friend = await User.findById(friendId).select({ _id: 1 });
        if (!friend)
            return res
                .status(400)
                .json({ success: false, message: "User not found." });
        await User.findByIdAndUpdate(friendId, {
            $push: {
                friend_requests: user._id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Friend Request Sent.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export const acceptFriendRequest = async (req, res) => {
    try {
        const user = req.params.user;
        const friendId = req.params.id;
        return res.status(200).json({
            success: true,
            message: "Friend Request Sent.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
export const getActiveFriends = async (req, res) => {
    try {
        const user = req.params.user;
        const friends = await User.findById(user?._id.toString())
            .select({ friends: 1 })
            .populate("friends")
            .where({ is_active: true });
        console.log(friends);
        return res.json({ friends });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error.",
        });
    }
};
