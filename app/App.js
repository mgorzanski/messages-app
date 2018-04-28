import React from 'react';
import { StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import AuthLocal from './utils/AuthLocal';
import { Provider } from 'react-redux';
import { store } from './config/store';
import { mainRouterConfig, appRouterConfig } from './config/routers';
import { Root } from 'native-base';

import Messages from './screens/Messages';
import Contacts from './screens/Contacts';
import Menu from './screens/Menu';
import Groups from './screens/Groups';
import Login from './screens/Login';
import MessageThread from './screens/Messages/MessageThread';
import Profile from './screens/Profile';
import AddContact from './screens/Contacts/AddContact';
import Informations from './screens/Menu/Informations';

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

        const MainRouter = TabNavigator({
              Messages: { screen: Messages },
              Contacts: { screen: Contacts },
              Groups: { screen: Groups },
              More: { screen: Menu }
        }, mainRouterConfig);

        const AppRouter = StackNavigator({
            MainRouter: { screen: MainRouter },
            MessageThread: { screen: MessageThread },
            Profile: { screen: Profile },
            AddContact: { screen: AddContact },
            Informations: { screen: Informations },
        }, appRouterConfig);

        if (renderView && userLogged) {
            return (
                <Root>
                    <Provider store={store}>
                        <React.Fragment>
                            <StatusBar
                                backgroundColor="#1e1e1e"
                                barStyle="light-content"
                            />
                            <AppRouter />
                        </React.Fragment>
                    </Provider>
                </Root>
            );
        } else {
            return (<Root><Login onUserLogin={this.handleLogin} /></Root>);
        }
    }
}