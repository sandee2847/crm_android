import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
export default function Archived() {

  //
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

      fetch("http://162.240.226.166:80/employee/leads/Completed", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.mycookies.value}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setList(data);
        })
        .catch((err) => {
          alert("Something Went Wrong!")
        });
    } catch (error) {
      alert("Something Went Wrong!")
    }
  };

  return (

    <SafeAreaView >
      <ScrollView>
        {list.map((item, index) => {
          return (
            <TouchableOpacity key={index}>
              <View style={[styles.card, { backgroundColor: `${abc(index + 1)}` }]}>
                <Text style={styles.cardName}>Name: {item.name}</Text>
                <Text style={styles.cardDescription}>Email: {item.email}</Text>
                <Text style={styles.cardContact}>Contact: {item.contact}</Text>
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

  }
});
