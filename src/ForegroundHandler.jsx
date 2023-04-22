import PushNotification from "react-native-push-notification";
import React, { useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
export const Foreground = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const { title, message } = remoteMessage;
            PushNotification.localNotification({
                title: title,
                message: message,
                repeatType: "day",
                playSound: true,
                body: "New Notifications"
            });
        });
        return (unsubscribe);
    }, [])
    return null;
}
