// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_state.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AuthenticatedState extends AuthenticatedState {
  @override
  final String token;
  @override
  final String userId;
  @override
  final int tokenExpiration;

  factory _$AuthenticatedState(
          [void Function(AuthenticatedStateBuilder) updates]) =>
      (new AuthenticatedStateBuilder()..update(updates)).build();

  _$AuthenticatedState._({this.token, this.userId, this.tokenExpiration})
      : super._() {
    if (token == null) {
      throw new BuiltValueNullFieldError('AuthenticatedState', 'token');
    }
    if (userId == null) {
      throw new BuiltValueNullFieldError('AuthenticatedState', 'userId');
    }
    if (tokenExpiration == null) {
      throw new BuiltValueNullFieldError(
          'AuthenticatedState', 'tokenExpiration');
    }
  }

  @override
  AuthenticatedState rebuild(
          void Function(AuthenticatedStateBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthenticatedStateBuilder toBuilder() =>
      new AuthenticatedStateBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthenticatedState &&
        token == other.token &&
        userId == other.userId &&
        tokenExpiration == other.tokenExpiration;
  }

  @override
  int get hashCode {
    return $jf($jc($jc($jc(0, token.hashCode), userId.hashCode),
        tokenExpiration.hashCode));
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper('AuthenticatedState')
          ..add('token', token)
          ..add('userId', userId)
          ..add('tokenExpiration', tokenExpiration))
        .toString();
  }
}

class AuthenticatedStateBuilder
    implements Builder<AuthenticatedState, AuthenticatedStateBuilder> {
  _$AuthenticatedState _$v;

  String _token;
  String get token => _$this._token;
  set token(String token) => _$this._token = token;

  String _userId;
  String get userId => _$this._userId;
  set userId(String userId) => _$this._userId = userId;

  int _tokenExpiration;
  int get tokenExpiration => _$this._tokenExpiration;
  set tokenExpiration(int tokenExpiration) =>
      _$this._tokenExpiration = tokenExpiration;

  AuthenticatedStateBuilder();

  AuthenticatedStateBuilder get _$this {
    if (_$v != null) {
      _token = _$v.token;
      _userId = _$v.userId;
      _tokenExpiration = _$v.tokenExpiration;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthenticatedState other) {
    if (other == null) {
      throw new ArgumentError.notNull('other');
    }
    _$v = other as _$AuthenticatedState;
  }

  @override
  void update(void Function(AuthenticatedStateBuilder) updates) {
    if (updates != null) updates(this);
  }

  @override
  _$AuthenticatedState build() {
    final _$result = _$v ??
        new _$AuthenticatedState._(
            token: token, userId: userId, tokenExpiration: tokenExpiration);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: always_put_control_body_on_new_line,always_specify_types,annotate_overrides,avoid_annotating_with_dynamic,avoid_as,avoid_catches_without_on_clauses,avoid_returning_this,lines_longer_than_80_chars,omit_local_variable_types,prefer_expression_function_bodies,sort_constructors_first,test_types_in_equals,unnecessary_const,unnecessary_new
