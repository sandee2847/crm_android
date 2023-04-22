import PushNotification from "react-native-push-notification";

const sendNotification = (title, message) => {
  PushNotification.createChannel({   
    channelId: "abcde",
    channelName: "Alpha1",
    channelDescription: "A channel to categorise your notifications",
    playSound: false,
    soundName: "default",
    vibrate: true,
  },
    (created) => console.log(''))
}

const notifyTemp=()=>{
  PushNotification.localNotification({
    channelId: "abcd",
    autoCancel: true,
    bigText: 'New Task Assigned from Admin',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Lead Info',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]'
  });
}

const cancelNotification = () => { 
  PushNotification.cancelAllLocalNotifications()
}


const pushNotifications = (data) => {
  PushNotification.localNotificationSchedule({
    channelId: "abcd",
    message: "My Notification Message", 
    date: new Date(Date.now() +data), 
    allowWhileIdle: false, 
  });
}

export { sendNotification, cancelNotification, pushNotifications ,notifyTemp} ;