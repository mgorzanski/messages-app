import firebase from 'react-native-firebase';
import { newMessageNotification } from './pushNotifications';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    // handle your message
    const notifPromise = new Promise((resolve, reject) => {

      let notification = new firebase.notifications.Notification();
           notification.android.setPriority(firebase.notifications.Android.Priority.High);
           notification.android.setChannelId("test-channel");

     resolve(firebase.notifications().displayNotification(notification));
 }); 

 console.log("MESSAGE IN BACKGROUND OR APP CLOSED");

 return notifPromise.resolve();
}