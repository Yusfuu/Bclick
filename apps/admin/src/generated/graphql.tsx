import { useQuery, UseQueryOptions } from 'react-query';
import { fetchData } from 'graphql/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Deliveryman = {
  __typename?: 'Deliveryman';
  customClaims?: Maybe<Scalars['JSON']>;
  disabled: Scalars['Boolean'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  metadata: Metadata;
  phoneNumber: Scalars['String'];
  photoURL: Scalars['String'];
  uid: Scalars['ID'];
};

export type DeliverymanInput = {
  disabled?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  photoURL?: InputMaybe<Scalars['String']>;
};

export type Error = {
  __typename?: 'Error';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  creationTime?: Maybe<Scalars['String']>;
  lastRefreshTime?: Maybe<Scalars['String']>;
  lastSignInTime?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bulkDeleteDeliverymans: Scalars['Boolean'];
  bulkDeleteUsers: Scalars['Boolean'];
  createDeliveryman: Deliveryman;
  createUser: User;
  deleteDeliveryman: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  updateCustomClaims: Scalars['Boolean'];
  updateDeliveryman: Deliveryman;
  updateUser: User;
};


export type MutationBulkDeleteDeliverymansArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationBulkDeleteUsersArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationCreateDeliverymanArgs = {
  input: DeliverymanInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteDeliverymanArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCustomClaimsArgs = {
  customClaims: Scalars['JSON'];
  id: Scalars['ID'];
};


export type MutationUpdateDeliverymanArgs = {
  id: Scalars['ID'];
  input: DeliverymanInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  deliveryman: Deliveryman;
  deliverymens: Array<Maybe<Deliveryman>>;
  user: User;
  users: Array<Maybe<User>>;
};


export type QueryDeliverymanArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  Deliveryman = 'DELIVERYMAN',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  customClaims?: Maybe<Scalars['JSON']>;
  disabled: Scalars['Boolean'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  metadata: Metadata;
  phoneNumber: Scalars['String'];
  photoURL?: Maybe<Scalars['String']>;
  uid: Scalars['ID'];
};

export type UserInput = {
  disabled?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  photoURL?: InputMaybe<Scalars['String']>;
};

export type DeliverymensQueryVariables = Exact<{ [key: string]: never; }>;


export type DeliverymensQuery = { __typename?: 'Query', deliverymens: Array<{ __typename?: 'Deliveryman', uid: string, email: string, emailVerified: boolean, displayName: string, photoURL: string, phoneNumber: string, disabled: boolean, customClaims?: any | null, metadata: { __typename?: 'Metadata', creationTime?: string | null, lastSignInTime?: string | null, lastRefreshTime?: string | null } } | null> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', uid: string, email: string, emailVerified: boolean, displayName: string, photoURL?: string | null, phoneNumber: string, disabled: boolean, metadata: { __typename?: 'Metadata', creationTime?: string | null, lastSignInTime?: string | null, lastRefreshTime?: string | null } } | null> };


export const DeliverymensDocument = `
    query Deliverymens {
  deliverymens {
    uid
    email
    emailVerified
    displayName
    photoURL
    phoneNumber
    disabled
    metadata {
      creationTime
      lastSignInTime
      lastRefreshTime
    }
    customClaims
  }
}
    `;
export const useDeliverymensQuery = <
      TData = DeliverymensQuery,
      TError = unknown
    >(
      variables?: DeliverymensQueryVariables,
      options?: UseQueryOptions<DeliverymensQuery, TError, TData>
    ) =>
    useQuery<DeliverymensQuery, TError, TData>(
      variables === undefined ? ['Deliverymens'] : ['Deliverymens', variables],
      fetchData<DeliverymensQuery, DeliverymensQueryVariables>(DeliverymensDocument, variables),
      options
    );

useDeliverymensQuery.getKey = (variables?: DeliverymensQueryVariables) => variables === undefined ? ['Deliverymens'] : ['Deliverymens', variables];
;

useDeliverymensQuery.fetcher = (variables?: DeliverymensQueryVariables, options?: RequestInit['headers']) => fetchData<DeliverymensQuery, DeliverymensQueryVariables>(DeliverymensDocument, variables, options);
export const UsersDocument = `
    query Users {
  users {
    uid
    email
    emailVerified
    displayName
    photoURL
    phoneNumber
    disabled
    metadata {
      creationTime
      lastSignInTime
      lastRefreshTime
    }
  }
}
    `;
export const useUsersQuery = <
      TData = UsersQuery,
      TError = unknown
    >(
      variables?: UsersQueryVariables,
      options?: UseQueryOptions<UsersQuery, TError, TData>
    ) =>
    useQuery<UsersQuery, TError, TData>(
      variables === undefined ? ['Users'] : ['Users', variables],
      fetchData<UsersQuery, UsersQueryVariables>(UsersDocument, variables),
      options
    );

useUsersQuery.getKey = (variables?: UsersQueryVariables) => variables === undefined ? ['Users'] : ['Users', variables];
;

useUsersQuery.fetcher = (variables?: UsersQueryVariables, options?: RequestInit['headers']) => fetchData<UsersQuery, UsersQueryVariables>(UsersDocument, variables, options);