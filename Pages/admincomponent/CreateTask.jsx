import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';

import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import CookieManager from '@react-native-cookies/cookies';

const CreateTask = () => {

    let emp = null;
    let mytoken = null;

    const [empList, setEmpList] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const [empValue, setEmpValue] = ('')
    const [sendToken, setSendToken] = ('')

    const [dataToken, setDataToken] = useState();
    console.log("dataToken", dataToken);
    // get emails stored in database
    const [getEmail, setGetEmail] = useState();
    console.log("getEmail", getEmail);
    // get tokens stored in database
    const [gettoken, setGetToken] = useState();
    console.log("gettoken", gettoken);
    console.log("empList", empList);

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
                        console.log("data", data);
                        setDataToken(data.message)
                        const myEmailValue = data.message.map((emailValue) => emailValue.email)
                        setGetEmail(myEmailValue);
                        const myTokenValue = data.message.map((tokenValue) => tokenValue.token)
                        setGetToken(myTokenValue);
                    }
                    else {
                        console.log("Something went wrong");
                    }
                })
                .catch(err => {
                    alert("my error one", err);
                });
        } catch (error) {
            alert("my error two", error);
        }
    }

    const handelCreateTask = async () => {
        // get employee id for assign task
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            fetch('http://162.240.226.166:80/empid', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'x-api-key': ` ${cookies.mycookies.value}`
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == true) {
                        getTokenValue();
                        const empArray = data.id.map((emp) => {
                            return { label: emp.userName, email: emp.email, value: emp.employeeId };
                        });
                        setEmpList(empArray);
                    } else {
                        alert("Something went wrong");
                    }
                })
        } catch (error) {
            alert("Something went wrong");
        }
    }

    const renderLabel = () => {
        const getEmp = empList.filter((notify) => {
            return notify.value === value;
        }).map((notify) => {
            return ([notify.value, notify.email]);
        });
        const getValue = () => {
            let arr = getEmp.flat()
            for (let i = 0; i < arr.length; i++) {
                return arr[1]
            }
        }
        emp = getValue();
        if (dataToken) {
            dataToken.forEach((item) => {
                if (item.email === emp) {
                    mytoken = item.token;
                }
            });
        }
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Select Employee
                </Text>
            );
        }
        return null;
    };
    // Manual Task Create
    const handleSubmit = async () => {
        const msg = "You have new leads!";
        const data = {
            name: name,
            contact: contact,
            email: email,
            message: msg,
            employeeId: value
        };
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            const response = await fetch('http://162.240.226.166:80/reAllocate', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'x-api-key': ` ${cookies.mycookies.value}`
                },
                body: JSON.stringify(data)
            });
            response.json()
                .then(data => {
                    if (data.status == true) {
                        alert("Task created successfully!");
                        setName('');
                        setContact('');
                        setEmail('');
                        setMsg('');
                        setValue(null);
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    alert("Something went wrong!");
                });
        } catch (error) {
            alert("Something went wrong!");
        }

        try {
            fetch('http://162.240.226.166:80/fcm', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ token: [mytoken] })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === true) {
                        console.log(data.message)
                    }
                    else {
                        console.log(data.message)
                    }
                })
                .catch(err => {
                    console.log("my error one", err);
                });
        } catch (error) {
            console.log("my error two", error);
        }
    };
    return (
        <>
            <KeyboardAvoidingView behavior="height" style={styles.container}>
                <View style={styles.container1}>
                    <ScrollView style={styles.scroll_view} keyboardDismissMode="on-drag">
                        <View style={styles.formgroup}>
                            <Text style={styles.Manual_task}>Create Manual Task</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000"
                                placeholder="Client Name"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setName(text)}
                                value={name}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000"
                                placeholder="Client Contact"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setContact(text)}
                                value={contact}
                                keyboardType='decimal-pad'
                                maxLength={10}
                                MinLength={10}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000"
                                placeholder="Client Email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#000"
                                placeholder="Client Message"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setMsg(text)}
                                value={msg}
                            />
                            <TouchableOpacity onPress={handelCreateTask}>
                                <View style={styles.container2}>
                                    {renderLabel()}
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={empList}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select Employee' : '...'}
                                        searchPlaceholder="Search..."
                                        value={value}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setValue(item.value);
                                            console.log("item.value", item.value);
                                            setIsFocus(false);
                                        }}
                                        renderLeftIcon={() => (
                                            <AntDesign
                                                style={styles.icon}
                                                color={isFocus ? 'blue' : 'black'}
                                                name="Safety"
                                                size={20}
                                            />
                                        )}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: '800' }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default CreateTask;

// css
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        backgroundColor: '#fff',
        flex: 1,
    },
    scroll_view: {
        flex: 1,
    },
    Card2: {
        width: "100%",
        height: 80,
        flexDirection: "row",
    },
    Text: {
        padding: 20,
    },
    formgroup: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 3,
    },
    input: {
        marginVertical: 20,
        borderColor: 'grey',
        fontSize: 16,
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 50,
        width: '85%',
        borderWidth: 1,
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        paddingVertical: 5,
        marginBottom: 3,
        paddingHorizontal: 10,
    },
    Manual_task: {
        paddingVertical:5,
        color: '#000',
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 28,
        flex: 1,
        justifyContent: 'center',
        
    },
    submit: {
        marginTop: 10,
        flex: 1,
        width: '85%',
        height: 50,
        borderRadius: 20,
        backgroundColor: '#F50057',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
    },
    dropdown: {
        marginBottom: 10,
        backgroundColor: '#d3d3d3',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        height: 50,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        color: '#000',
        position: 'absolute',
        backgroundColor: 'white',
        left: 50,
        top: 0,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
















