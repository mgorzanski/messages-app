import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

class Header extends React.Component {
    render() {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        return (
            <View
                style={{ display:'flex', flexDirection: 'row', backgroundColor: '#1e1e1e', paddingTop:37 }}
            >
                <View style={{ width: '12%', paddingLeft: 10 }}>
                    <Image
                        source={require('./../../img/icons/search.png')}
                        style={{ width: 27, height: 27 }}
                    />
                </View>
                <View style={{ width: '76%' }}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Messages</Text>
                </View>
                <View style={{ width: '12%', paddingRight: 10 }}>
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