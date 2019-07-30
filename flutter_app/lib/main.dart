import 'package:flutter/material.dart';
import 'package:bottom_navy_bar/bottom_navy_bar.dart';
import 'package:flutter_app/pages/login_register/login_register_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Learn graphql',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: const LoginRegisterPage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex;
  List<Widget> _bodies;

  @override
  void initState() {
    super.initState();

    _selectedIndex = 0;
    _bodies = [
      const EventsPage(),
      const BookingsPage(),
      Container(
        color: Colors.pink,
      ),
    ];
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: AnimatedSwitcher(
        duration: const Duration(
          milliseconds: 500,
        ),
        child: _bodies[_selectedIndex],
      ),
      bottomNavigationBar: BottomNavyBar(
        selectedIndex: _selectedIndex,
        showElevation: true,
        onItemSelected: (index) => setState(() => _selectedIndex = index),
        items: [
          BottomNavyBarItem(
            icon: Icon(Icons.event),
            title: Text('Events'),
            activeColor: Colors.redAccent,
          ),
          BottomNavyBarItem(
            icon: Icon(Icons.check),
            title: Text('Bookings'),
            activeColor: Colors.purpleAccent,
          ),
          BottomNavyBarItem(
            icon: Icon(Icons.check),
            title: Text('TODO'),
            activeColor: Colors.pinkAccent,
          ),
        ],
      ),
    );
  }
}

class EventsPage extends StatefulWidget {
  const EventsPage({Key key}) : super(key: key);

  @override
  _EventsPageState createState() => _EventsPageState();
}

class _EventsPageState extends State<EventsPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.red,
    );
  }
}

class BookingsPage extends StatefulWidget {
  const BookingsPage({Key key}) : super(key: key);

  @override
  _BookingsPageState createState() => _BookingsPageState();
}

class _BookingsPageState extends State<BookingsPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.purple,
    );
  }
}
