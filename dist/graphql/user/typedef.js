const typedef = `#graphql
    type User {
        id: String
        first_name: String
        last_name: String
        email: String
        username: String
        email_verified: Boolean
        avatar: String
        provider: String
        is_active: Boolean
        friends: [String]
        friend_requests: [User]
    }
`;
export default typedef;
