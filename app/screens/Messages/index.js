import React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  RefreshControl,
  Image
} from "react-native";
import { Container, Content, List, Toast } from "native-base";
import Message from "./Message";
import UserPanel from "./UserPanel";
import * as globalStyles from "./../../styles/globalStyles";
import MessagesApi from "./../../api/MessagesApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MessagesIcon from "./../../img/icons/messages.png";

class Messages extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      threads: [],
      refreshing: false,
      threadsList: [],
      showToast: false,
      sockets: []
    };
  }

  getThreads() {
    MessagesApi.getThreads(
      this.props.user.data.token,
      this.props.user.data.userId
    )
      .then(result => this.setState({ threads: result }))
      .catch(() =>
        Toast.show({
          text: "Cannot get any threads",
          buttonText: "Close"
        })
      )
      .then(() =>
        this.setState({
          threadsList: this.state.threads.map(thread => (
            <Message
              key={thread._id}
              navigation={this.props.navigation}
              name={thread.name}
              message={thread.lastMessageText}
              date={thread.lastMessageDate}
              threadId={thread._id}
              userId={thread.userId}
            />
          ))
        })
      );
  }

  static navigationOptions = () => ({
    tabBarLabel: "",
    tabBarIcon: () => (
      <Image source={MessagesIcon} style={globalStyles.tabBarIcon} />
    ),
    title: "Messages"
  });

  componentWillUnmount() {
    // this.notificationDisplayedListener();
    // this.notificationListener();
  }

  componentDidMount() {
    this.getThreads();
    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .then(() => {
    //     firebase
    //       .messaging()
    //       .hasPermission()
    //       .then(enabled => {
    //         if (enabled) {
    //           this.notificationDisplayedListener = firebase
    //             .notifications()
    //             .onNotificationDisplayed(notification => {
    //               console.log(notification);
    //             });
    //           this.notificationListener = firebase
    //             .notifications()
    //             .onNotification(() => {
    //               //console.log(notification);

    //               const notification = new firebase.notifications.Notification()
    //                 .setNotificationId("notificationId")
    //                 .setTitle("My notification title")
    //                 .setBody("My notification body")
    //                 .setData({
    //                   key1: "value1",
    //                   key2: "value2"
    //                 });

    //               firebase.notifications().displayNotification(notification);
    //             });
    //         }
    //       });
    //   });
  }

  render() {
    return (
      <Container style={styles.home}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.getThreads()}
            />
          }
        >
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <UserPanel />
          </TouchableHighlight>
          <List>{this.state.threadsList}</List>
        </Content>
      </Container>
    );
  }
}

Messages.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: globalStyles.$appBackgroundColor
  }
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Messages);
