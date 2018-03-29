import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Header from './Header';

class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/home.png')}
                style={{ width: 45, height: 45 }}
            />
        ),
    };

    render() {

        return (
            <View style={{ backgroundColor: '#494949' }}>
                <Header />
                <Text>Home!</Text>
            </View>
        );
    }
}

export default Home;