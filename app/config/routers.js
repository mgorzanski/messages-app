import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import * as globalStyles from './../styles/globalStyles';
import { View, TouchableHighlight } from 'react-native';
import AsyncImage from './../components/AsyncImage';
import React from 'react';
import Icon from './../utils/Icon';

export const mainRouterConfig = {
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeBackgroundColor: '#2d2d2d',
      style: {
        height: 65,
        backgroundColor: '#1e1e1e',
      },
      labelStyle: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 3
      },
      tabStyle: {
        height:65,
        margin:0,
        padding:0,
      }
    }
  };

export const appRouterConfig = {
    cardStyle: {
      opacity: 1
    },
    transitionConfig: getSlideFromRightTransition,
    navigationOptions: {
      headerStyle: globalStyles.headerStyle,
      headerTitleStyle: globalStyles.headerTitleStyle
    }
}

export const loginRouterConfig = {
    ...appRouterConfig,
    navigationOptions: {
        header: null
    }
}

export function getStackNavigatorHeader (navigation) {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let title = routeName;
    let headerRight;

    switch (title) {
        case 'Messages':
            headerRight = (
                <View style={globalStyles.headerMultipleIcons}>
                    <TouchableHighlight onPress={() =>
                        navigation.navigate('SearchMessages')
                    } style={globalStyles.headerIcon}>
                        <AsyncImage 
                            source={require('./../img/icons/search.png')}
                            style={globalStyles.icon}
                            placeholderColor={globalStyles.$headerBackgroundColor}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() =>
                        navigation.navigate('NewMessage')
                    } style={globalStyles.headerIcon}>
                        <AsyncImage 
                            source={require('./../img/icons/add.png')}
                            style={globalStyles.icon}
                            placeholderColor={globalStyles.$headerBackgroundColor}
                        />
                    </TouchableHighlight>
                </View>);
            break;

        case 'MessagesWithGroups':
            title = 'Messages',
            headerRight = (
                <View style={globalStyles.headerMultipleIcons}>
                    <View style={globalStyles.iconSpacingRight}>
                    <TouchableHighlight onPress={() =>
                        this.props.navigation.navigate('AddGroup')
                    }>
                        <Icon family="MaterialIcons" name="group-add" style={globalStyles.vectorIcon} />
                    </TouchableHighlight>
                    </View>
                    <TouchableHighlight onPress={() =>
                        navigation.navigate('SearchMessages')
                    } style={globalStyles.headerIcon}>
                        <AsyncImage 
                            source={require('./../img/icons/search.png')}
                            style={globalStyles.icon}
                            placeholderColor={globalStyles.$headerBackgroundColor}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() =>
                        navigation.navigate('NewMessage')
                    } style={globalStyles.headerIcon}>
                        <AsyncImage 
                            source={require('./../img/icons/add.png')}
                            style={globalStyles.icon}
                            placeholderColor={globalStyles.$headerBackgroundColor}
                        />
                    </TouchableHighlight>
                </View>);
            break;

        case 'Contacts':
            headerRight = (
                <View style={globalStyles.iconSpacingRight}>
                    <TouchableHighlight onPress={() =>
                        navigation.navigate('AddContact')
                    }>
                        <AsyncImage 
                            source={require('./../img/icons/add-user.png')}
                            style={globalStyles.icon}
                            placeholderColor={globalStyles.$headerBackgroundColor}
                        />
                    </TouchableHighlight>
                </View>);
            break;

        case 'Groups':
            headerRight = (
                <View style={globalStyles.iconSpacingRight}>
                    <TouchableHighlight onPress={() =>
                        this.props.navigation.navigate('AddGroup')
                    }>
                        <Icon family="MaterialIcons" name="group-add" style={globalStyles.vectorIcon} />
                    </TouchableHighlight>
                </View>);
            break;
    }

    return {
        title,
        headerRight
    }
}