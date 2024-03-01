import { Type } from '@fastify/type-provider-typebox';
import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { MemberTypeId } from '../member-types/schemas.js';
import { UUIDType } from './types/uuid.js';

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

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberId',
  values: {
    BASIC: {value: MemberTypeId.BASIC},
    BUSINESS: {value: MemberTypeId.BUSINESS}
  }
});

export const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberTypeIdEnum },
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
    memberTypeId: { type: GraphQLString }
  }
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt }
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

