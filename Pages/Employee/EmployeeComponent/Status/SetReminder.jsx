import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';

export const SetReminder = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTime, setSelectedtime] = useState('Select Time');
  const showDatePicker = () => {
    setDatePickerVisibility(true);

  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const currentDate = new Date();
    const currentSec = currentDate.getTime();
    const dateTaken = new Date(date);
    const dtString = dateTaken.toISOString().split('T');
    const splitDate = dtString[0].split('-');
    const diff = Math.abs((currentDate.getTime() - dateTaken.getTime()) / 1000)
    setSelectedDate(diff + 3600)
    sendDataToBackend({ date: splitDate });
    hideDatePicker();
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.alarm}
        onPress={() => {
          showDatePicker();
        }}
      >
        <Icon name="alarm" color="white"
         />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}

      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  touchable: {
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    color: "gray",
  },
  alarm: {
    margin: 5,
    backgroundColor: '#ddc84e',
    borderRadius: 50,
    padding: 10,
  },
});
