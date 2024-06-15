export type MemberType = {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  isActive: boolean;
};

export type ChatType = {
  admins: [];
  createdAt: string;
  isGroupChat: false;

  members: MemberType[];
  updatedAt: string;
  __v: number;
  _id: string;
  groupName: string | null;
  groupIcon: string | null;
  lastMessage: string | null;
};

export type UserDataType = {
  _id: string;
  name: string;
  username: string;
  isActive: boolean;
  email: string;
  avatar: string;
  friends: string[];
  requests: RequestType[];
};
