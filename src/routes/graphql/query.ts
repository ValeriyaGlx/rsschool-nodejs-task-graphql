import { GraphQLList, GraphQLObjectType } from "graphql";
import { MemberType, MemberTypeId, PostType, ProfileType, UserType } from "./schemas.js";
import { UUIDType } from "./types/uuid.js";
import { getAllUsers, getUser } from "../../models/user.js";
import { getAllProfiles, getProfile } from "../../models/profile.js";
import { getAllPosts, getPost } from "../../models/post.js";
import { getAllMembers, getMember } from "../../models/member.js";
import { PrismaType } from "./types/prisma.js";


export const MyAppQueryRootType = (prisma: PrismaType) => {  
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
    memberType: {
      type: MemberType,
      args: {
        id: { type: MemberTypeId }
      },
      resolve: (_, { id }: { id: string }) => getMember(prisma, id)
    },
    post: {
      type: PostType,
      args: {
        id: { type: UUIDType }
      },
      resolve: (_, { id }: { id: string }) => getPost(prisma, id),
    },
    user: {
      type: UserType as GraphQLObjectType,
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
