import React, { Component } from "react";
import { StyleProvider, getTheme, Icon as IconBase } from "native-base";
import PropTypes from "prop-types";

export default class Icon extends Component {
  render() {
    const { family, name, style } = this.props;
    const icon = <IconBase name={name} style={style} />;
    if (family) {
      const customTheme = getTheme({ iconFamily: family });
      return <StyleProvider style={customTheme}>{icon}</StyleProvider>;
    } else {
      return icon;
    }
  }
}

Icon.propTypes = {
  family: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object
};
