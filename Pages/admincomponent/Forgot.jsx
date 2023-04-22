import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'

const Forgot = ({ navigation }) => {
    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        try {
            fetch('http://162.240.226.166:80/admiemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == false) {
                        alert(data.message);
                    }
                    else {
                        alert("OTP has been sent to your mail");
                        navigation.navigate('VerfiymailStack');
                    }
                })
                .catch(error => {
                    alert(error);
                });
        }
        catch (err) {
            alert(err)
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.heading}>Forgot Password?</Text>
            </View>
            <TextInput
                style={styles.email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={'Email'}
            />
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </Pressable>
            <View style={styles.backToLogin_Container}>
                <Pressable onPress={() => navigation.navigate('loginStack')}><Text style={styles.backToLogin_Text}>Back To Login</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        color: '#000',
        marginTop: "18%",
        textAlign: "center",
        fontSize: 30,
    },
    email: {
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
    backToLogin_Container: {
        display: "flex",
        alignItems: "center",
        marginTop: 15,
    },
    backToLogin_Text: {
        color: "#000",
        fontSize: 15,
        fontWeight: 'bold',
    },
})

export default Forgot;

