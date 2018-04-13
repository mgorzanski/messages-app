import React from 'react';
import { Text } from 'native-base';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import * as globalStyles from './../../styles/globalStyles';

const styles = StyleSheet.create({
    otherMessageRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    myMessageRow: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start'
    },
    otherMessageViewText: {
        backgroundColor: globalStyles.$otherMessageTextBackground,
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    myMessageViewText: {
        backgroundColor: globalStyles.$myMessageTextBackground,
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    messages: {
        backgroundColor: globalStyles.$appBackgroundColor,
        display: 'flex',
        flexDirection: 'column'
    },
    userImage: {
        width:41,
        height:41,
        marginTop:2
    },
    text: {
        fontSize: 18,
        fontFamily: 'arial',
        color: globalStyles.$white
    }
});

export default class SingleMessage extends React.Component {
    render() {
        return (
            <View style={styles.messages}>
                { this.props.author === 'me' ? (
                    <View style={styles.myMessageRow}>
                        <Image source={require('./../../img/icons/user2.png')} style={styles.userImage} />
                        <View style={styles.myMessageViewText}>
                            <Text style={styles.text}>{this.props.text}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.otherMessageRow}>
                        <Image source={require('./../../img/icons/user2.png')} style={styles.userImage} />
                        <View style={styles.otherMessageViewText}>
                            <Text style={styles.text}>{this.props.text}</Text>
                        </View>
                    </View>
                ) }
            </View>
        );
    }
}

SingleMessage.propTypes = {
    text: PropTypes.string,
    author: PropTypes.string
}