import 'dart:async';

import 'package:graphql/client.dart';

class Api {
  static const _url = 'http://localhost:3000/graphql';

  final GraphQLClient _authGraphQLClient;
  final GraphQLClient _unauthGraphQLClient;

  const Api._(this._authGraphQLClient, this._unauthGraphQLClient);

  factory Api(FutureOr<String> Function() getToken) {
    final Link httpLink = HttpLink(uri: _url);
    final Link authLink = AuthLink(getToken: getToken);
    final Link link = authLink.concat(httpLink);

    final authGraphQLClient = GraphQLClient(
      cache: InMemoryCache(),
      link: link,
    );

    final unauthGraphQLClient = GraphQLClient(
      cache: InMemoryCache(),
      link: httpLink,
    );

    return Api._(authGraphQLClient, unauthGraphQLClient);
  }

  Future<dynamic> _query(GraphQLClient client, QueryOptions options) async {
    final result = await client.query(options);
    if (result.hasErrors) {
      throw result.errors;
    }
    return result.data;
  }

  Future<dynamic> _mutate(GraphQLClient client, MutationOptions options) async {
    final result = await client.mutate(options);
    if (result.hasErrors) {
      throw result.errors;
    }
    return result.data;
  }

  Future<dynamic> queryAuth(QueryOptions options) {
    return _query(_authGraphQLClient, options);
  }

  Future<dynamic> queryUnauth(QueryOptions options) {
    return _query(_unauthGraphQLClient, options);
  }

  Future<dynamic> mutateAuth(MutationOptions options) {
    return _mutate(_authGraphQLClient, options);
  }

  Future<dynamic> mutateUnauth(MutationOptions options) {
    return _mutate(_unauthGraphQLClient, options);
  }
}
