import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  tokenPrice?: Maybe<TokenPrice>;
  tokenPriceSig?: Maybe<TokenPriceSigData>;
};

export type QueryTokenPriceArgs = {
  chainId: Scalars['Int'];
  token?: InputMaybe<Scalars['String']>;
};

export type QueryTokenPriceSigArgs = {
  chainId: Scalars['Int'];
  token?: InputMaybe<Scalars['String']>;
};

export type TokenPrice = {
  __typename?: 'TokenPrice';
  decimals?: Maybe<Scalars['Int']>;
  tokenAddress?: Maybe<Scalars['String']>;
  tokenPrice?: Maybe<Scalars['String']>;
};

export type TokenPriceSigData = {
  __typename?: 'TokenPriceSigData';
  sig?: Maybe<Scalars['String']>;
  tokenAddress?: Maybe<Scalars['String']>;
  tokenPrice?: Maybe<Scalars['String']>;
  validUntil?: Maybe<Scalars['DateTime']>;
};

export type TokenPriceQueryVariables = Exact<{
  chainId: Scalars['Int'];
  token?: InputMaybe<Scalars['String']>;
}>;

export type TokenPriceQuery = {
  __typename?: 'Query';
  tokenPrice?: {
    __typename?: 'TokenPrice';
    tokenAddress?: string | null;
    tokenPrice?: string | null;
    decimals?: number | null;
  } | null;
};

export type TokenPriceSigQueryVariables = Exact<{
  chainId: Scalars['Int'];
  token?: InputMaybe<Scalars['String']>;
}>;

export type TokenPriceSigQuery = {
  __typename?: 'Query';
  tokenPriceSig?: {
    __typename?: 'TokenPriceSigData';
    tokenAddress?: string | null;
    tokenPrice?: string | null;
    validUntil?: any | null;
    sig?: string | null;
  } | null;
};

export const TokenPriceDocument = gql`
  query tokenPrice($chainId: Int!, $token: String) {
    tokenPrice(chainId: $chainId, token: $token) {
      tokenAddress
      tokenPrice
      decimals
    }
  }
`;

/**
 * __useTokenPriceQuery__
 *
 * To run a query within a React component, call `useTokenPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useTokenPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTokenPriceQuery({
 *   variables: {
 *      chainId: // value for 'chainId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useTokenPriceQuery(
  baseOptions: Apollo.QueryHookOptions<
    TokenPriceQuery,
    TokenPriceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TokenPriceQuery, TokenPriceQueryVariables>(
    TokenPriceDocument,
    options,
  );
}
export function useTokenPriceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TokenPriceQuery,
    TokenPriceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TokenPriceQuery, TokenPriceQueryVariables>(
    TokenPriceDocument,
    options,
  );
}
export type TokenPriceQueryHookResult = ReturnType<typeof useTokenPriceQuery>;
export type TokenPriceLazyQueryHookResult = ReturnType<
  typeof useTokenPriceLazyQuery
>;
export type TokenPriceQueryResult = Apollo.QueryResult<
  TokenPriceQuery,
  TokenPriceQueryVariables
>;
export const TokenPriceSigDocument = gql`
  query tokenPriceSig($chainId: Int!, $token: String) {
    tokenPriceSig(chainId: $chainId, token: $token) {
      tokenAddress
      tokenPrice
      validUntil
      sig
    }
  }
`;

/**
 * __useTokenPriceSigQuery__
 *
 * To run a query within a React component, call `useTokenPriceSigQuery` and pass it any options that fit your needs.
 * When your component renders, `useTokenPriceSigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTokenPriceSigQuery({
 *   variables: {
 *      chainId: // value for 'chainId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useTokenPriceSigQuery(
  baseOptions: Apollo.QueryHookOptions<
    TokenPriceSigQuery,
    TokenPriceSigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TokenPriceSigQuery, TokenPriceSigQueryVariables>(
    TokenPriceSigDocument,
    options,
  );
}
export function useTokenPriceSigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TokenPriceSigQuery,
    TokenPriceSigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TokenPriceSigQuery, TokenPriceSigQueryVariables>(
    TokenPriceSigDocument,
    options,
  );
}
export type TokenPriceSigQueryHookResult = ReturnType<
  typeof useTokenPriceSigQuery
>;
export type TokenPriceSigLazyQueryHookResult = ReturnType<
  typeof useTokenPriceSigLazyQuery
>;
export type TokenPriceSigQueryResult = Apollo.QueryResult<
  TokenPriceSigQuery,
  TokenPriceSigQueryVariables
>;
