const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
  {
    id: 1,
    book: {
      id: 1,
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    }
  },
  {
    id: 2,
    book: {
      id: 2,
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    }
  },
  {
    id: 3,
    book: {
      id: 3,
      title: 'Documentary',
      author: 'Me',
    }
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [BookType] }

  type Book {
    id: ID
    title: String,
    author: String
  }
  type Fantasy {
    id: ID
    book: Book
  }
  type SciFi {
    id: ID
    book: Book
  }
  type Documentary {
    id: ID
    book: Book
  }
  union BookType = Fantasy | SciFi | Documentary
`;

// The resolvers
const resolvers = {
  BookType: {
    __resolveType(obj, context, info) {
        if (obj.book.title === 'Jurassic Park') {
          return 'SciFi'
        } else if (obj.book.title === 'Documentary') {
          return 'Documentary'
        } else {
          return 'Fantasy'
        }
    }
  },
  Query: { books: () => {
      console.log('requested to the network')
      return books
   }},
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});