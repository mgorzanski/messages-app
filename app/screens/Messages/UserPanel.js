import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import { connect } from 'react-redux';

class UserPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: true
        }
    }

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 100);
    }

    render() {
        const render = this.state.render;
        if (render) {
            return (
                <View style={styles.panel}>
                    <Text style={styles.userName}>{this.props.user.data.fullName.toUpperCase()}</Text>
                    <Image source={require('./../../img/icons/arrow.png')} style={styles.shortcut} placeholderColor={globalStyles.$userPanelBackgroundColor} />
                </View>
            );
        }
        return (null);
    }
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: globalStyles.$userPanelBackgroundColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 24
    },
    userName: {
        color: globalStyles.$white,
        fontFamily: 'BebasNeue',
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
}

export default connect(mapStateToProps)(UserPanel);