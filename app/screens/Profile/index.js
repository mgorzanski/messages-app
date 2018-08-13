import React from "react";
import {
  Thumbnail,
  Container,
  Content,
  Button,
  Form,
  Item,
  Input,
  Label,
  Text,
  Toast
} from "native-base";
import { StyleSheet, View } from "react-native";
import * as globalStyles from "./../../styles/globalStyles";
import Icon from "./../../utils/Icon";
import ProfileApi from "./../../api/ProfileApi";
import { connect } from "react-redux";
import { update } from "./../../actions";
import PropTypes from "prop-types";

class Profile extends React.PureComponent {
  static navigationOptions = () => ({
    title: "Profile",
    headerTintColor: globalStyles.$white
  });

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      showToast: false,
      fullName: this.props.user.data.fullName,
      username: this.props.user.data.username,
      email: this.props.user.data.email,
      password: "",
      repeatPassword: ""
    };
  }

  componentDidMount() {
    ProfileApi.getProfile(
      this.props.user.data.token,
      this.props.user.data.userId
    )
      .then(profileData =>
        this.setState({
          fullName: profileData.fullName,
          username: profileData.username,
          email: profileData.email
        })
      )
      .catch(() =>
        Toast.show({
          text: "Cannot get profile informations",
          buttonText: "Close"
        })
      );
  }

  render() {
    const editMode = this.state.editMode;

    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <Thumbnail
              large
              source={require("./../../img/profile.png")}
              style={styles.profileImage}
            />
            <View style={styles.editButton}>
              <Button
                icon
                light
                onPress={() =>
                  this.setState({ editMode: !this.state.editMode })
                }
              >
                <Icon family="MaterialIcons" name="edit" />
              </Button>
            </View>
            <Form>
              {editMode ? (
                <React.Fragment>
                  <Item stackedLabel>
                    <Label>Full name</Label>
                    <Input
                      rounded
                      defaultValue={this.state.fullName}
                      onChangeText={fullName => this.setState({ fullName })}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Username</Label>
                    <Input
                      rounded
                      defaultValue={this.state.username}
                      onChangeText={username => this.setState({ username })}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>E-mail</Label>
                    <Input
                      rounded
                      defaultValue={this.state.email}
                      onChangeText={email => this.setState({ email })}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Password</Label>
                    <Input
                      rounded
                      onChangeText={password => this.setState({ password })}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Repeat password</Label>
                    <Input
                      rounded
                      onChangeText={repeatPassword =>
                        this.setState({ repeatPassword })
                      }
                    />
                  </Item>
                  <View style={styles.formButtons}>
                    <Button
                      danger
                      style={styles.formButton}
                      onPress={() => this.setState({ editMode: false })}
                    >
                      <Text>Cancel</Text>
                    </Button>
                    <Button
                      light
                      style={styles.formButton}
                      onPress={() => {
                        ProfileApi.updateProfile(
                          this.props.user.data.token,
                          this.props.user.data.userId,
                          this.state.fullName,
                          this.state.username,
                          this.state.email,
                          this.state.password,
                          this.state.repeatPassword
                        )
                          .then(response => {
                            this.setState({ editMode: false });
                            this.props.update(
                              this.state.username,
                              this.state.fullName,
                              this.state.email
                            );
                            Toast.show({
                              text: response.message,
                              buttonText: "Close"
                            });
                          })
                          .catch(() =>
                            Toast.show({
                              text: "An error occurred",
                              buttonText: "Close"
                            })
                          );
                      }}
                    >
                      <Text>Save</Text>
                    </Button>
                  </View>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Item stackedLabel>
                    <Label>Full name</Label>
                    <Input disabled rounded value={this.state.fullName} />
                  </Item>
                  <Item stackedLabel>
                    <Label>Username</Label>
                    <Input disabled rounded value={this.state.username} />
                  </Item>
                  <Item stackedLabel>
                    <Label>E-mail</Label>
                    <Input disabled rounded value={this.state.email} />
                  </Item>
                </React.Fragment>
              )}
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 11,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 5
  },
  profileImage: {
    width: 165,
    height: 165,
    alignSelf: "center"
  },
  editButton: {
    display: "flex",
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 10
  },
  formButtons: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 15
  },
  formButton: {
    marginLeft: 5,
    marginRight: 5
  }
});

const mapDispatchToProps = dispatch => {
  return {
    update: (username, fullName, email) =>
      dispatch(update(username, fullName, email))
  };
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
