import type { Resolvers, User } from '@generated/types';
import { auth, database, firestore } from 'firebase-admin';
import { faker } from '@faker-js/faker';

export const resolvers: Resolvers = {
  Query: {
    users: async () => {
      console.log('im here');
      const db = firestore();
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const doc = db.collection('users').doc('aturing');

      await doc.set(user);

      const { users } = await auth().listUsers();
      const lists = users
        .map((user) => {
          const u = user.toJSON() as User;
          return user?.customClaims?.userType === 'user' ? u : null;
        })
        .filter(Boolean);
      return lists;
    },
    user: async (_, { id }) => {
      const user = await auth().getUser(id);
      return user.toJSON() as User;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { uid } = await auth().createUser({
        email: faker.internet.email(),
        emailVerified: faker.datatype.boolean(),
        phoneNumber: faker.phone.phoneNumber('+212#########'),
        password: 'secret',
        displayName: faker.name.findName(),
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: faker.datatype.boolean(),
      });

      await auth().setCustomUserClaims(uid, { userType: 'user' });

      const user = await auth().getUser(uid);

      return user.toJSON() as User;
    },
    deleteUser: async (_, { id }) => {
      return auth()
        .deleteUser(id)
        .then(() => true)
        .catch(() => false);
    },
    updateUser: async (_, { id, input }) => {
      const updater = Object.keys(input).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = input[key];
        return acc;
      }, {});

      const deliveryman = await auth().updateUser(id, updater);
      return deliveryman.toJSON() as User;
    },
    bulkDeleteUsers: async (_, { ids }) => {
      const deleted = await auth().deleteUsers(ids as string[]);
      return deleted.failureCount === 0;
    },
  },
};
