import React from 'react'
import { View, Text, StyleSheet } from "react-native"
const Reminder = () => {
    return (
        <View style={styles.card}>
            <View style={styles.details}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.description}>
                    Note that you can customize the styles and layout of the card component as needed to fit your app's design.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
});


export default Reminder



