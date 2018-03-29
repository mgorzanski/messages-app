import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import { Font } from 'expo';

export default class Message extends React.Component {
    state = {
        fontLoaded: false,
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Walkway Bold': require('./../../fonts/Walkway-Bold.ttf'),
            'Arial': require('./../../fonts/arial.ttf')
        });

        this.setState({ fontLoaded: true });
    }

    render() {
        return (
            <View style={styles.message}>
                <Image style={styles.userImage} source={require('./../../img/icons/user2.png')} />
                { this.state.fontLoaded ? (
                    <React.Fragment>
                        <View style={styles.user}>
                            <Text style={styles.userName}>{this.props.userName}</Text>
                            <Text style={styles.messageText}>{this.props.message}</Text>
                        </View>
                        <Text style={styles.date}>{this.props.date}</Text>
                    </React.Fragment>
                ) : null }
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
        fontFamily: 'Walkway Bold',
        fontSize: 30,
        color: globalStyles.$white,
    },
    messageText: {
        fontFamily: 'Arial',
        color: globalStyles.$white,
        fontSize: 11,
        marginTop: 3
    },
    date: {
        fontFamily: 'Arial',
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