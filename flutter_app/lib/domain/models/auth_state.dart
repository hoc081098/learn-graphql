import 'package:built_value/built_value.dart';

part 'auth_state.g.dart';

abstract class AuthState {}

abstract class AuthenticatedState
    implements Built<AuthenticatedState, AuthenticatedStateBuilder>, AuthState {
  String get token;
  String get userId;
  int get tokenExpiration;

  AuthenticatedState._();

  factory AuthenticatedState([updates(AuthenticatedStateBuilder b)]) =
      _$AuthenticatedState;
}

class UnAuthenticatedState implements AuthState {
  const UnAuthenticatedState();
}
