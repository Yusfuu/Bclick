import { env } from '@config/env';
import { createServer, context, middlewares, schema } from '@config/index';
import admin from 'firebase-admin';

// load environment variables from a .env file
import 'dotenv/config';

// replace with your own firebase service account
admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-adminsdk.json')),
  databaseURL: '',
  storageBucket: '',
});

const server = createServer({ schema, context, middlewares, port: env.port });

server.then(({ graphqlPath }) => {
  console.log(`🚀 Server ready at http://localhost:${env.port}${graphqlPath}`);
});
