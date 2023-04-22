import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';

const Verifymail = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleSubmit = () => {
        try {
            fetch('http://162.240.226.166:80/adminverfiypassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == false) {
                        alert(data.message);

                    } else {
                        navigation.navigate('GeneratepassStack');
                    }
                })
                .catch(error => {
                    alert('Error verifying email:', error.message);
                });
        }
        catch (err) {
            alert(err)
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="OTP"
                onChangeText={(text) => setOtp(text)}
                value={otp}
            />
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        fontSize: 16,
        backgroundColor: '#fff',
        height: 45,
        width: 300,
        margin: 12,
        padding: 10,
    },
    submitButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: "#F50057",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        width: 180
    },
    submitText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: "#fff",
        letterSpacing: 1.3
    },
});

export default Verifymail;
