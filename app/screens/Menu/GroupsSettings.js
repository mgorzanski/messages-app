import React from 'react';
import { View, StyleSheet, Text, ScrollView, SectionList } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { setDisplayGroupsInTabNavigator } from './../../actions';

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
        color: globalStyles.$white,
    },
    checkbox: {
        paddingTop: 10,
        paddingLeft: 13,
        paddingBottom: 10,
        paddingRight:13,
        flex: 1
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

class GroupsSettings extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
    }

    static navigationOptions = () => ({
        title: "Groups",
        headerTintColor: globalStyles.$white
    });

    componentDidMount() {
        
    }

    render() {
        let displayGroupsInTabNavigator = true;
        if (this.props.settings !== undefined) {
            displayGroupsInTabNavigator = this.props.settings.displayGroupsInTabNavigator;
        }

        return (
            <ScrollView style={styles.settings}>
                <View style={styles.container}>
                    <SectionList
                        sections={[
                            {title: 'Appearance', data: [{title: 'Display groups tab in bottom menu', option: 'displayGroupsInTabNavigator'}]}
                        ]}
                        renderItem={({item}) => (
                            <View style={styles.itemContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    leftText="Display groups tab in bottom menu"
                                    checkBoxColor={globalStyles.$white}
                                    checkedCheckBoxColor={globalStyles.$white}
                                    isChecked={displayGroupsInTabNavigator}
                                    onClick={() => {
                                        this.props.setDisplayGroupsInTabNavigator(!displayGroupsInTabNavigator);
                                    }}
                                    leftTextStyle={styles.item}
                                />
                            </View>
                        )}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = { setDisplayGroupsInTabNavigator };

export default connect(mapStateToProps, mapDispatchToProps)(GroupsSettings);