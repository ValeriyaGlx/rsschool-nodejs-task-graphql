import { Type } from '@fastify/type-provider-typebox';
import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { Context } from 'vm';
import { Profile, User } from '@prisma/client';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";

type PrismaType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>



export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  })
});

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType},
    memberTypeId: { type: GraphQLString },
    memberType: { 
      type: MemberType,
      resolve: async (source: Profile, _, { prisma }: Context) => {
          const { memberTypeId } = source;
          const profile = await (prisma as PrismaType).memberType.findUnique({ where: { id: memberTypeId } });
          return profile;
        },
    }
  }
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
      id: { type: UUIDType },
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      authorId: { type: UUIDType },
  }
});


export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => { return {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
    profile: { 
      type: ProfileType, 
      resolve: async (source: User, _, { prisma }: Context) => {
        const { id } = source;
        const profile = await (prisma as PrismaType).profile.findUnique({ where: { userId: id } });
        return profile;
      }
    },
    posts: { 
      type: new GraphQLList(PostType), 
      resolve: async (source: User, _, { prisma }: Context) => {
        const { id } = source;
        const posts = await (prisma as PrismaType).post.findMany({ where: { authorId: id } });
        return posts.length !== 0 ? posts : null;
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source: User, _, { prisma }: Context) => {
        const { id } = source;
        const subscribers = await (prisma as PrismaType).user.findMany({
        where: {
          subscribedToUser: {
            some: {
            subscriberId: id,
          },
        },
      },
    });

    return subscribers;
    },
  },
    subscribedToUser: {
      type:  new GraphQLList(UserType),
      resolve: async (source: User, _, { prisma }: Context) => {
        const { id } = source;
        const subscribedUsers = await (prisma as PrismaType).user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });

        return subscribedUsers;
      },
    }
    }
  }
});
