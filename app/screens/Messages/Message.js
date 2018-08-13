import React from "react";
import { StyleSheet, Image } from "react-native";
import * as globalStyles from "./../../styles/globalStyles";
import { ListItem, Text, Body, Left, Right } from "native-base";
import PropTypes from "prop-types";
import UserIcon from "./../../img/icons/user2.png";

export default class Message extends React.PureComponent {
  render() {
    const time = new Date(this.props.date);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    return (
      <ListItem
        avatar
        onPress={() =>
          this.props.navigation.navigate("MessageThread", {
            name: this.props.name,
            threadId: this.props.threadId,
            userId: this.props.userId
          })
        }
      >
        <Left>
          <Image source={UserIcon} style={styles.thumbnail} />
        </Left>
        <Body>
          <Text style={styles.title}>{this.props.name}</Text>
          {/* If this.props.message was passed, render the text. Otherwise don't render anything here (null). */}
          <Text style={styles.message} note>
            {this.props.message && this.props.message !== ""
              ? this.props.message
              : "No messages"}
          </Text>
        </Body>
        <Right>
          {/* If this.props.date was passed, render the text. Otherwise don't render anything here (null). */}
          {this.props.date ? (
            <Text style={styles.timestamp} note>
              {hours}:{minutes}
            </Text>
          ) : null}
        </Right>
      </ListItem>
    );
  }
}

Message.propTypes = {
  date: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  message: PropTypes.string
};

const styles = StyleSheet.create({
  title: {
    color: globalStyles.$white
  },
  message: {
    color: globalStyles.$darkGray,
    fontSize: 13
  },
  timestamp: {
    color: globalStyles.$darkGray,
    fontSize: 13
  },
  thumbnail: {
    width: 50,
    height: 50
  }
});
