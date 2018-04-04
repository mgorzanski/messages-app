import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';
import MessagesList from './MessagesList';

export default class Home extends React.Component {
    state = {
        fontLoaded: false,
    }

    async componentDidMount() {
        await Font.loadAsync({
            'RobotoMono-Regular': require('./../../fonts/RobotoMono-Regular.ttf')
        });

        this.setState({ fontLoaded: true });
    }

    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/home.png')}
                style={styles.tabBarIcon}
            />
        ),
    };

    render() {
        if (this.state.fontLoaded) {
            return (<StackNav />);
        } else {
            return (null);
        }
    }
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 45,
        height: 45
    }
});

const StackNav = StackNavigator({
    MessagesList: { screen: MessagesList }
});