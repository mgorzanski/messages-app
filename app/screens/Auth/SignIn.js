import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Text, Button, Form, Input } from "native-base";
import * as globalStyles from "./../../styles/globalStyles";
import PropTypes from 'prop-types';
import {
  material,
  robotoWeights,
  materialColors,
  sanFranciscoWeights
} from "react-native-typography";
import AuthApi from "./../../api/AuthApi";
import { Toast } from "native-base";
import { connect } from "react-redux";
import { login } from "./../../actions";

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.$appBackgroundColor
  },
  content: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 45,
    marginRight: 45
  },
  appTitle: {
    ...material.titleObject,
    ...robotoWeights.light,
    color: materialColors.whitePrimary,
    fontSize: 45,
    paddingTop: 85,
    textAlign: "center"
  },
  loginForm: {
    marginTop: 55
  },
  formInput: {
    color: globalStyles.$white,
    backgroundColor: globalStyles.$formInputTransparentBackgroundColor,
    marginTop: 35
  },
  forgotPasswordText: {
    ...material.titleObject,
    fontSize: 15,
    color: materialColors.whitePrimary,
    ...sanFranciscoWeights.light,
    marginBottom: 40,
    marginTop: 10
  },
  button: {
    width: "100%",
    marginTop: 18,
    height: 50,
    backgroundColor: globalStyles.$white,
    display: "flex",
    justifyContent: "center"
  },
  buttonText: {
    ...material.titleObject,
    ...sanFranciscoWeights.regular,
    color: materialColors.black,
    fontSize: 16
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showToast: false
    };

    console.log(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Text style={styles.appTitle}>Messages</Text>

          <Form style={styles.loginForm}>
            <Input
              placeholder="Email"
              style={styles.formInput}
              underline="false"
              border="false"
              onChangeText={email => this.setState({ email })}
            />
            <Input
              placeholder="Password"
              style={styles.formInput}
              underline="false"
              border="false"
              onChangeText={password => this.setState({ password })}
              secureTextEntry
            />

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Button
                style={styles.button}
                onPress={() => {
                  AuthApi.login(this.state.email, this.state.password)
                    .then(result => {
                      if (result.auth) {
                        const {
                          token,
                          userId,
                          username,
                          fullName,
                          email
                        } = result;
                        this.props.login(
                          token,
                          userId,
                          username,
                          fullName,
                          email
                        );
                        this.props.onUserLogin();
                      } else {
                        Toast.show({
                          text: "An error occurred",
                          buttonText: "Close"
                        });
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                      Toast.show({
                        text: "An error occurred",
                        buttonText: "Close"
                      });
                    });
                }}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button
                style={styles.button}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text style={styles.buttonText}>Sign up</Text>
              </Button>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func,
  onUserLogin: PropTypes.func,
  navigation: PropTypes.object.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);