const express = require('express');
const compression = require('compression');
const cors = require('cors');
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

const { Post, PostCategory, PostSeries } = require('./models');


// Type definitions.
const postCategoryType = new GraphQLObjectType({
  name: 'PostCategory',
  description: 'A category of posts',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
  },
});

const postSeriesType = new GraphQLObjectType({
  name: 'PostSeries',
  description: 'A series of posts',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
  },
});

const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    summary: { type: GraphQLString },
    body: { type: GraphQLString },
    postCategory: {
      type: postCategoryType,
      resolve: post => PostCategory.findOne({ where: { id: post.postCategoryId } }),
    },
    postSeries: {
      type: postSeriesType,
      resolve: post => PostSeries.findOne({ where: { id: post.postSeriesId } }),
    },
    hitCount: { type: GraphQLInt },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  },
});

const mutationResultType = new GraphQLObjectType({
  name: 'MutationResult',
  description: 'A result of mutation',
  fields: { result: { type: GraphQLString } },
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
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      addPostHitCount: {
        type: mutationResultType,
        args: { postId: { type: new GraphQLNonNull(GraphQLInt) } },
        resolve: (_, args) => {
          Post.findOne({ where: { id: args.postId } }).then((post) => {
            post.hitCount += 1;
            post.save();
          });
          return { result: 'success' };
        },
      },
    },
  }),
});

const app = express();
app.use(compression());
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: (process.env.NODE_ENV === 'development'),
}));
app.listen('8080');
