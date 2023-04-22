import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import CookieManager from '@react-native-cookies/cookies';

const ResetPassword = ({ navigation }) => {
    const [password, setPassword] = useState("")
    const [errMessage, setErrmessage] = useState("")

    const passwordChange = async () => {

        try {
            const cookies = await CookieManager.get('http://localhost/8081');

            fetch("http://162.240.226.166:80/reset/password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${cookies.mycookies.value}`,
                },
                body: JSON.stringify({
                    password,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status == false) {
                        setErrmessage(data.message)
                        return;
                    } else {
                        navigation.navigate("Login Stack")
                    }

                })
                .catch(err => {
                    alert(err)
                });
        } catch (error) {
        }

    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Enter Your New Password</Text>
            </View>
            <TextInput
                style={styles.email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder={'New Password'}
            />
            <Text style={styles.error}>{errMessage}</Text>
            <Pressable style={styles.submitButton} onPress={passwordChange}>
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
        marginTop: 30,
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
        marginLeft: 50
    }
})

export default ResetPassword;