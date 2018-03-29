import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
    render() {
        return (
            <View style={styles.message}>
                <Image style={styles.userImage} source={require('./../../img/icons/user.png')} />
                <Text style={styles.userName}>{this.props.userName}</Text>
                <Text style={styles.messageText}>{this.props.message}</Text>
                <Text style={styles.date}>{this.props.date}</Text>
            </View>
        );
    }
}

Message.propTypes = {
    userName: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.string
}

const styles = StyleSheet.create({
    message: {},
    userName: {},
    messageText: {},
    date: {}
});