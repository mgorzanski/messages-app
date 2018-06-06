import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import * as globalStyles from './../styles/globalStyles';
//import { Animated, Easing } from 'react-native';

export const mainRouterConfig = {
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      lazy: false,
      removeClippedSubviews: false,
      style: {
        height: 65,
        backgroundColor: '#1e1e1e',
      },
      labelStyle: {
        color: '#fff',
        position:'absolute',
        top:36,
        fontSize: 12
      },
      tabStyle: {
        height:60,
        margin:0,
        padding:0,
      },
      indicatorStyle: {
        backgroundColor: '#2d2d2d',
        height: 65,
        position: 'absolute',
        top: '50%',
        marginTop: -33
      },
      iconStyle: {
        width: 80,
        height: 80,
        marginTop: -21
      },
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false
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