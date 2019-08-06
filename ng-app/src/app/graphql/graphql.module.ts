import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { AuthService, AUTH_KEY } from '../auth/auth.service';

const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, authService: AuthService) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors.map(({ message }) => message).join('\n'));
    }
    if (networkError) {
      console.log(`Network error: ${networkError}`);
    }
  });

  const authLink = new ApolloLink((operation, forward) => {
    // Get the authentication token from local storage if it exists
    const token = authService.currentToken();
    console.log({ token });

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  const link = errorLink.concat(authLink.concat(httpLink.create({ uri })));

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all'
      },
      watchQuery: {
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService]
    }
  ]
})
export class GraphQLModule {}
