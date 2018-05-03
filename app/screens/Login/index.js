import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import AuthApi from './../../api/AuthApi';
import { Toast } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './../../actions';

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

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            showToast: false
        }
    }

    render() {
        return (
            <View style={styles.login}>
                <React.Fragment>
                    <Text style={styles.title}>Messages</Text>
                    <Text style={styles.heading}>Sign in</Text>
                    <View>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            underlineColorAndroid="#b8b8b8"
                            selectionColor="#b8b8b8"
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({email})}
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            underlineColorAndroid="#b8b8b8"
                            selectionColor="#b8b8b8"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={(password) => this.setState({password})}
                        />
                    </View>
                    <View style={styles.buttonsRow}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                AuthApi.login(this.state.email, this.state.password).then((result) => {
                                    if (result.auth) {
                                        const { auth, token, userId, username, fullName, email } = result;
                                        this.props.login(token, userId, username, fullName, email);
                                        this.props.onUserLogin();
                                    } else {
                                        Toast.show({
                                            text: 'An error occurred',
                                            buttonText: 'Close'
                                        });
                                    }
                                }).catch((error) => {
                                    console.log(error);
                                    Toast.show({
                                        text: 'An error occurred',
                                        buttonText: 'Close'
                                    });
                                });
                            }}
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
            </View>
        );
    }
}

Login.propTypes = {
    onUserLogin: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        login: (token, userId, username, fullName, email) => dispatch(login(token, userId, username, fullName, email))
    };
};

export default connect(null, mapDispatchToProps)(Login);