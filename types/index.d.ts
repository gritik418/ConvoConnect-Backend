declare enum Provider {
  credentials,
  google,
}

interface UserType {
  _id: string;
  first_name: string;
  last_name?: string;
  email: string;
  username: string;
  email_verified: boolean;
  is_active: boolean;
  avatar?: string;
  background?: string;
  provider: Provider;
  password?: string;
  friends: string[];
  friend_requests: string[];
}

type ChatMemberType = {
  _id: string;
  first_name: string;
  last_name: ?string;
  avatar: ?string;
  username: string;
  bio: ?string;
  background?: string;
};

type ChatAdminType = {
  _id: string;
  first_name: string;
  last_name: ?string;
  avatar: ?string;
  username: string;
  background?: string;
};

interface ChatType {
  _id: string;
  is_group_chat: boolean;
  group_name?: string;
  group_icon?: string;
  admins: ChatAdminType[] | [];
  members: ChatMemberType[];
  last_message?: string;
}

interface MessageType {
  chat_id: string;
  content: string;
  sender: string;
  attachment: any;
}

interface JWTPayloadType {
  id: string;
  email: string;
}

type EmailVerificationDataType = {
  user_id: string;
  secret_token: string;
};
