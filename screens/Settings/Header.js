import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
                <View style={styles.headerTitle}>
                    { this.state.fontLoaded ? (
                        <Text style={styles.headerTitleText}>SETTINGS</Text>
                    ) : null }
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        width: '76%',
        height: 47
    },
    headerTitleText: {
        textAlign: 'center',
        color: globalStyles.$white,
        fontFamily: 'RobotoMono-Regular',
        fontSize: 22,
    }
});