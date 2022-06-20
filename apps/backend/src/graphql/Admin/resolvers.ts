import type { Resolvers, Deliveryman } from '@generated/types';
import { JSONResolver } from 'graphql-scalars';
import { auth } from 'firebase-admin';
import { faker } from '@faker-js/faker';

export const resolvers: Resolvers = {
  JSON: JSONResolver,
  Query: {
    deliveryman: async (_, { id }) => {
      const deliveryman = (await auth().getUser(id)) as Deliveryman;
      return deliveryman;
    },
    deliverymens: async () => {
      const { users } = await auth().listUsers();
      const lists = users
        .map((user) => {
          const u = user.toJSON() as Deliveryman;
          return user?.customClaims?.userType === 'deliveryman' ? u : null;
        })
        .filter(Boolean);
      return lists;
    },
  },
  Mutation: {
    createDeliveryman: async (_, { input }) => {
      const { uid } = await auth().createUser({
        email: faker.internet.email(),
        emailVerified: faker.datatype.boolean(),
        phoneNumber: faker.phone.phoneNumber('+212#########'),
        password: 'secret',
        displayName: faker.name.findName(),
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: faker.datatype.boolean(),
      });

      await auth().setCustomUserClaims(uid, { userType: 'deliveryman' });

      const deliveryman = await auth().getUser(uid);

      return deliveryman.toJSON() as Deliveryman;
    },
    deleteDeliveryman: async (_, { id }) => {
      return auth()
        .deleteUser(id)
        .then(() => true)
        .catch(() => false);
    },
    updateDeliveryman: async (_, { id, input }) => {
      const updater = Object.keys(input).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = input[key];
        return acc;
      }, {});

      const deliveryman = await auth().updateUser(id, updater);
      return deliveryman.toJSON() as Deliveryman;
    },
    updateCustomClaims: async (_, { id, customClaims }) => {
      await auth().setCustomUserClaims(id, customClaims);
      return true;
    },
    bulkDeleteDeliverymans: async (_, { ids }) => {
      const deleted = await auth().deleteUsers(ids as string[]);
      return deleted.failureCount === 0;
    },
  },
};
