import React from 'react';
import { View, Image, StyleSheet, SectionList, Text, ScrollView } from 'react-native';
import Header from './Header';
import * as globalStyles from './../../styles/globalStyles';

export default class Contacts extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/contacts.png')}
                style={styles.tabBarIcon}
            />
        ),
    };

    render() {

        return (
            <ScrollView style={styles.settings}>
                <Header />
                <View style={styles.container}>
                    <SectionList
                        sections={[
                            {title: 'D', data: ['Devin']},
                            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                        ]}
                        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 45,
        height: 45
    },
    settings: {
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
       item: {
         padding: 10,
         fontSize: 18,
         height: 44,
         color: globalStyles.$white
       },
});