import { StyleSheet, TextInput, View, Text, } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CookieManager from '@react-native-cookies/cookies';

const AddEmp = () => {
    const [userid, setUserID] = useState('');
    const handleAddID = async () => {
        try {
            const cookies = await CookieManager.get('http://localhost/8081')
            fetch('http://162.240.226.166:80/adminIdgenereate', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'x-api-key': ` ${cookies.mycookies.value}`
                },
                body: JSON.stringify({ userName: userid })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == true) {
                        alert(data.message + userid)
                    }
                    else {
                        alert(data.message + userid)
                    }
                })
                .catch(error => {
                    alert(error.message)
                });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter User ID"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => setUserID(text)}
                value={userid}
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAddID}>
                <Text style={styles.Addtext}>Add ID</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddEmp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    addBtn: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 200,
        backgroundColor: '#F50057',
    },
    Addtext: {
        color: '#fff',
        fontSize: 28
    }
})
