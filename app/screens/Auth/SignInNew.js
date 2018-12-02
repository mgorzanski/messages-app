import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Container, Content, Text, Button, Form, Item, Input, Label } from 'native-base';
import * as globalStyles from './../../styles/globalStyles';
import { material, robotoWeights, materialColors, sanFranciscoWeights } from 'react-native-typography';

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.$appBackgroundColor,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 45,
    marginRight: 45
  },
  appTitle: {
    ...material.titleObject,
    ...robotoWeights.light,
    color: materialColors.whitePrimary,
    fontSize: 45,
    paddingTop: 85,
    textAlign: 'center'
  },
  loginForm: {
    marginTop:55,
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
    width: '100%',
    marginTop: 18,
    height: 50,
    backgroundColor: globalStyles.$white,
    display: 'flex',
    justifyContent: 'center'
  },
  buttonText: {
    ...material.titleObject,
    ...sanFranciscoWeights.regular,
    color: materialColors.black,
    fontSize: 16,
  }
});

class SignIn extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Text style={styles.appTitle}>Messages</Text>

          <Form style={styles.loginForm}>
            <Input placeholder="Email" style={styles.formInput} underline="false" border="false" />
            <Input placeholder="Password" style={styles.formInput} underline="false" border="false" />

            <TouchableOpacity><Text style={styles.forgotPasswordText}>Forgot password?</Text></TouchableOpacity>

            <TouchableOpacity><Button style={styles.button}><Text style={styles.buttonText}>Sign in</Text></Button></TouchableOpacity>
            <TouchableOpacity><Button style={styles.button}><Text style={styles.buttonText}>Sign up</Text></Button></TouchableOpacity>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignIn;