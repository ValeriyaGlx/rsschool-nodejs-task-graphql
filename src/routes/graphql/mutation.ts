import { GraphQLObjectType } from "graphql";
import { PrismaType } from "./types/prisma.js";
import { CreatePostInputType, CreateProfileInputType, CreateUserInputType, PostType, ProfileType, UserType } from "./schemas.js";
import { createUser } from "../../models/user.js";
import { createPost } from "../../models/post.js";
import { createProfile } from "../../models/profile.js";
import { Post, Profile, User } from "@prisma/client";

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
      }

    }
  });
};

