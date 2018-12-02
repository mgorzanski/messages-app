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
import SignInNew from "./screens/Auth/SignInNew";
import SignUp from "./screens/Auth/SignUp";
import MessageThread from "./screens/Messages/MessageThread";
import Profile from "./screens/Profile";
import AddContact from "./screens/Contacts/AddContact";
import Informations from "./screens/Menu/Informations";
import SearchMessages from "./screens/Messages/SearchMessages";
import NewMessage from "./screens/Messages/NewMessage";

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: true,
      renderView: false,
      store: store(),
      appState: AppState.currentState
    };
  }

  componentDidMount() {
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

    // firebase();
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
    this.setState({ renderView: false, userLogged: false }).then(() => this.setState({ userLogged: false, renderView: true }));
  }

  render() {
    const { userLogged, renderView, store } = this.state;

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

const TabsRouter = function(displayGroupsInTabNavigator) {
  const router = (function() {
    const tabs = {};

    if (displayGroupsInTabNavigator) {
      tabs.Messages = Messages;
    } else {
      tabs.MessagesWithGroups = Messages;
    }

    tabs.Contacts = Contacts;

    if (displayGroupsInTabNavigator) {
      tabs.Groups = Groups;
    }

    tabs.More = {
      screen: function More(props) {
        return <Menu onUserLogout={App.handleLogout} {...props} />;
      },
      navigationOptions: () => Menu.navigationOptions
    };

    return createBottomTabNavigator(tabs, tabsRouterConfig);
  })();

  router.navigationOptions = ({ navigation }) => {
    return getStackNavigatorHeader(navigation);
  };

  return router;
};

const MainRouter = connect(state => state)(props => {
  let displayGroupsInTabNavigator = true;
  if (props.settings !== undefined) {
    displayGroupsInTabNavigator = props.settings.displayGroupsInTabNavigator;
  }

  const Navigator = createStackNavigator(
    {
      TabsRouter: TabsRouter(displayGroupsInTabNavigator),
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
      screen: function SignInScreen(props) {
        return <SignInNew onUserLogin={App.handleLogin} {...props} />;
      }
    },
    SignUp: {
      screen: function SignUpScreen(props) {
        return <SignUp onUserLogin={App.handleLogin} {...props} />;
      }
    }
  },
  authRouterConfig
);
