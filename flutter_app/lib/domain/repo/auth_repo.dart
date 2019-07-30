import 'package:flutter_app/domain/models/auth_state.dart';
import 'package:rxdart/rxdart.dart';

abstract class AuthRepo {
  ValueObservable<AuthState> get authState$;

  Future<bool> login(String email, String password);

  Future<bool> register(String email, String password);

  Future<bool> logout();
}
