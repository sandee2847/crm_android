import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';

const Empstatus = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [labelState, setLabelState] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            fetch('http://162.240.226.166:80/callLogs', {
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
                        alert("No data found!")
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
        } catch (err) {
            alert(err)
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={42} />
            </View>
        );
    }

    return (
        <View style={{ paddingBottom: 50 }}>
            <View style={{ marginVertical: 10, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, color: '#000', fontWeight: '700' }}>Employee Status</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.container}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Text style={styles.title}><Text style={{ fontWeight: '600' }}>AssignTo:</Text> {item.assignTo}</Text>
                            <Text style={styles.title}><Text style={{ fontWeight: '600' }}>Client Name:</Text> {item.name}</Text>
                            <Text style={styles.title}><Text style={{ fontWeight: '600' }}>Client Contact:</Text> {item.contact}</Text>
                            <Text style={styles.id}><Text style={{ fontWeight: '600', color: '#483d8b' }}>Client Status:</Text> <Text style={{ color: '#800000' }}>{item.work}</Text></Text>
                            <Text style={styles.id}><Text style={{ fontWeight: '600', color: '#483d8b' }}>Leads Status:</Text> <Text style={{ color: 'green' }}>{172800 > parseInt((new Date() - new Date(item.createAt)) / 1000) ? "Hot" : 345600 > new Date(item.createAt) ? "Cold" : "Warm"}</Text></Text>
                        </View>
                    ))}
                </View>
            </ScrollView >
        </View>

    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        padding: 10,
    },
    itemContainer: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 10,
        marginVertical: 10,
        padding: 10,
    },
    title: {
        color: '#000',
        paddingVertical: 2,
        fontSize: 18,
    },
    body: {
        fontSize: 16,
        color: '#000',
        marginVertical: 10,
    },
    id: {
        marginVertical: 3,
        color: '#000',
        fontSize: 16,
    },
});

export default Empstatus;
