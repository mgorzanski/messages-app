import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import * as globalStyles from './../styles/globalStyles';
import { View, TouchableHighlight } from 'react-native';
import AsyncImage from './../components/AsyncImage';
import React from 'react';
import Icon from './../utils/Icon';

export const mainRouterConfig = {
    shifting: false,
    labeled: true,
    barStyle: {
        height: 65,
        backgroundColor: '#1e1e1e',
    }
    // tabBarOptions: {
    //   showIcon: true,
    //   showLabel: true,
    //   upperCaseLabel: false,
    //   lazy: false,
    //   removeClippedSubviews: false,
    //   style: {
    //     height: 65,
    //     backgroundColor: '#1e1e1e',
    //   },
    //   labelStyle: {
    //     color: '#fff',
    //     position:'absolute',
    //     top:36,
    //     fontSize: 12
    //   },
    //   tabStyle: {
    //     height:60,
    //     margin:0,
    //     padding:0,
    //   },
    //   indicatorStyle: {
    //     backgroundColor: '#2d2d2d',
    //     height: 65,
    //     position: 'absolute',
    //     top: '50%',
    //     marginTop: -33
    //   },
    //   iconStyle: {
    //     width: 80,
    //     height: 80,
    //     marginTop: -21
    //   },
    // },
    // tabBarPosition: 'bottom',
    // swipeEnabled: false,
    // animationEnabled: false
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