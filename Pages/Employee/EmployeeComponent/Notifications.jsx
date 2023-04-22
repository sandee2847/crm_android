import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { sendNotification, cancelNotification, pushNotifications, notifyTemp } from "./Notifications/notifictions.android"
const Notifications = () => {

  sendNotification()

  const notificationCallAfter = () => {
    notifyTemp()
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={{
        backgroundColor: "green", height: 50, justifyContent: "center", alignContent: "center",
      }}
        onPress={() => { notificationCallAfter() }}>
        <Text style={{ color: "#fff", fontSize: 18 }} >Send Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
        backgroundColor: "green", height: 50, justifyContent: "center", alignContent: "center",
      }}
        onPress={cancelNotification}>
        <Text style={{ color: "#fff", fontSize: 18 }}>CancelNotification</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
        backgroundColor: "green", height: 50, justifyContent: "center", alignContent: "center",
      }}
        onPress={pushNotifications(10000)}>
        <Text style={{ color: "#fff", fontSize: 18 }}>PushNotification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: "green", height: 50, justifyContent: "center", alignContent: "center",
      }}
        onPress={() => { notificationCallAfter("Hii...", "notification", id) }}>
        <Text style={{ color: "#fff", fontSize: 18 }} >Send Notification 2nd time</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notifications;
