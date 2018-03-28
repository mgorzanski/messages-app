import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Font } from 'expo';

class Header extends React.Component {
    componentDidMount() {
        Font.loadAsync({
            'RobotoMono-Regular': require('./../../fonts/RobotoMono-Regular.ttf')
        });
    }

    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        return (
            <View
                style={{ display:'flex', flexDirection: 'row', backgroundColor: '#1e1e1e', paddingTop:49, alignItems: 'center' }}
            >
                <View style={{ width: '12%', height: 47, marginLeft: 10 }}>
                    <Image
                        source={require('./../../img/icons/search.png')}
                        style={{ width: 27, height: 27 }}
                    />
                </View>
                <View style={{ width: '76%', height: 47, marginLeft: -10 }}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Messages</Text>
                </View>
                <View style={{ width: '12%', height: 47 }}>
                    <Image
                        source={require('./../../img/icons/add.png')}
                        style={{ width: 27, height: 27 }}
                    />
                </View>
            </View>
        );
    }
}

export default Header;