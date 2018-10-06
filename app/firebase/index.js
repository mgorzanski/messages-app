import firebase from "react-native-firebase";

import messages from './notifications/messages';

const auth = () => firebase.auth().signInAnonymouslyAndRetrieveData()
  .then(() => {
    messages.notification();
  });

export default auth;