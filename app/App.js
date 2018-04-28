import React from 'react';
import { StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Messages from './screens/Messages';
import Contacts from './screens/Contacts';
import Menu from './screens/Menu';
import Groups from './screens/Groups';
import Login from './screens/Login';
import AuthLocal from './utils/AuthLocal';
import { Provider } from 'react-redux';
import { store } from './config/store';
import { routesConfig } from './config/routes';

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
        const Router = TabNavigator({
              Messages: { screen: Messages },
              Contacts: { screen: Contacts },
              Groups: { screen: Groups },
              More: { screen: Menu }
        }, routesConfig);

        if (renderView && userLogged) {
            return (
                <Provider store={store}>
                    <React.Fragment>
                        <StatusBar
                            backgroundColor="#1e1e1e"
                            barStyle="light-content"
                        />
                        <Router />
                    </React.Fragment>
                </Provider>
            );
        } else {
            return (<Login onUserLogin={this.handleLogin} />);
        }
    }
}