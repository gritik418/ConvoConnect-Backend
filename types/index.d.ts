declare enum Provider {
  credentials,
  google,
}

interface UserType {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  username: string;
  email_verified: boolean;
  is_active: boolean;
  avatar?: string;
  provider: Provider;
  password?: string;
  friends: string[];
  friend_requests: string[];
}

interface ChatType {
  is_group_chat: boolean;
  group_name?: string;
  group_icon?: string;
  admins: string[];
  members: string[];
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
