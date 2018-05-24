import PushNotification from 'react-native-push-notification';

const newMessageNotification = (data) => {
    PushNotification.localNotification({
        autoCancel: true,
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        color: "green",
        vibrate: true,
        vibration: 300,
        title: data.fullName,
        message: data.message,
        playSound: true,
        soundName: 'default',
        actions: '["Respond", "Mark as read"]'
    });
};

const configure = () => {
    PushNotification.configure({
        onNotification: (notification) => {
            console.log('NOTIFICATION', notification);
        }
    })
}

export { configure, newMessageNotification };