import React from "react";
import { StatusBar, AsyncStorage, AppState } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Provider, connect } from "react-redux";
import { store } from "./config/store";
import {
  tabsRouterConfig,
  mainRouterConfig,
  authRouterConfig,
  getStackNavigatorHeader
} from "./config/routers";
import { Root } from "native-base";
import * as globalStyles from "./styles/globalStyles";

import Messages from "./screens/Messages";
import Contacts from "./screens/Contacts";
import Menu from "./screens/Menu";
import Groups from "./screens/Groups";
import NewGroup from "./screens/Groups/NewGroup";
import GroupsSettings from "./screens/Menu/GroupsSettings";
import SignIn from "./screens/Auth/SignIn";
import SignUp from "./screens/Auth/SignUp";
import MessageThread from "./screens/Messages/MessageThread";
import Profile from "./screens/Profile";
import AddContact from "./screens/Contacts/AddContact";
import Informations from "./screens/Menu/Informations";
import SearchMessages from "./screens/Messages/SearchMessages";
import NewMessage from "./screens/Messages/NewMessage";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: true,
      renderView: false,
      store: store(),
      appState: AppState.currentState
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("completeStore")
      .then(value => {
        if (value && value.length) {
          let initialStore = JSON.parse(value);
          this.setState({ store: store(initialStore) });
        } else {
          this.setState({ store: store() });
        }
      })
      .catch(() => {
        this.setState({ store: store() });
      })
      .then(() => {
        const state = this.state.store.getState();
        if (
          state.user.data &&
          state.user.data.token &&
          state.user.data.token.length
        ) {
          this.setState({ userLogged: true, renderView: true });
        } else {
          this.setState({ userLogged: false, renderView: true });
        }
      })
      .then(() => {
        AppState.addEventListener(
          "change",
          this._handleAppStateChange.bind(this)
        );
      });
  }

  componentWillUnmount() {
    AppState.removeEventListener(
      "change",
      this._handleAppStateChange.bind(this)
    );
  }

  _handleAppStateChange(nextAppState) {
    if (this.state.appState === "active" && nextAppState === "background") {
      const storingValue = JSON.stringify(this.state.store.getState());
      AsyncStorage.setItem("completeStore", storingValue);
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

    const TabsRouter = createBottomTabNavigator(
      {
        MessagesWithGroups: Messages,
        Contacts: Contacts,
        More: {
          screen: props => (
            <Menu onUserLogout={this.handleLogout.bind(this)} {...props} />
          ),
          navigationOptions: () => Menu.navigationOptions
        }
      },
      tabsRouterConfig
    );

    const TabsRouterWithGroups = createBottomTabNavigator(
      {
        Messages: Messages,
        Contacts: Contacts,
        Groups: Groups,
        More: {
          screen: props => (
            <Menu onUserLogout={this.handleLogout.bind(this)} {...props} />
          ),
          navigationOptions: () => Menu.navigationOptions
        }
      },
      tabsRouterConfig
    );

    TabsRouter.navigationOptions = ({ navigation }) => {
      return getStackNavigatorHeader(navigation);
    };

    TabsRouterWithGroups.navigationOptions = ({ navigation }) => {
      return getStackNavigatorHeader(navigation);
    };

    const MainRouter = connect(state => state)(props => {
      let displayGroupsInTabNavigator = true;
      if (this.state.store.getState().settings !== undefined) {
        displayGroupsInTabNavigator =
          props.settings.displayGroupsInTabNavigator;
      }

      const Navigator = createStackNavigator(
        {
          TabsRouter: displayGroupsInTabNavigator
            ? TabsRouterWithGroups
            : TabsRouter,
          MessageThread: MessageThread,
          Profile: Profile,
          AddContact: AddContact,
          Informations: Informations,
          GroupsSettings: GroupsSettings,
          SearchMessages: SearchMessages,
          NewMessage: NewMessage,
          NewGroup: NewGroup
        },
        mainRouterConfig
      );

      return <Navigator />;
    });

    const AuthRouter = createStackNavigator(
      {
        SignIn: {
          screen: props => (
            <SignIn onUserLogin={this.handleLogin.bind(this)} {...props} />
          )
        },
        SignUp: {
          screen: props => (
            <SignUp onUserLogin={this.handleLogin.bind(this)} {...props} />
          )
        }
      },
      authRouterConfig
    );

    if (!renderView) {
      return null;
    } else {
      return (
        <Provider store={store}>
          <Root>
            <StatusBar
              backgroundColor={globalStyles.statusBarBackgroundColor}
              barStyle="light-content"
            />
            {userLogged ? <MainRouter /> : <AuthRouter />}
          </Root>
        </Provider>
      );
    }
  }
}

export default App;
