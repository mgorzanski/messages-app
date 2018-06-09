import React, { Component } from 'react';
import { View, UIManager, findNodeHandle, TouchableOpacity } from 'react-native';
import Icon from './../utils/Icon';
import PropTypes from 'prop-types';
import * as globalStyles from './../styles/globalStyles';

export default class PopupMenu extends Component {
  static propTypes = {
    actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      icon: null
    };
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        null,
        this.props.onPress
      );
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Icon
            family="MaterialIcons"
            name='more-vert'
            style={globalStyles.stackNavIcon}
            ref={this.onRef} />
        </TouchableOpacity>
      </View>
    );
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({icon});
    }
  }
}