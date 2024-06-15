export const activeUser = async ({ friends, id, }) => {
    socket.join(id);
    await User.findByIdAndUpdate(id, { $set: { isActive: true } });
    if (!friends)
        return;
    friends.forEach((friend) => {
        socket.to(friend).emit(USER_ONLINE, { id: id });
    });
};
