import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import * as globalStyles from './../styles/globalStyles';
import { View, TouchableOpacity } from 'react-native';
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
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('SearchMessages')
                    } style={globalStyles.headerIcon}>
                        <Icon family="MaterialIcons" name="search" style={globalStyles.vectorIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('NewMessage')
                    } style={globalStyles.headerIcon}>
                        <Icon family="MaterialIcons" name="add-circle-outline" style={globalStyles.vectorIcon} />
                    </TouchableOpacity>
                </View>);
            break;

        case 'MessagesWithGroups':
            title = 'Messages',
            headerRight = (
                <View style={globalStyles.headerMultipleIcons}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('NewGroup')
                    } style={globalStyles.headerIcon}>
                        <Icon family="MaterialIcons" name="group-add" style={globalStyles.vectorIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('SearchMessages')
                    } style={globalStyles.headerIcon}>
                        <Icon family="MaterialIcons" name="search" style={globalStyles.vectorIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('NewMessage')
                    } style={globalStyles.headerIcon}>
                        <Icon family="MaterialIcons" name="add-circle-outline" style={globalStyles.vectorIcon} />
                    </TouchableOpacity>
                </View>);
            break;

        case 'Contacts':
            headerRight = (
                <View style={globalStyles.iconSpacingRight}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('AddContact')
                    }>
                        <Icon family="MaterialIcons" name="person-add" style={globalStyles.vectorIcon} />
                    </TouchableOpacity>
                </View>);
            break;

        case 'Groups':
            headerRight = (
                <View style={globalStyles.iconSpacingRight}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('NewGroup')
                    }>
                        <Icon family="MaterialIcons" name="group-add" style={globalStyles.vectorIcon} />
                    </TouchableOpacity>
                </View>);
            break;
    }

    return {
        title,
        headerRight
    }
}