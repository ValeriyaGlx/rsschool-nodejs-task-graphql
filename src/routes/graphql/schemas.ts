import { Type } from '@fastify/type-provider-typebox';
import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { Context } from 'vm';
import { Profile, User } from '@prisma/client';
import { loaderType } from './types/loader.js';

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
      resolve: async (source: Profile, _, { dataLoader }: Context) => {
          const { memberTypeId } = source;

          const profile = await (dataLoader as loaderType).profileMemberType.load(memberTypeId);
          return profile[0] || null;
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
    balance: { type: GraphQLFloat },
    profile: { 
      type: ProfileType, 
      resolve: async (source: User, _, { dataLoader }: Context) => {
        const { id } = source;
        const profile = await (dataLoader as loaderType).userProfiles.load(id);
        return profile[0] ? profile[0] : null;
      }
    },
    posts: { 
      type: new GraphQLList(PostType), 
      resolve: async (source: User, _, { dataLoader }: Context) => {
        const { id } = source;
        const posts = await (dataLoader as loaderType).userPosts.load(id);
        return posts;
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source: User, _, { dataLoader }: Context) => {
        const { id } = source;
        const subscribers = await (dataLoader as loaderType).userSubscription.load(id);

        return subscribers;
    },
  },
    subscribedToUser: {
      type:  new GraphQLList(UserType),
      resolve: async (source: User, _, { dataLoader }: Context) => {
        const { id } = source;
        const subscribedUsers = await (dataLoader as loaderType).userSubscribers.load(id);

        return subscribedUsers;
      },
    }
    }
  }
});

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    authorId: { type: UUIDType },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    userId: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLString },
  },
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLString },
  },
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

