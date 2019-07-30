import 'package:flutter_app/data/remote/api.dart';
import 'package:flutter_app/domain/models/auth_state.dart';
import 'package:flutter_app/domain/repo/auth_repo.dart';
import 'package:graphql/client.dart';
import 'package:rx_shared_preference/rx_shared_preference.dart';
import 'package:rxdart/rxdart.dart';
import 'dart:convert';

class _LocalAuthData {
  final String token;
  final String userId;
  final int tokenExpiration;

  _LocalAuthData(this.token, this.userId, this.tokenExpiration);

  factory _LocalAuthData.fromJson(Map<String, dynamic> json) {
    return _LocalAuthData(
      json['token'],
      json['userId'],
      json['tokenExpiration'],
    );
  }

  AuthState toAuthState() {
    if (token == null || userId == null || tokenExpiration == null) {
      return const UnAuthenticatedState();
    }
    return AuthenticatedState(
      (b) => b
        ..token = token
        ..userId = userId
        ..tokenExpiration = tokenExpiration,
    );
  }
}

class AuthRepoImpl implements AuthRepo {
  static const _localAuthDataKey = 'com.hoc.flutter_app.auth';

  final RxSharedPreferences _rxPrefs;
  final ValueObservable<AuthState> _authState$;
  final Api _api;

  AuthRepoImpl(this._rxPrefs, this._api)
      : _authState$ = _rxPrefs
            .getStringObservable(_localAuthDataKey)
            .map(_toAuthState)
            .publishValue()
            .autoConnect()
              ..listen((state) => print('[AUTH_REPO] auth_state=$state'));

  @override
  ValueObservable<AuthState> get authState$ => _authState$;

  static AuthState _toAuthState(String jsonString) {
    final decoded = json.decode(jsonString ?? '{}');
    return _LocalAuthData.fromJson(decoded).toAuthState();
  }

  @override
  Future<bool> login(String email, String password) async {
    try {
      final options = QueryOptions(
        document: r'''
          query Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
          }
        ''',
        variables: {
          'email': email,
          'password': password,
        },
        errorPolicy: ErrorPolicy.all,
      );
      final data = await _api.queryUnauth(options);
      print('[AUTH_REPO] login data=$data');
      return _rxPrefs.setString(_localAuthDataKey, json.encode(data));
    } catch (e, s) {
      print('[AUTH_REPO] login $e, $s');
      return false;
    }
  }

  @override
  Future<bool> logout() => _rxPrefs.remove(_localAuthDataKey);

  @override
  Future<bool> register(String email, String password) async {
    try {
      final options = QueryOptions(
        document: r'''
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: { email: $email, password: $password }) {
              _id
              email
            }
          }
        ''',
        variables: {
          'email': email,
          'password': password,
        },
        errorPolicy: ErrorPolicy.all,
      );
      final data = await _api.queryUnauth(options);
      print('[AUTH_REPO] register data=$data');
      return true;
    } catch (e, s) {
      print('[AUTH_REPO] register $e, $s');
      return false;
    }
  }
}
