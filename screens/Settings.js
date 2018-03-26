import React from 'react';
import { Text, View, Image } from 'react-native';

class Settings extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./../img/icons/settings.png')}
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

export default Settings;