import PushNotification from 'react-native-push-notification';

const newMessageNotification = (data) => {
    PushNotification.localNotification({
        autoCancel: true,
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        bigText: "",
        subText: "",
        color: "green",
        vibrate: true,
        vibration: 300,
        title: data.fullname,
        message: data.message,
        playSound: true,
        soundName: 'default',
        actions: '["Respond", "Mark as read"]'
    });
};

const localNotification = () => {
    PushNotification.localNotification({
      autoCancel: true,
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      bigText: "My big text that will be shown when notification is expanded",
      subText: "This is a subText",
      color: "green",
      vibrate: true,
      vibration: 300,
      title: "Notification Title",
      message: "Notification Message",
      playSound: true,
      soundName: 'default',
      actions: '["Accept", "Reject"]',
    });
   };

const configure = () => {
    PushNotification.configure({
        onNotification: (notification) => {
            console.log('NOTIFICATION', notification);
        }
    })
}

export { configure, localNotification, newMessageNotification };