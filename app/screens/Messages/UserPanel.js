import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import * as globalStyles from "./../../styles/globalStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArrowIcon from "./../../img/icons/arrow.png";

class UserPanel extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        <Text style={styles.userName}>
          {this.props.user.data !== null
            ? this.props.user.data.fullName.toUpperCase()
            : ""}
        </Text>
        <Image
          source={ArrowIcon}
          style={styles.shortcut}
          placeholderColor={globalStyles.$userPanelBackgroundColor}
        />
      </View>
    );
  }
}

UserPanel.propTypes = {
  user: PropTypes.object
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: globalStyles.$userPanelBackgroundColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 24
  },
  userName: {
    color: globalStyles.$white,
    fontFamily: "BebasNeue",
    marginTop: 4,
    marginLeft: 7
  },
  shortcut: {
    marginRight: 7,
    marginTop: 3
  }
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserPanel);
