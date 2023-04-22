import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import Papa from "papaparse"
import CookieManager from '@react-native-cookies/cookies';

const Selectfile = () => {
    const [fileResponse, setFileResponse] = useState([]);
    const [jsonData, setJsonData] = useState();

    const [dataToken, setDataToken] = useState();
    // get emp emails whose allocated leads
    const [empEmail, setempEmail] = useState();
    // get emails stored in database
    const [getEmail, setGetEmail] = useState();
    // get tokens stored in database
    const [gettoken, setGetToken] = useState();

    const [exactvalue, setExactValue] = useState()

    const getTokenValue = async () => {
        try {
            fetch('http://162.240.226.166:80/get/allToken', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == true) {
                        setDataToken(data.message)
                        const myEmailValue = data.message.map((emailValue) => emailValue.email)
                        setGetEmail(myEmailValue);
                        const myTokenValue = data.message.map((tokenValue) => tokenValue.token)
                        setGetToken(myTokenValue);
                    }
                    else {
                        alert("Something went wrong");
                    }
                })
                .catch(err => {
                    alert(err.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }
    useEffect(() => {
        getTokenValue();
    }, [])

    const testing = async () => {
        try {
            const fileResponse = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            if (fileResponse[0]) {
                const response = await fetch(fileResponse[0].uri);
                const fileData = await response.text();
                const parsedData = Papa.parse(fileData.trim(), {
                    header: true,
                    skipEmptyLines: true,
                    newline: "\n",
                });
                setJsonData(parsedData.data)
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const upload = async () => {
        try {
            const cookies = await CookieManager.get('http://localhost/8081')
            fetch('http://162.240.226.166:80/leads', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'x-api-key': ` ${cookies.mycookies.value}`,
                },
                body: JSON.stringify({ task: jsonData })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === true) {
                        const myEmail = data.leads.map((obj) => obj.email)
                        setempEmail(myEmail)
                        alert('Data send successfully')
                        const tokens = getEmail.map((item, index) => {
                            if (myEmail.includes(item)) {
                                return index;
                            }
                        })
                        const tokenemail = tokens.map((index) => {
                            if (index === undefined) {
                                return null;
                            }
                            return getEmail[index]
                        })
                        const tokensValue = tokenemail.map(email => {
                            const matchingObject = dataToken.find(obj => obj.email === email);
                            return matchingObject ? matchingObject.token : null;
                        });

                        setExactValue(tokensValue.filter(item => item !== null && item !== undefined));

                        sentNotify();
                    }
                    else {
                        alert("Please select file before upload");
                    }
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }

    const sentNotify = async () => {
        try {
            fetch('http://162.240.226.166:80/fcm', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ token: exactvalue })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === true) {
                        alert("Send Notification Successfully");
                    }
                    else {
                        alert("Send Notification UnSuccessfully");
                    }
                })
                .catch(err => {
                    alert(err);
                });
        } catch (error) {
            alert(error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable style={styles.btn}>
                <Text style={{ color: "#fff", fontSize: 18 }} onPress={testing} >Select CSV file</Text>
            </Pressable>
            <Pressable style={styles.btn}>
                <Text style={{ color: "#fff", fontSize: 18 }} onPress={upload} >Upload CSV file</Text>
            </Pressable>
        </View>
    );
};

export default Selectfile;


const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 200,
        backgroundColor: "#F50057",
        marginBottom: 10,
    }
})





