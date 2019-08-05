import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors.map(({ message }) => message).join('\n'));
    }
    if (networkError) {
      console.log(`Network error: ${networkError}`);
    }
  });

  const link = errorLink.concat(httpLink.create({ uri }));

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
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
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
