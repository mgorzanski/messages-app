import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Font } from 'expo';
import * as globalStyles from './../../styles/globalStyles';

export default class Header extends React.Component {
    state = {
        fontLoaded: false,
    }

    async componentDidMount() {
        await Font.loadAsync({
            'RobotoMono-Regular': require('./../../fonts/RobotoMono-Regular.ttf')
        });

        this.setState({ fontLoaded: true });
    }

    render() {
        return (
            <View
                style={styles.header}
            >
                <View style={styles.searchIcon}>
                    <Image
                        source={require('./../../img/icons/search.png')}
                        style={styles.icon}
                    />
                </View>
                <View style={styles.headerTitle}>
                    { this.state.fontLoaded ? (
                        <Text style={styles.headerTitleText}>MESSAGES</Text>
                    ) : null }
                </View>
                <View style={styles.addIcon}>
                    <Image
                        source={require('./../../img/icons/add.png')}
                        style={styles.icon}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        display:'flex',
        flexDirection: 'row',
        backgroundColor: globalStyles.$headerBackgroundColor,
        paddingTop: 41,
        alignItems: 'center'
    },
    searchIcon: {
        width: '12%',
        height: 47,
        marginLeft: 15
    },
    headerTitle: {
        width: '76%',
        height: 47,
        marginLeft: -10
    },
    headerTitleText: {
        textAlign: 'center',
        color: globalStyles.$white,
        fontFamily: 'RobotoMono-Regular',
        fontSize: 22,
    },
    addIcon: {
        width: '12%',
        height: 47
    },
    icon: {
        width: 27,
        height: 27
    }
});