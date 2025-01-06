import { PermissionsAndroid } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import ForegroundHandler from './src/helper/ForgroundHelper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from './src/components/BottomSheet';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  const getId = async () => {
    let id = await DeviceInfo.getUniqueId();
    console.log(id, "uniqueId");
  }

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    pushNotification();
    getId();

    // for foreground State
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notification recieve in foreground state', remoteMessage);
      ForegroundHandler(remoteMessage, 'Foreground');
    });

    // for background and kill state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Notification recieve in background state!', remoteMessage);
    });

    // for clicking msg and opening app
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notifcation pressed in background',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification pressed in kill state',
            remoteMessage.notification,
          );
        }
      });

    return unsubscribe;
  }, []);

  async function pushNotification() {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('token', fcmToken);
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet />
    </GestureHandlerRootView>
  );
};

export default App;