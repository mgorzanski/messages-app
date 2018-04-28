import React from 'react';
import { View, StyleSheet, SectionList, Text, ScrollView, TouchableHighlight } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import AuthLocal from './../../utils/AuthLocal';

export default class SettingsList extends React.Component {
    static navigationOptions = () => ({
        title: "MORE",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerLeft: (<View></View>),
        headerRight: (<View></View>)
    });

    render() {

        return (
            <ScrollView style={styles.settings}>
                <View style={styles.container}>
                    <SectionList
                        sections={[
                            {title: 'My account', data: [{title: 'My profile', screen: 'Profile'}, {title: 'Logout', action: () => AuthLocal.deauthenticate}]},
                            {title: 'Settings', data: [{title: 'Notifications settings', screen: ''}]},
                            {title: 'About app', data: [{title: 'Informations', screen: 'Informations'}]}
                        ]}
                        renderItem={({item}) => (
                            <TouchableHighlight onPress={() => {
                                    if (item.screen) {
                                        this.props.navigation.navigate(item.screen)
                                    } else {
                                        item.action();
                                    }
                                }
                            } underlayColor="#414141">
                                <Text style={styles.item}>{item.title}</Text>
                            </TouchableHighlight>
                        )}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    settings: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    container: {
        flex: 1
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 13,
        paddingRight: 13,
        paddingBottom: 6,
        fontSize: 14,
        fontWeight: 'bold',
        color: globalStyles.$sectionHeaderFontColor,
        backgroundColor: globalStyles.$sectionHeaderBackgroundColor
    },
    item: {
        paddingTop: 10,
        paddingLeft: 13,
        paddingBottom: 10,
        paddingRight:13,
        fontSize: 18,
        height: 54,
        marginTop: 8,
        color: globalStyles.$white
    }
});

SettingsList.propTypes = {
    navigation: PropTypes.object.isRequired
};