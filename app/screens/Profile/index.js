import React from 'react';
import { Thumbnail, Container, Content, Button, Form, Item, Input, Label, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import Icon from './../../utils/Icon';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        // paddingTop: 11,
        // paddingLeft: 30,
        // paddingRight: 30,
        // paddingBottom: 5
    },
    profileImage: {
        alignSelf: 'center',
        width: 150,
        height: 150
    },
    editButton: {
        alignSelf: 'flex-end'
    },
    formButtons: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'space-between',
    },
    formButton: {
        marginLeft: 5,
        marginRight:5
    }
});

export default class Profile extends React.PureComponent {
    static navigationOptions = () => ({
        title: "Profile",
        headerTintColor: globalStyles.$white
    });

    render() {
        return (
            <Container>
                <Content style={styles.container}>
                    <Thumbnail large source={require('./../../img/profile.png')} style={styles.profileImage} />
                    <Button icon light>
                        <Icon family="MaterialIcons" name="edit" style={styles.editButton} />
                    </Button>
                    <Form>
                        <Item stackedLabel>
                            <Label>Full name</Label>
                            <Input rounded />
                        </Item>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input rounded />
                        </Item>
                        <Item stackedLabel>
                            <Label>E-mail</Label>
                            <Input rounded />
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
                    </Form>
                </Content>
            </Container>
        );
    }
}