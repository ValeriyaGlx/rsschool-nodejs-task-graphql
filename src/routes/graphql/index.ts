import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql } from 'graphql';
import { MyAppQueryRootType } from './query.js';
import { MyAppMutationRootType } from './mutation.js';


const plugin: FastifyPluginAsyncTypebox = async (fastify) => {

  const { prisma } = fastify;

  const schema = new GraphQLSchema({
    query: MyAppQueryRootType(prisma),
    mutation: MyAppMutationRootType(prisma),
  });


  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
    const { query, variables } = req.body;

      const res = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
        },
      });

      return {
       data: res.data,
       errors: res.errors,
      }
    },
  });
};

export default plugin;
