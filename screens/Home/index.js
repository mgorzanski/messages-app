import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Header from './Header';
import * as globalStyles from './../../styles/globalStyles';

export default class Home extends React.Component {
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

        return (
            <View style={styles.home}>
                <Header />
                <Text>Home!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 45,
        height: 45
    },
    home: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    }
});