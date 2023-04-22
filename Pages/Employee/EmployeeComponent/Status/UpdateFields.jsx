import React, { useState, useEffect } from 'react'
import CookieManager from '@react-native-cookies/cookies';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const UpdateFields = ({ navigation, email }) => {

  const [token, setToken] = useState('');
  const getTokenValue = async () => {
    try {
      fetch('http://162.240.226.166:80/single/notification/token', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: "sandeep1@gmail.com" })
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == true) {
            console.log("datamessagetoken", data.message.token);
            setToken(data.message.token)
          }
          else {
            console.log("Something went wrong");
          }
        })
        .catch(err => {
          console.log("my error one", err);
        });
    } catch (error) {
      console.log("my error two", error);
    }
  }
  useEffect(() => {
    getTokenValue();
  }, [])

  const [select, setSelect] = useState("");
  const statusObject = [
    { title: 'Not Interested', link: 'NotInterestedStack', color: "#d1b9eb" },
    { title: 'Completed', link: 'ArchivedStack', color: "#f7c599" },
  ];

  const updateToComplete = async () => {
    console.log("on update")
    try {
      const cookies = await CookieManager.get('http://localhost/8081');
      //   setCookies(cookies);

      fetch("http://162.240.226.166:80/status/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.mycookies.value}`,
        },
        body: JSON.stringify({
          email,
          status: "Completed"
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status == false) {
            console.log(data)
            return;
          } else {
            alert(data.message)
            navigation.navigate("Home Stack")

          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }

  }


  const updateToComplete2 = async () => {
    let msg = "Recieved Not Intrested Lead";
    try {
      const cookies = await CookieManager.get('http://localhost/8081');
      fetch("http://162.240.226.166:80/status/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.mycookies.value}`,
        },
        body: JSON.stringify({
          email,
          status: "Not Intrested"
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status == false) {
            console.log("mydata", data)
            return;
          } else {
            alert(data.message)
            updateNotIntersted()
            navigation.navigate("Home Stack")

          }
        })
        .catch(err => {
          console.log("error", err);
        });
    } catch (error) {
      console.log("myerror", error);
    }

    try {
      fetch('http://162.240.226.166:80/fcm', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: [token] })
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === true) {
            console.log("if", data.message)
          }
          else {
            console.log("else", data.message)
          }
        })
        .catch(err => {
          console.log("my error one", err);
        });
    } catch (error) {
      console.log("my error two", error);
    }
  }
  const updateNotIntersted = async () => {
    try {
      const cookies = await CookieManager.get('http://localhost/8081');
      fetch("http://162.240.226.166:80/notInterested", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${cookies.mycookies.value}`,
        },
        body: JSON.stringify({ email }),
      })
        .then(res => res.json())
        .then(data => {
          console.log("data", data)
        })
        .catch(err => {
          console.log("error", err);
        });
    } catch (error) {
      console.log("myerror", error);
    }
  }

  return (
    <View style={styles.bottomSheet}>
      <View style={styles.hover}>
        <TouchableOpacity
          style={{
            flex: 2,
            justifyContent: "flex-start",
            flexDirection: 'row',
            paddingBottom: 10,
            paddingTop: 20,
            paddingLeft: 20,
            borderColor: '#c2bdcf8f',
            backgroundColor: `#d1b9eb`,
            color: "white",
            borderRadius: 10,
            borderBottomWidth: 1,
          }}
          onPress={() => updateToComplete2()}
        >
          <View
            style={{
              backgroundColor: "white",
              color: "white",
              borderRadius: 10,
              width: 15,
              height: 15,
              margin: 9,
            }}>
          </View>
          <View
          >
            <Text
              style={{
                fontSize: 20,
                color: "white"
              }}>
              Not Intersted
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 2,
            justifyContent: "flex-start",
            flexDirection: 'row',
            paddingBottom: 10,
            paddingTop: 20,
            paddingLeft: 20,
            borderColor: '#c2bdcf8f',
            backgroundColor: `#f7c599`,
            color: "white",
            borderRadius: 10,
            borderBottomWidth: 1,
          }}
          onPress={() => updateToComplete()}
        >
          <View
            style={{
              // backgroundColor: `${elem.color}`,
              backgroundColor: "white",
              color: "white",
              borderRadius: 10,
              width: 15,
              height: 15,
              margin: 9,
            }}>
          </View>
          <View
          >
            <Text
              style={{
                fontSize: 20,
                color: "white"
              }}>
              Complete
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UpdateFields;
const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    borderTopColor: "gray",
  },
  hover: {
    width: "100%",
    height: 160,
    margin: 0,
  },
  closeButton: {
    width: 30,
    height: 50,
    fontSize: 25,
    marginLeft: 300,
  }
});
