import React from 'react';
import { StatusBar, AsyncStorage, AppState, Text } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import AuthLocal from './utils/AuthLocal';
import { Provider } from 'react-redux';
//import { store } from './config/store';
import { mainRouterConfig, appRouterConfig } from './config/routers';
import { Root } from 'native-base';
import io from 'socket.io-client';

import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';

const middleware = applyMiddleware(logger);
let store = createStore(reducers, middleware);

import Messages from './screens/Messages';
import Contacts from './screens/Contacts';
import Menu from './screens/Menu';
import Groups from './screens/Groups';
import Login from './screens/Login';
import MessageThread from './screens/Messages/MessageThread';
import Profile from './screens/Profile';
import AddContact from './screens/Contacts/AddContact';
import Informations from './screens/Menu/Informations';
import SearchMessages from './screens/Messages/SearchMessages';
import NewMessage from './screens/Messages/NewMessage';

class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        userLogged: true,
        renderView: false,
        isStoreLoading: false,
        store: store
      }

      this.socket = io('http://192.168.100.4:3000');
    }

    componentWillMount() {
      const self = this;
      this.setState({ isStoreLoading: true });
      AsyncStorage.getItem('completeStore').then((value) => {
          if (value && value.length) {
              let initialStore = JSON.parse(value);
              self.setState({ store: createStore(reducers, initialStore, middleware)});
          } else {
              self.setState({ store: store });
          }
          self.setState({ isStoreLoading: false });
      }).catch((error) => {
          self.setState({ store: store, isStoreLoading: false });
      }).then(() => {
          const state = this.state.store.getState();
          console.log(this.state.store.getState());
          if (state.user.data && state.user.data.token && state.user.data.token.length) {
              this.setState({ userLogged: true, renderView: true });
          } else {
              this.setState({ userLogged: false, renderView: false });
          }
      }).then(() => {
          AppState.addEventListener('change', this._handleAppStateChange.bind(this));
      });
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }

    _handleAppStateChange(currentAppState) {
      console.log(this.state.store.getState());
      let storingValue = JSON.stringify(this.state.store.getState());
      AsyncStorage.setItem('completeStore', storingValue);
    }

    handleLogin() {
      this.setState({ userLogged: true, renderView: true });
    }

    render() {
        const { userLogged, renderView, isStoreLoading, store } = this.state;

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
            SearchMessages: { screen: SearchMessages },
            NewMessage: { screen: NewMessage }
        }, appRouterConfig);

        if (isStoreLoading) {
            return <Text>Loading Store...</Text>
        } else {
            return (
                <Root>
                    <Provider store={store}>
                        {renderView && userLogged ? (
                            <React.Fragment>
                                <StatusBar
                                    backgroundColor="#1e1e1e"
                                    barStyle="light-content"
                                />
                                <AppRouter />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Login onUserLogin={this.handleLogin.bind(this)} />
                            </React.Fragment>
                        )}
                    </Provider>
                </Root>
            );
        }
    }
}

export default App;