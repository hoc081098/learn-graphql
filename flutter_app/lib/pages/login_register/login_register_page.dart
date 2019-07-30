import 'dart:ui';

import 'package:flutter/material.dart';

class LoginRegisterPage extends StatefulWidget {
  const LoginRegisterPage({Key key}) : super(key: key);

  @override
  _LoginRegisterPageState createState() => _LoginRegisterPageState();
}

class _LoginRegisterPageState extends State<LoginRegisterPage> {
  bool isLogin = true;
  final _passwordFocusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          constraints: BoxConstraints.expand(),
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/bg.jpg'),
              fit: BoxFit.cover,
              colorFilter: ColorFilter.mode(
                Colors.black.withOpacity(0.6),
                BlendMode.darken,
              ),
            ),
          ),
          child: Center(
            child: ClipRect(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.65),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: SingleChildScrollView(
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: <Widget>[
                          const SizedBox(height: 16),
                          TextField(
                            autofocus: false,
                            autocorrect: true,
                            keyboardType: TextInputType.emailAddress,
                            decoration: InputDecoration(
                              labelText: 'Email',
                              prefixIcon: Padding(
                                padding:
                                    const EdgeInsetsDirectional.only(end: 8.0),
                                child: Icon(Icons.email),
                              ),
                            ),
                            maxLines: 1,
                            textInputAction: TextInputAction.next,
                            onSubmitted: (_) => FocusScope.of(context)
                                .requestFocus(_passwordFocusNode),
                          ),
                          const SizedBox(height: 16),
                          TextField(
                            autofocus: false,
                            focusNode: _passwordFocusNode,
                            autocorrect: true,
                            keyboardType: TextInputType.text,
                            decoration: InputDecoration(
                              labelText: 'Password',
                              prefixIcon: Padding(
                                padding:
                                    const EdgeInsetsDirectional.only(end: 8.0),
                                child: Icon(Icons.lock),
                              ),
                            ),
                            maxLines: 1,
                            textInputAction: TextInputAction.done,
                          ),
                          const SizedBox(height: 24),
                          RaisedButton(
                            color: Theme.of(context).accentColor,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            padding: const EdgeInsets.symmetric(vertical: 20),
                            child: Text(
                              isLogin ? 'Login' : 'Register',
                              style: Theme.of(context)
                                  .textTheme
                                  .title
                                  .copyWith(fontSize: 16),
                            ),
                            onPressed: () {},
                          ),
                          const SizedBox(height: 8),
                          FlatButton(
                            padding: const EdgeInsets.symmetric(vertical: 20),
                            child: Text(
                              'Switch to ${isLogin ? 'signup' : 'login'}',
                              style: Theme.of(context)
                                  .textTheme
                                  .title
                                  .copyWith(fontSize: 16),
                            ),
                            onPressed: () => setState(() => isLogin = !isLogin),
                          ),
                          const SizedBox(height: 8),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
