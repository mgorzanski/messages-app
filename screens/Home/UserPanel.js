import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import { Font } from 'expo';

export default class UserPanel extends React.Component {
    state = {
        fontLoaded: false,
    }

    async componentDidMount() {
        await Font.loadAsync({
            'BebasNeue': require('./../../fonts/BebasNeue.otf')
        });

        this.setState({ fontLoaded: true });
    }

    render() {
        return (
            <View style={styles.panel}>
                { this.state.fontLoaded ? (
                    <Text style={styles.userName}>MATEUSZ GÓRZAŃSKI</Text>
                ) : null }
                <Image source={require('./../../img/icons/arrow.png')} style={styles.shortcut} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: globalStyles.$userPanelBackgroundColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 24
    },
    userName: {
        color: globalStyles.$white,
        fontFamily: 'BebasNeue',
        marginTop: 4,
        marginLeft: 7
    },
    shortcut: {
        width: 17,
        height: 17,
        marginRight: 7,
        marginTop: 3
    }
});