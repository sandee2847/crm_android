import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, FlatList } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';

const Callaction = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            fetch("http://162.240.226.166:80/callLogs", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'x-api-key': ` ${cookies.mycookies.value}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == false) {
                        alert("No data found!");
                    }
                    else {
                        setData(data.callLogs);
                        setLoading(false);
                        setRefreshing(false);
                    }
                })
                .catch(error => {
                    alert(error);
                    setLoading(false);
                    setRefreshing(false);
                });
        }
        catch (err) {
            alert(err)
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={42} />
            </View>
        );
    }

    const renderItem = ({ item }) => (

        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
        >
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}><Text style={{ fontWeight: '800' }}>AssignTo: </Text> {item.assignTo}</Text>
                    <Text style={styles.title}><Text style={{ fontWeight: '800' }}>Client Contact: </Text>{item.contact}</Text>
                    <Text style={styles.title}><Text style={{ fontWeight: '800' }}>ClientName: </Text>{item.name}</Text>
                    {item.logs &&
                        item.logs.map((log, index) => (
                            <View key={index} style={{ marginTop: 10, backgroundColor: '#9932cc', padding: 10, borderRadius: 10, elevation: 40 }}>
                                <Text style={styles.title1}><Text style={{ fontWeight: '600', fontSize: 20 }}>Call Logs Details:</Text></Text>
                                <Text style={styles.title1}><Text style={{ fontWeight: '600' }}>Type: </Text>{log.type}</Text>
                                <Text style={styles.title1}><Text style={{ fontWeight: '600' }}>Date/time:</Text> {log.dateTime}</Text>
                                <Text style={styles.title1}><Text style={{ fontWeight: '600' }}>Phone number:</Text> {log.phoneNumber}</Text>
                                <Text style={styles.title1}><Text style={{ fontWeight: '600' }}>Duration:</Text> {log.duration} seconds</Text>
                            </View>
                        ))}
                </View>

            </View>
        </ScrollView>
    );
    return (
        <View style={{ paddingBottom: 70 }}>
            <View style={{ marginVertical: 10, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, color: '#000', fontWeight: '700' }}>Call Action</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    fetchData();
                }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        paddingHorizontal: 10,
    },
    itemContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 10,
        marginVertical: 10,
        padding: 20,
    },
    title: {
        color: '#000',
        paddingVertical: 2,
        fontSize: 18,
        marginTop: 5,
    },
    title1: {
        color: '#fff',
        paddingVertical: 2,
        fontSize: 18,
        marginTop: 5,
    },
    body: {
        color: '#000',
        marginVertical: 10,
    },
    id: {
        marginVertical: 3,
        color: 'gray',
        fontSize: 14,
    },
});

export default Callaction;
