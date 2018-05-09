import React from 'react';
import { StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import { ListItem, Text, Body, Left, Right } from 'native-base';
import AsyncImage from './../../components/AsyncImage';

export default class Message extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 100);
    }

    render() {
        const render = this.state.render;

        if (render) {
        return (
            <ListItem avatar onPress={() => this.props.navigation.navigate('MessageThread', {name: this.props.name})}>
                <Left>
                    <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.thumbnail} placeholderColor={globalStyles.$appBackgroundColor} />
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
        return (null);
    }
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