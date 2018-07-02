import React from 'react';
import { StatusBar, AsyncStorage, AppState } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { store } from './config/store';
import { mainRouterConfig, appRouterConfig, loginRouterConfig, getStackNavigatorHeader } from './config/routers';
import { Root } from 'native-base';
import { socketUrl } from './config/socket';
import io from 'socket.io-client';

import Messages from './screens/Messages';
import Contacts from './screens/Contacts';
import Menu from './screens/Menu';
import Groups from './screens/Groups';
import NewGroup from './screens/Groups/NewGroup';
import GroupsSettings from './screens/Menu/GroupsSettings';
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
        store: store(),
        appState: AppState.currentState
      }

      this.socket = io(socketUrl);
    }

    componentWillMount() {
      const self = this;
      AsyncStorage.getItem('completeStore').then((value) => {
          if (value && value.length) {
              let initialStore = JSON.parse(value);
              self.setState({ store: store(initialStore) });
          } else {
              self.setState({ store: store() });
          }
      }).catch(() => {
          self.setState({ store: store() });
      }).then(() => {
          const state = this.state.store.getState();
          if (state.user.data && state.user.data.token && state.user.data.token.length) {
              this.setState({ userLogged: true, renderView: true });
          } else {
              this.setState({ userLogged: false, renderView: true });
          }
      }).then(() => {
          AppState.addEventListener('change', this._handleAppStateChange.bind(this));
      });
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
        this.setState({ userLogged: false, renderView: true });
    }

    render() {
        const { userLogged, renderView, store } = this.state;   

        const MainRouter = createBottomTabNavigator({
            MessagesWithGroups: Messages,
            Contacts: Contacts,
            More: { screen: (props) => <Menu onUserLogout={this.handleLogout.bind(this)} {...props} />, navigationOptions: () => Menu.navigationOptions }
        }, mainRouterConfig);
        
        const MainRouterWithGroups = createBottomTabNavigator({
            Messages: Messages,
            Contacts: Contacts,
            Groups: Groups,
            More: { screen: (props) => <Menu onUserLogout={this.handleLogout.bind(this)} {...props} />, navigationOptions: () => Menu.navigationOptions }
        }, mainRouterConfig);

        MainRouter.navigationOptions = ({ navigation }) => {
            return getStackNavigatorHeader(navigation);
        };

        MainRouterWithGroups.navigationOptions = ({ navigation }) => {
            return getStackNavigatorHeader(navigation);
        };

        const mapStateToProps = state => {
            return state;
        }

        const AppRouterRedux = (props) => {
            let displayGroupsInTabNavigator = true;
            if (this.state.store.getState().settings !== undefined) {
                displayGroupsInTabNavigator = props.settings.displayGroupsInTabNavigator;
            }
            const AppRouter = createStackNavigator({
                MainRouter: displayGroupsInTabNavigator ? MainRouterWithGroups : MainRouter,
                MessageThread: MessageThread,
                Profile: Profile,
                AddContact: AddContact,
                Informations: Informations,
                GroupsSettings: GroupsSettings,
                SearchMessages: SearchMessages,
                NewMessage: NewMessage,
                NewGroup: NewGroup
            }, appRouterConfig);
            return <AppRouter />;
        };

        const AppRouter = connect(mapStateToProps)(AppRouterRedux);

        const LoginRouter = createStackNavigator({
            Login: { screen: (props) => <Login onUserLogin={this.handleLogin.bind(this)} {...props} /> },
            SignUp: { screen: (props) => <SignUp onUserLogin={this.handleLogin.bind(this)} {...props} /> }
        }, loginRouterConfig);

        if (!renderView) {
            return null;
        } else {
            return (
                <Provider store={store}>
                    <Root>
                        <StatusBar
                            backgroundColor="#1e1e1e"
                            barStyle="light-content"
                        />
                        {userLogged ? (
                            <AppRouter />
                        ) : (
                            <LoginRouter />
                        )}
                    </Root>
                </Provider>
            );
        }
    }
}

export default App;