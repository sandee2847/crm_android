import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
import { Icon } from 'react-native-elements';
import CallLogs from 'react-native-call-log';
export default function Pending({ navigation }) {
  const [logData, setLogData] = useState([]);
  const abc = (index) => {
    var randomColor = Math.floor(Math.random() * 16777215 * index).toString(16);
    let color = "";
    for (let i = 0; i < 3; i++) {
      color += ("0" + Math.floor(Math.random() * index * Math.pow(16, 2) / 2).toString(10)).slice(-2);
    }
    return `#${color}`
  }

  const [cookies, setCookies] = useState();
  const [list, setList] = useState([]);
  useEffect(() => {
    getCookies();
  }, []);
  const getCookies = async () => {
    try {
      const cookies = await CookieManager.get('http://localhost/8081');
      setCookies(cookies);

      fetch("http://162.240.226.166:80/employee/leads/Pending", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.mycookies.value}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setList(data);
        })
        .catch(err => {
          alert("Something Went Wrong!")
        });
    } catch (error) {
      alert("Something Went Wrong!")
    }





  }
  const connectCall = (contact) => {
    let number = '';
    if (Platform.OS === 'android') {
      number = `tel:${contact}`;
    } else {
      number = `tel:${contact}`;
    }
    Linking.openURL(number);
  }

  const singlePage = async (email, contact, name) => {
    if (Platform.OS != 'ios') {
      try {
        const cookies = await CookieManager.get('http://localhost/8081');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          CallLogs.load(1000).then(c => {
            let num = contact;
            let leadNum = num.slice(num.length - 10, num.length);

            let logs = c.filter(
              item =>
                item.phoneNumber.slice(
                  item.phoneNumber.length - 10,
                  item.phoneNumber.length,
                ) == leadNum,
            );

            fetch("http://162.240.226.166:80/logUpdate", {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${cookies.mycookies.value}`,
              },
              body: JSON.stringify({ email: email, logs: logs }
              )
            })
              .then(res => res.json())
              .then(data => {
                navigation.navigate("Status Main File", { email: email, name: name, contact: contact, logData: logs });
              })
              .catch(err => {
                alert("Something Went Wrong!")
              });
          });
        } else {
          alert('Call Log permission denied!');
        }
      } catch (e) {
        alert("Something Went Wrong!");
      }
    } else {
      alert(
        'Sorry! You can’t get call logs in iOS devices because of the security concern',
      );
    }
  };

  return (
    <SafeAreaView >
      <ScrollView>
        {list?.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => singlePage(item.email, item.contact, item.name)}>
              <View style={[styles.card, { backgroundColor: `${abc(index + 1)}` }]}>
                <Text style={styles.cardName}>Name: {item.name}</Text>
                <Text style={styles.cardDescription}>Email: {item.email}</Text>
                <View style={styles.contactFlex}>
                  <Text style={styles.cardContact}>Contact: {item.contact}</Text>
                  <Icon
                    onPress={() => connectCall(item.contact)}
                    color="white"
                    name="phone"
                  />
                </View>
                <Text style={styles.cardMessage}>Message: {item.message}</Text>
              </View>

            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#a088e0',
    shadowOffset: { width: 0, height: 43 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    margin: 10,
    color: 'white',
  },
  cardName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  cardContact: {
    color: "white",
    fontSize: 20,

    borderRadius: 10,
  },
  cardMessage: {
    fontSize: 25,
    color: "gray",
  },
  contactFlex: {
    flex: 2,
    justifyContent: "flex-start",
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});