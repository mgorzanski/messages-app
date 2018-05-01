import React from 'react';
import { StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import { ListItem, Thumbnail, Text, Body, Left, Right } from 'native-base';

export default class Message extends React.Component {
    render() {
        return (
            <ListItem avatar onPress={() => this.props.navigation.navigate('MessageThread', {name: this.props.name})}>
                <Left>
                    <Thumbnail source={require('./../../img/icons/user2.png')} style={styles.thumbnail} />
                </Left>
                <Body>
                    <Text style={styles.title}>{this.props.name}</Text>
                    {/*
                        If this.props.message was passed, render the text. Otherwise don't render anything here (null).
                    */}
                    { this.props.message ? (
                        <Text style={styles.message} note>{this.props.message}</Text>
                    ) : null}
                </Body>
                <Right>
                    {/*
                        If this.props.date was passed, render the text. Otherwise don't render anything here (null).
                    */}
                    { this.props.date ? (
                        <Text style={styles.timestamp} note>{this.props.date}</Text>
                    ) : null}
                </Right>
            </ListItem>
        );
    }
}

Message.propTypes = {
    name: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.string,
    navigation: PropTypes.object.isRequired
}

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