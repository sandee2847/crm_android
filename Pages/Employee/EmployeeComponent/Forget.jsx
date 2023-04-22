import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import CookieManager from '@react-native-cookies/cookies';

const Forget = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [errMessage, setErrmessage] = useState("")

    const forgetPassword = () => {
        try {
            fetch("http://162.240.226.166:80/sendcode", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status == false) {
                        setErrmessage(data.message);
                    } else {
                        CookieManager.set('http://localhost/8081', {
                            name: 'mycookies',
                            value: data.message,
                        }).then(done => {
                        });
                        navigation.navigate('Verify OTP');

                    }
                }).catch((err) => {
                    alert("Something Went Wrong!")
                })
        } catch (err) {
            alert("Something Went Wrong!")
        }

    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Enter Your Email</Text>
            </View>
            <TextInput
                style={styles.email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={'Email'}
            />
            <Text style={styles.error}>{errMessage}</Text>
            <Pressable style={styles.submitButton} onPress={forgetPassword}>
                <Text style={styles.submitText}>Submit</Text>
            </Pressable>
            <View style={styles.backToLogin_Container}>
                <Pressable onPress={() => navigation.navigate('Login Stack')}><Text style={styles.backToLogin_Text}>Back To Login</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#fff"
    },
    heading: {
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
        backgroundColor: "#609EF9",
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
        color: "#6199EA",
        fontSize: 15,
        fontWeight: 'bold',
    },
    error: {
        marginLeft: 50,
    }
})

export default Forget;