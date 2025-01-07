import { PermissionsAndroid } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import ForegroundHandler from './src/helper/ForgroundHelper';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from './src/components/BottomSheet';
import DeviceInfo from 'react-native-device-info';
import { AxiosInstance } from './src/services/service';

const App = () => {
  let userId = "9632";
  let firebaseToken = "d4hobp7nTW65mtvv9OrA0D:APA91bEDF_eazrwPZT8BHFPVaLj8fXMpuaTk1w0n_Awd-yr_kqsK8ukM2svlKnUsznMzzXzEEqeWXvXbPNK_C6bftrahv8x58yyZe5F38UJMr2TaIA6VwBg";

  const getId = async () => {
    let id = await DeviceInfo.getUniqueId();
    console.log(id, "uniqueId");
  }

  const helloMessage = async () => {
    try {
      const response = await AxiosInstance.post(`/add_user_token?user_id=${userId}&firebase_token=${firebaseToken}`);
      console.log("Data Uploaded Successfully", response?.data);
    } catch (error) {
      console.error("Error uploading");
    }
  };


  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    pushNotification();
    getId();
    helloMessage();

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