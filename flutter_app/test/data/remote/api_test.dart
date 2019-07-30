import 'package:flutter_app/data/remote/api.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:graphql/client.dart';

main() {
  group('Test $Api', () {
    final api = Api(() => '');

    test('Login', () async {
      try {
        final options = QueryOptions(
          document: r'''
            query CreateUser($email: String!, $password: String!) {
              createUser(email: $email, password: $password) {
                userId
                token
                tokenExpiration
              }
            }
          ''',
          variables: {
            'email': 'hoc081098@gmail.com',
            'password': '123456@@',
          },
          errorPolicy: ErrorPolicy.all,
        );
        print(await api.queryUnauth(options));
      } catch (e) {
        print(e);
      }
      print('Done');
    });
  });
}
