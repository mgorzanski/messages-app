import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { Font } from 'expo';
import * as globalStyles from './../../styles/globalStyles';

const styles = StyleSheet.create({
    login: {
        paddingTop: 42,
        paddingLeft: 12,
        paddingRight: 12
    },
    title: {
        fontFamily: 'RammetoOne-Regular',
        fontSize: 37,
        textAlign: 'center',
        margin: 0,
        letterSpacing: 2.4
    },
    heading: {
        fontFamily: 'MuktaMahee-Regular',
        color: globalStyles.$loginHeadingColor,
        fontSize: 20,
        marginTop: 10,
        marginBottom: 43,
        letterSpacing: 1.5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    label: {
        fontFamily: 'MuktaMahee-Regular',
        color: globalStyles.loginLabelColor,
        fontSize: 16
    },
    button: {
        width: 90,
        borderWidth: 1,
        borderColor: globalStyles.$buttonBorderColor,
        padding: 12,
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        marginLeft: 3,
        marginRight: 3
    },
    buttonText: {
        color: globalStyles.$buttonFontColor,
    },
    buttonsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default class Login extends React.Component {
    state = {
        fontLoaded: false,
    }

    async componentDidMount() {
        await Font.loadAsync({
            'RammetoOne-Regular': require('./../../fonts/RammettoOne-Regular.ttf'),
            'MuktaMahee-Regular': require('./../../fonts/MuktaMahee-Regular.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    render() {
        return (
            <View style={styles.login}>
                { this.state.fontLoaded ? (
                    <React.Fragment>
                        <Text style={styles.title}>Messages</Text>
                        <Text style={styles.heading}>Sign in</Text>
                        <View>
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput
                                underlineColorAndroid="#b8b8b8"
                                selectionColor="#b8b8b8"
                            />
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                underlineColorAndroid="#b8b8b8"
                                selectionColor="#b8b8b8"
                            />
                        </View>
                        <View style={styles.buttonsRow}>
                            <TouchableHighlight
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Sign in</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Sign up</Text>
                            </TouchableHighlight>
                        </View>
                    </React.Fragment>
                ) : null }
            </View>
        );
    }
}