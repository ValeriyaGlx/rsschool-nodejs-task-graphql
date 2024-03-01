import { GraphQLList, GraphQLObjectType } from "graphql";
import { MemberType, MemberTypeIdEnum, PostType, ProfileType, UserType } from "./schemas.js";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";
import { UUIDType } from "./types/uuid.js";
import { MemberTypeId } from "../member-types/schemas.js";
import { getAllUsers, getUser } from "../../models/user.js";
import { getAllProfiles, getProfile } from "../../models/profile.js";
import { getAllPosts, getPost } from "../../models/post.js";
import { getAllMembers, getMember } from "../../models/member.js";


export const MyAppQueryRootType = (prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {  
  return new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: () => getAllMembers(prisma),
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: () => getAllProfiles(prisma),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => getAllUsers(prisma),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve:  () => getAllPosts(prisma),
    },

    // TODO find bug
    memberType: {
      type: MemberType,
      args: {
        id: { type: MemberTypeIdEnum }
      },
      resolve: (_, { id }: { id: MemberTypeId }) => getMember(prisma, id)
    },
    post: {
      type: PostType,
      args: {
        id: { type: UUIDType }
      },
      resolve: (_, { id }: { id: string }) => getPost(prisma, id),
    },
    user: {
      type: UserType,
      args: {
        id: { type: UUIDType }
      },
      resolve: (_, { id }: { id: string }) => getUser(prisma, id),
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: UUIDType }
      },
      resolve: (_, { id }: { id: string }) => getProfile(prisma, id),
    },
}
})};
