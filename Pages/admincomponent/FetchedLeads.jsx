import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const FetchedLeads = ({ route }) => {
    // Get employee ID from the navigation parameters
    const { employeeId } = route.params;

    const [leads, setLeads] = useState([]);

    useEffect(() => {
        // fetch allocated leads based on employee ID
        fetch(`https://example.com/employees/${employeeId}/leads`)
            .then(response => response.json())
            .then(data => setLeads(data))
            .catch(error => console.error(error));
    }, []);

    const renderLeadItem = ({ item }) => (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Text style={{ fontSize: 20, color: '#000' }}><Text style={{ fontWeight: '800' }}>Lead Name:</Text> {item.name}</Text>
                    <Text style={{ fontSize: 20, color: '#000' }}><Text style={{ fontWeight: '800' }}>Contact:</Text> {item.contact}</Text>
                    <Text style={{ fontSize: 20, color: '#000' }}><Text style={{ fontWeight: '800' }}>Email: </Text>{item.email}</Text>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fetched Leads</Text>
            <FlatList
                data={leads}
                renderItem={renderLeadItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    container1: {
        margin: 10,
        backgroundColor: '#f8f8ff',
        elevation: 10,
        flex: 1,
        padding: 20,
    },
    title: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default FetchedLeads;
