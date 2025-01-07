import notifee, { EventType, AndroidImportance } from '@notifee/react-native';

export async function ForegroundHandler(data: any, state: string) {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default_channel',
    name: 'default_channel',
    sound: "buzzer",
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    android: {
      channelId,
      sound: 'buzzer',
      pressAction: {
        id: `${state}`,
      },
    },
  });
}

const handleNotificationPress = async (event: any) => {
  if (event.type === EventType.PRESS) {
    console.log('Notification Pressed in Foreground...', event);
  }
};

notifee.onForegroundEvent(handleNotificationPress);

export default ForegroundHandler;

const handleBackgroundEvent = async (event: any) => {
  if (event.type === EventType.PRESS) {
    console.log('Notification Pressed', event);
  }
};

notifee.onBackgroundEvent(handleBackgroundEvent);