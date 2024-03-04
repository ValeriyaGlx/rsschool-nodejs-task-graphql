import { MemberType, Post, Profile, User } from "@prisma/client";
import DataLoader from "dataloader";

export type loaderType = {
  userProfiles: DataLoader<string, Post[]>,
  userPosts: DataLoader<string, Profile[]>,
  profileMemberType: DataLoader<string, MemberType[]>,
  userSubscribers: DataLoader<string, User[]>,
  userSubscription: DataLoader<string, User[]>,
}
