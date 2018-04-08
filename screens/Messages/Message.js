import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
    render() {
        return (
            <View style={styles.message}>
                <Image style={styles.userImage} source={require('./../../img/icons/user2.png')} />
                <React.Fragment>
                    <View style={styles.user}>
                        <Text style={styles.userName}>{this.props.userName}</Text>
                        {/*
                            If this.props.message was passed, render the text. Otherwise don't render anything here (null).
                        */}
                        { this.props.message ? (
                            <Text style={styles.messageText}>{this.props.message}</Text>
                        ) : null}
                    </View>
                    {/*
                        If this.props.date was passed, render the text. Otherwise don't render anything here (null).
                    */}
                    { this.props.date ? (
                        <Text style={styles.date}>{this.props.date}</Text>
                    ) : null}
                </React.Fragment>
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
    user: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 9,
        marginLeft: -55
    },
    message: {
        backgroundColor: globalStyles.$messageThreadItemBackgroundColor,
        display: 'flex',
        flexDirection: 'row',
        height: 75,
        borderBottomWidth: 0.25,
        borderStyle: 'solid',
        borderBottomColor: globalStyles.$borderColor,
        justifyContent: 'space-between'
    },
    userName: {
        fontFamily: 'Walkway-Bold',
        fontSize: 30,
        color: globalStyles.$white,
    },
    messageText: {
        fontFamily: 'arial',
        color: globalStyles.$white,
        fontSize: 11,
        marginTop: 3
    },
    date: {
        fontFamily: 'arial',
        color: globalStyles.$white,
        fontSize: 10,
        marginRight:15,
        marginTop: 11
    },
    userImage: {
        width: 53,
        height: 53,
        marginLeft:13,
        marginTop: 10
    }
});