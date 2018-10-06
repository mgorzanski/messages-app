if (!__DEV__) {
    // eslint-disable-line no-undef
    [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'exception',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'profile',
        'profileEnd',
        'table',
        'time',
        'timeEnd',
        'timeStamp',
        'trace',
        'warn',
    ].forEach(methodName => {
        //eslint-disable-next-line no-console
        console[methodName] = () => {
            /* noop */
        };
    });
}

import { AppRegistry, YellowBox } from 'react-native';
import App from './app/App';
import bgMessaging from './app/bgMessaging';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('messagesapp', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);