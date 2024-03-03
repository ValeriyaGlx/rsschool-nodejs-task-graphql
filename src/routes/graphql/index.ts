import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import depthLimit from 'graphql-depth-limit';
import { validate } from 'graphql/validation/index.js';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse, Source } from 'graphql';
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
    async handler(req, res) {
    const { query, variables } = req.body;

    const errors = validate(schema, parse(new Source(query)), [depthLimit(5)]);
    
    if (errors.length) await res.send({ data: null, errors });


      const response = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma,
        },
      });

      return {
       data: response.data,
       errors: response.errors,
      }
    },
  });
};

export default plugin;
