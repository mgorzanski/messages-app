import firebase from "react-native-firebase";

function notification() {
  firebase.messaging().hasPermission()
    .then(() => {
      this.notificationListener = firebase.notifications().onNotification(() => {
        firebase.notifications().displayNotification(newMessageNotification());
      });

      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.log(notification);
    });
    });
}

// function displayNewMessageNotification() {

// }

function newMessageNotification() {
  return new firebase.notifications.Notification()
  .setNotificationId("notificationId")
  .setTitle("My notification title")
  .setBody("My notification body")
  .setData({
    key1: "value1",
    key2: "value2"
  });
}

export default { notification };