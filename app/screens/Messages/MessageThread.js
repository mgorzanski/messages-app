import React from 'react';
import { Container, Content, Form, Item, Textarea, Button, Text } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import SingleMessage from './SingleMessage';
import * as globalStyles from './../../styles/globalStyles';
import Icon from './../../utils/Icon';
import PropTypes from 'prop-types';

export default class MessageThread extends React.Component {
    static navigationOptions = ({ navigation }) => ({
            title: navigation.state.params.name,
            headerStyle: globalStyles.headerStyle,
            headerTitleStyle: globalStyles.headerTitleStyle,
            headerRight: (<Icon family="MaterialIcons" name="more-vert" style={globalStyles.stackNavIcon} />),
            headerTintColor: globalStyles.$white
    });

    render() {
        return (
            <Container style={styles.container}>
                <ScrollView>
                    <Content style={styles.thread}>
                        <SingleMessage text="Testowa wiadomość" author="a" />
                        <SingleMessage text="..." author="me" />
                        <SingleMessage text="abcd" author="a" />
                        <SingleMessage text="Testowa wiadomość" author="me" />
                        <SingleMessage text="Testowa wiadomość" author="me" />
                    </Content>
                </ScrollView>
                <Form style={styles.form}>
                    <Item rounded style={styles.item}>
                        <Textarea rowSpan={1} placeholder="Text" rounded style={styles.textarea} />
                    </Item>
                    <Button rounded style={styles.sendButton}><Text>Send</Text></Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    thread: {
        flex: 1,
        margin: 10
    },
    form: {
        paddingLeft:6,
        paddingRight:6,
        backgroundColor: globalStyles.$formBackgroundColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        borderColor: globalStyles.$transparent,
        backgroundColor: globalStyles.$darkGray,
        flex: 1,
        margin:5,
    },
    textarea: {
        height:45,
        width: '100%'
    },
    sendButton: {
        alignSelf: 'center',
        backgroundColor: globalStyles.$sendButtonBackgroundColor
    }
});

MessageThread.propTypes = {
    navigation: PropTypes.object.isRequired
}