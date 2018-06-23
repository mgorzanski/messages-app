import React from 'react';
import { Thumbnail, Container, Content, Button, Form, Item, Input, Label, Text, Toast } from 'native-base';
import { StyleSheet, View } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import Icon from './../../utils/Icon';
import ProfileApi from './../../api/ProfileApi';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 11,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 5
    },
    profileImage: {
        width: 165,
        height: 165,
        alignSelf: 'center'
    },
    editButton: {
        display: 'flex',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 10
    },
    formButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15
    },
    formButton: {
        marginLeft: 5,
        marginRight:5,
    }
});

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
            profileData: {}
        };
    }

    componentWillMount() {
        ProfileApi.getProfile(this.props.user.data.token, this.props.user.data.userId)
            .then((profileData) => {
                this.setState({ profileData });
            })
            .catch(() => Toast.show({
                text: 'Cannot get any threads',
                buttonText: 'Close'
            }));
    }

    render() {
        const editMode = this.state.editMode;
        const profileData = this.state.profileData;

        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                    <Thumbnail large source={require('./../../img/profile.png')} style={styles.profileImage} />
                    <View style={styles.editButton}>
                        <Button icon light onPress={() => this.setState({ editMode: !this.state.editMode })}>
                            <Icon family="MaterialIcons" name="edit" />
                        </Button>
                    </View>
                    <Form>
                        { editMode ? (
                            <React.Fragment>
                                <Item stackedLabel>
                                    <Label>Full name</Label>
                                    <Input rounded defaultValue={profileData.fullName} />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Username</Label>
                                    <Input rounded defaultValue={profileData.username} />
                                </Item>
                                <Item stackedLabel>
                                    <Label>E-mail</Label>
                                    <Input rounded defaultValue={profileData.email} />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Password</Label>
                                    <Input rounded />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Repeat password</Label>
                                    <Input rounded />
                                </Item>
                                <View style={styles.formButtons}>
                                    <Button danger style={styles.formButton}><Text>Cancel</Text></Button>
                                    <Button light style={styles.formButton}><Text>Save</Text></Button>
                                </View>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Item stackedLabel>
                                    <Label>Full name</Label>
                                    <Input disabled rounded value={profileData.fullName} />
                                </Item>
                                <Item stackedLabel>
                                    <Label>Username</Label>
                                    <Input disabled rounded value={profileData.username} />
                                </Item>
                                <Item stackedLabel>
                                    <Label>E-mail</Label>
                                    <Input disabled rounded value={profileData.email} />
                                </Item>
                            </React.Fragment>
                        ) }
                    </Form>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Profile);