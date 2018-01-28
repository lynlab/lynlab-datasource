const express = require('express');
const graphqlHTTP = require('express-graphql');

const { resolver } = require('graphql-sequelize');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const { Post } = require('./models');


const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  },
});


// Resolver with pagination.
function paginationResolver(model, root, {
  after, before, first, last,
}) {
  const where = {};
  if (before) {
    where.id = { $lt: before.toString() };
  }
  if (after) {
    where.id = { $gt: after.toString() };
  }

  return model.findAll({ where, order: [['id', 'desc']], limit: last || first });
}


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      // List of posts (pagination available)
      posts: {
        type: new GraphQLList(postType),
        args: {
          before: { type: GraphQLInt },
          last: { type: GraphQLInt },
        },
        resolve: (_, args) => paginationResolver(Post, _, args),
      },

      // Single post
      post: {
        type: postType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: resolver(Post),
      },
    },
  }),
});

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: (process.env.NODE_ENV === 'development'),
}));
app.listen('8080');
