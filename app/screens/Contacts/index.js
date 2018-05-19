import React from 'react';
import { View, StyleSheet, SectionList, ScrollView, TouchableHighlight, RefreshControl } from 'react-native';
import { Badge, Text, Toast } from 'native-base';
import * as globalStyles from './../../styles/globalStyles';
import Icon from './../../utils/Icon';
import AsyncImage from './../../components/AsyncImage';
import { connect } from 'react-redux';
import ContactsApi from './../../api/ContactsApi';

class Contacts extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '',
        tabBarIcon: () => (
            <View>
                <AsyncImage
                    source={require('./../../img/icons/contacts.png')}
                    style={globalStyles.tabBarIcon}
                    placeholderColor='#1e1e1e'
                />
                <Badge style={globalStyles.tabBarBadge}>
                    <Text>2</Text>
                </Badge>
            </View>
        ),
        title: "Contacts",
        headerRight: (
            <View style={globalStyles.iconSpacingRight}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('AddContact')
                }>
                    <AsyncImage 
                        source={require('./../../img/icons/add-user.png')}
                        style={globalStyles.icon}
                        placeholderColor={globalStyles.$headerBackgroundColor}
                    />
                </TouchableHighlight>
            </View>)
    });

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            invitations: [],
            invitationsCount: 0,
            contactsList: [],
            refreshing: false,
            showToast: false
        }
    }

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 50);

        this.getInvitations();
        this.getContacts();
    }

    getInvitations() {
        ContactsApi.getInvitations(this.props.user.data.token, this.props.user.data.userId)
        .then((results) => {
            let invitations = results.invitations.filter((invitation) => invitation.fullName);
            this.setState({ invitations, invitationsCount: invitations.length });
        });
    }

    getContacts() {
        ContactsApi.getContacts(this.props.user.data.token, this.props.user.data.userId)
        .then((contacts) => {
            contacts = ContactsApi.spreadContacts(contacts);
            this.setState({ contacts });
        });
    }

    acceptInvitation(inviterId) {
        ContactsApi.acceptInvitation(this.props.user.data.token, this.props.user.data.userId, inviterId)
        .then(() => {
            this.getInvitations();
            Toast.show({
                text: 'Invitation accepted',
                buttonText: 'Close'
            });
        }).catch(() => Toast.show({
            text: 'An error occurred',
            buttonText: 'Close'
        }));
    }

    declineInvitation(inviterId) {
        ContactsApi.declineInvitation(this.props.user.data.token, this.props.user.data.userId, inviterId)
        .then(() => {
            this.getInvitations();
            Toast.show({
                text: 'Invitation declined',
                buttonText: 'Close'
            });
        }).catch(() => Toast.show({
            text: 'An error occurred',
            buttonText: 'Close'
        }));
    }

    render() {
        const render = this.state.render;
        const invitationsCount = this.state.invitationsCount;
        return (
            <ScrollView style={styles.contacts} refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.getInvitations()} />
            }>
                { render ? (
                    <View style={styles.container}>
                        <SectionList
                            sections={[
                                {title: 'Invitations', data: this.state.invitations}
                            ]}
                            renderItem={({item}) => (
                                <View style={styles.invitationView}>
                                    <Text style={styles.item}>{item.fullName}</Text>
                                    <View style={styles.invitationViewIcons}>
                                        <TouchableHighlight onPress={() => this.acceptInvitation(item._id)}>
                                            <Icon family="MaterialIcons" name="check" style={styles.invitationViewIcon} />
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => this.declineInvitation(item._id)}>
                                            <Icon family="FontAwesome" name="remove" style={styles.invitationViewIcon} />
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            )}
                            renderSectionHeader={({section}) => (
                                <View style={styles.invitationsView}>
                                    { (invitationsCount !== 0) ? (
                                        <React.Fragment>
                                            <Text style={styles.sectionInvitationsHeader}>{section.title}</Text>
                                            <Badge style={styles.invitationsViewBadge}>
                                                <Text>{invitationsCount}</Text>
                                            </Badge>
                                        </React.Fragment>
                                    ) : null}
                                </View>
                            )}
                            keyExtractor={(item, index) => index}
                        />
                        <SectionList
                            sections={this.state.contacts}
                            renderItem={({item}) => <Text style={styles.item}>{item.fullName}</Text>}
                            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                ) : (null) }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contacts: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    container: {
        flex: 1,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: globalStyles.$sectionHeaderBackgroundColor,
        color: globalStyles.$white
    },
    sectionInvitationsHeader: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: globalStyles.$sectionHeaderBackgroundColor,
        color: globalStyles.$white
    },
    item: {
        padding: 15,
        fontSize: 18,
        height: 55,
        color: globalStyles.$white
    },
    invitationsView: {
        backgroundColor: globalStyles.$sectionHeaderBackgroundColor,
        display: 'flex',
        flexDirection: 'row'
    },
    invitationsViewBadge: {
        alignSelf: 'center'
    },
    invitationView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    invitationViewIcon: {
        fontSize: 23,
        color: globalStyles.$white,
        marginRight: 13,
        marginLeft: 3
    },
    invitationViewIcons: {
        display: 'flex',
        flexDirection: 'row'
    }
});

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Contacts);