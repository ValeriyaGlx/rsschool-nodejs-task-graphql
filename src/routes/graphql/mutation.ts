import { GraphQLObjectType, GraphQLString } from "graphql";
import { PrismaType } from "./types/prisma.js";
import { ChangePostInputType, ChangeProfileInputType, ChangeUserInputType, CreatePostInputType, CreateProfileInputType, CreateUserInputType, PostType, ProfileType, UserType } from "./schemas.js";
import { createUser, deleteUser, updateUser } from "../../models/user.js";
import { createPost, deletePost, updatePost } from "../../models/post.js";
import { createProfile, deleteProfile, updateProfile } from "../../models/profile.js";
import { Post, Profile, User } from "@prisma/client";
import { UUIDType } from "./types/uuid.js";

export const MyAppMutationRootType  = (prisma: PrismaType) => {
  return new GraphQLObjectType({ 
    name: 'RootMutationType',
    fields: {
      createUser: {
        type: UserType as GraphQLObjectType,
        args: { dto: { type: CreateUserInputType } },
        resolve: (_, { dto }: { dto: User }) => createUser(prisma, dto),
      },
      createPost: {
        type: PostType,
        args: { dto: { type: CreatePostInputType } },
        resolve: (_, { dto }: { dto: Post }) => createPost(prisma, dto),
      },
      createProfile: {
        type: ProfileType,
        args: { dto: { type: CreateProfileInputType } },
        resolve: (_, { dto }: { dto: Profile }) => createProfile(prisma, dto),
      },
      deleteUser: {
        type: GraphQLString,
        args: { id: { type: UUIDType } },
        resolve: async (_, { id }: { id: string }) => deleteUser(prisma, id),
      },
      deletePost: {
        type: GraphQLString,
        args: { id: { type: UUIDType } },
        resolve: async (_, { id }: { id: string }) => deletePost(prisma, id),
      },
      deleteProfile: {
        type: GraphQLString,
        args: { id: { type: UUIDType } },
        resolve: async (_, { id }: { id: string }) => deleteProfile(prisma, id),
      },
      changeUser: {
        type: UserType as GraphQLObjectType,
        args: { dto: { type: ChangeUserInputType }, id: { type: UUIDType } },
        resolve: (_, { dto, id }: { dto: User, id: string }) => updateUser(prisma, dto, id),
      },
      changePost: {
        type: PostType,
        args: { dto: { type: ChangePostInputType }, id: { type: UUIDType } },
        resolve: (_, { dto, id }: { dto: Post, id: string }) => updatePost(prisma, dto, id),
      },
      changeProfile: {
        type: ProfileType,
        args: { dto: { type: ChangeProfileInputType }, id: { type: UUIDType } },
        resolve: (_, { dto, id }: { dto: Profile, id: string }) => updateProfile(prisma, dto, id),
      },
      

    }
  });
};

