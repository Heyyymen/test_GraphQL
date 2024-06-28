const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Schéma GraphQL pour 'hello'
const schema1 = buildSchema(`
  type Query {
    hello: String
    bonjour: String
  }
`);

// Schéma GraphQL pour 'ohayo'
const schema2 = buildSchema(`
  type Query {
    ohayo: String
  }
`);

// Résolveur pour le schéma combiné
const root = {
    hello: () => {
      return 'Hello, world!';
    },
    bonjour: () => {
      return 'bonjour, ça va?';
    },
  };

// Résolveur pour le schéma 'ohayo'
const root2 = {
  ohayo: () => {
    return 'おはようございます!';
  },
};

const app = express();

// Configuration de l'endpoint GraphQL pour 'hello'
app.use('/graphql/hello', graphqlHTTP({
  schema: schema1,
  rootValue: root,
  graphiql: true,
}));

// Configuration de l'endpoint GraphQL pour 'ohayo'
app.use('/graphql/ohayo', graphqlHTTP({
  schema: schema2,
  rootValue: root2,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Serveur GraphQL en cours d\'exécution sur http://localhost:4000/graphql');
  console.log('Endpoint pour hello: http://localhost:4000/graphql/hello');
  console.log('Endpoint pour ohayo: http://localhost:4000/graphql/ohayo');
});
