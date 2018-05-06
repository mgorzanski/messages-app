import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';

export default class UserPanel extends React.Component {
    render() {
        return (
            <View style={styles.panel}>
                <Text style={styles.userName}>MATEUSZ GÓRZAŃSKI</Text>
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
        marginRight: 7,
        marginTop: 3
    }
});