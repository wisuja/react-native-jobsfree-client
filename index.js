import { registerRootComponent } from 'expo';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification';

import App from './App';
import { Provider } from './src/context';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  // onAction: function (notification) {
  //   console.log("ACTION:", notification.action);
  //   console.log("NOTIFICATION:", notification);

  // process the action
  // },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  // onRegistrationError: function(err) {
  //   console.error(err.message, err);
  // },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: 'jobsfree_notifications', // (required)
    channelName: 'Jobsfree', // (required)
    channelDescription: 'A channel for Jobsfree Application', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

const provider = () => (
  <Provider>
    <App />
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </Provider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(provider);
