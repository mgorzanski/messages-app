import React from 'react';
import { StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Messages from './screens/Messages';
import Contacts from './screens/Contacts';
import Menu from './screens/Menu';
import Groups from './screens/Groups';
import Login from './screens/Login';
import AuthLocal from './utils/AuthLocal';

export default class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        userLogged: true,
        renderView: false
      }
    }

    componentWillMount() {
      AuthLocal.checkToken().then((result) => {
        this.setState({ userLogged: result, renderView: true });
      });
    }

    handleLogin() {
      this.setState({ userLogged: true });
    }

    render() {
        const { userLogged, renderView } = this.state;
        const Layout = TabNavigator(
          {
              Messages: { screen: Messages },
              Contacts: { screen: Contacts },
              Groups: { screen: Groups },
              More: { screen: Menu }
          },
          {
            tabBarOptions: {
              showIcon: true,
              showLabel: true,
              style: {
                height: 65,
                backgroundColor: '#1e1e1e',
              },
              labelStyle: {
                color: '#fff',
                position:'absolute',
                top:36,
                fontSize: 12
              },
              tabStyle: {
                height:60,
                margin:0,
                padding:0,
              },
              indicatorStyle: {
                backgroundColor: '#2d2d2d',
                height: 65,
                position: 'absolute',
                top: '50%',
                marginTop: -33
              },
              iconStyle: {
                width: 80,
                height: 80,
                marginTop: -21
              },
            },
            tabBarPosition: 'bottom',
            swipeEnabled: false,
            animationEnabled: false
          }
        );

        if (renderView && userLogged) {
            return (
                <React.Fragment>
                    <StatusBar
                        backgroundColor="#1e1e1e"
                        barStyle="light-content"
                    />
                    <Layout />
                </React.Fragment>
            );
        } else {
            return (<Login onUserLogin={this.handleLogin} />);
        }
    }
}