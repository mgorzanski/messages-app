import React from 'react';
import { Text, View, Image } from 'react-native';

class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./../img/icons/home.png')}
                style={{ width: 45, height: 45 }}
            />
        ),
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

export default Home;