import React from 'react';
import { Text, TouchableHighlight, View, TextInput, StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import AuthApi from './../../api/AuthApi';
import { Toast } from 'native-base';
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
        marginBottom: 40,
        letterSpacing: 2.4
    },
    label: {
        fontFamily: 'MuktaMahee-Regular',
        color: globalStyles.loginLabelColor,
        fontSize: 16
    },
    button: {
        width: 290,
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
        flexDirection: 'column',
        alignItems: 'center'
    }
});

class SignUp extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            email: '',
            username: '',
            password: '',
            repeatPassword: ''
        }
    }

    render() {
        return (
            <View style={styles.login}>
                <React.Fragment>
                    <Text style={styles.title}>Sign up</Text>
                    <View>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            underlineColorAndroid="#b8b8b8"
                            selectionColor="#b8b8b8"
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({email})}
                        />
                        <Text style={styles.label}>Full name</Text>
                        <TextInput
                            underlineColorAndroid="#b8b8b8"
                            selectionColor="#b8b8b8"
                            autoCapitalize="none"
                            onChangeText={(fullName) => this.setState({fullName})}
                        />
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            underlineColorAndroid="#b8b8b8"
                            selectionColor="#b8b8b8"
                            autoCapitalize="none"
                            onChangeText={(username) => this.setState({username})}
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            underlineColorAndroid="#b8b8b8"
                            selectionColor="#b8b8b8"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={(password) => this.setState({password})}
                        />
                        <Text style={styles.label}>Repeat password</Text>
                        <TextInput
                            underlineColorAndroid="#b8b8b8"
                            selectionColor="#b8b8b8"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                        />
                    </View>
                    <View style={styles.buttonsRow}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                AuthApi.register(this.state.username, this.state.fullName, this.state.email, this.state.password).then(() => {
                                    Toast.show({
                                        text: 'User successfully created. Go back and login.',
                                        buttonText: 'Close'
                                    });
                                }).catch(() => {
                                    Toast.show({
                                        text: 'An error occurred',
                                        buttonText: 'Close'
                                    });
                                });
                            }}
                        >
                            <Text style={styles.buttonText}>Sign up</Text>
                        </TouchableHighlight>
                    </View>
                </React.Fragment>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (token, userId, username, fullName, email) => dispatch(login(token, userId, username, fullName, email))
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        state,
        ownProps
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);