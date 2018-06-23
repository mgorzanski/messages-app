import React from 'react';
import { StatusBar, AsyncStorage, AppState } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './config/store';
import { mainRouterConfig, appRouterConfig, loginRouterConfig, getStackNavigatorHeader } from './config/routers';
import { Root } from 'native-base';
import { socketUrl } from './config/socket';
import io from 'socket.io-client';

import Messages from './screens/Messages';
import Contacts from './screens/Contacts';
import Menu from './screens/Menu';
import Groups from './screens/Groups';
import Login from './screens/Login';
import SignUp from './screens/Login/SignUp';
import MessageThread from './screens/Messages/MessageThread';
import Profile from './screens/Profile';
import AddContact from './screens/Contacts/AddContact';
import Informations from './screens/Menu/Informations';
import SearchMessages from './screens/Messages/SearchMessages';
import NewMessage from './screens/Messages/NewMessage';

class App extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userLogged: true,
        renderView: false,
        isStoreLoading: false,
        store: store(),
        appState: AppState.currentState
      }

      this.socket = io(socketUrl);
    }

    componentDidMount() {
      const self = this;
      this.setState({ isStoreLoading: true });
      AsyncStorage.getItem('completeStore').then((value) => {
          if (value && value.length) {
              let initialStore = JSON.parse(value);
              self.setState({ store: store(initialStore) });
          } else {
              self.setState({ store: store() });
          }
          self.setState({ isStoreLoading: false });
      }).catch(() => {
          self.setState({ store: store(), isStoreLoading: false });
      }).then(() => {
          const state = this.state.store.getState();
          if (state.user.data && state.user.data.token && state.user.data.token.length) {
              this.setState({ userLogged: true, renderView: true });
          } else {
              this.setState({ userLogged: false, renderView: false });
          }
      }).then(() => {
          AppState.addEventListener('change', this._handleAppStateChange.bind(this));
      });
    }

    componentWillUpdate() {
        const state = this.state.store.getState();
        if (state.user.data === null) {
            this.setState({ userLogged: false, renderView: false });
        }
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }

    _handleAppStateChange(nextAppState) {
        if (this.state.appState === 'active' && nextAppState === 'background') {
            let storingValue = JSON.stringify(this.state.store.getState());
            AsyncStorage.setItem('completeStore', storingValue);
        }
    }

    handleLogin() {
        this.setState({ userLogged: true, renderView: true });
    }

    handleLogout() {
        this.setState({ userLogged: false, renderView: false });
    }

    render() {
        const { userLogged, renderView, isStoreLoading, store } = this.state;

        const MainRouter = createMaterialBottomTabNavigator({
            Messages: Messages,
            Contacts: Contacts,
            Groups: Groups,
            More: { screen: (props) => <Menu onUserLogout={this.handleLogout.bind(this)} {...props} />, navigationOptions: () => Menu.navigationOptions }
        }, mainRouterConfig);

        MainRouter.navigationOptions = ({ navigation }) => {
            return getStackNavigatorHeader(navigation);
        };

        const AppRouter = createStackNavigator({
            MainRouter: MainRouter,
            MessageThread: MessageThread,
            Profile: Profile,
            AddContact: AddContact,
            Informations: Informations,
            SearchMessages: SearchMessages,
            NewMessage: NewMessage
        }, appRouterConfig);

        const LoginRouter = createStackNavigator({
            Login: { screen: (props) => <Login onUserLogin={this.handleLogin.bind(this)} {...props} /> },
            SignUp: { screen: (props) => <SignUp onUserLogin={this.handleLogin.bind(this)} {...props} /> }
        }, loginRouterConfig);

        if (isStoreLoading) {
            return null;
        } else {
            return (
                <Root>
                    <Provider store={store}>
                        <Root>
                            <StatusBar
                                backgroundColor="#1e1e1e"
                                barStyle="light-content"
                            />
                            {renderView && userLogged ? (
                                <AppRouter />
                            ) : (
                                <LoginRouter />
                            )}
                        </Root>
                    </Provider>
                </Root>
            );
        }
    }
}

export default App;