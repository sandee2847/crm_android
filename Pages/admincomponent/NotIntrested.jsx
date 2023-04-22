import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ActivityIndicator,Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CookieManager from '@react-native-cookies/cookies';


const NotIntersted = () => {
    const [loading, setLoading] = useState(true);
    const [leads, setLeads] = useState([]);
    const [employees, setEmployees] = useState();
    const [selectedTask, setSelectedTask] = useState({});
    const [testing, setTesting] = useState({})
    const [leadDelete, setleadDelete] = useState({})
    const [assignTaskModalVisible, setAssignTaskModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [change, setChange] = useState(false)
    console.log(leadDelete);
    const fetchData = async () => {
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            fetch('http://162.240.226.166:80/leads/Not Intrested', {
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
                        alert(data.message);
                    } else {
                        setLoading(false);
                        setRefreshing(false);
                        setLeads(data.leads);
                    }
                })
                .catch(err => {
                    alert(err);
                });
        } catch (error) {
            alert(error);
        }
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            fetch('http://162.240.226.166:80/empid',
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        'x-api-key': ` ${cookies.mycookies.value}`
                    },
                })
                .then(response => response.json())
                .then(data => {
                    setEmployees(data);
                    setRefreshing(false);
                })
                .catch((err) => {
                    alert("Something went wrong!")
                })
        } catch (error) {
            alert("Something went wrong!");
        }
    };
    useEffect(() => {
        fetchData();
    }, [change]);

    const reassignTask = async () => {
        try {
            const cookies = await CookieManager.get('http://localhost/8081');
            fetch('http://162.240.226.166:80/reAssignLeads', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    // Authorization: `Bearer ${cookies.mycookies.value}`,
                    'x-api-key': ` ${cookies.mycookies.value}`
                },
                body: JSON.stringify({ ...testing, userName: selectedEmployee })
            })

                .then(response => response.json())
                .then(data => {
                    if (data.status == true) {
                        alert(data.message);
                    }
                    else {
                        alert(data.message)
                    }

                })
                .catch((error) => {
                    alert(error)
                });
            setAssignTaskModalVisible(false);
            setSelectedTask({});
            setSelectedEmployee();
        } catch (error) {
            alert(error);
        }
    };

    // handle delete
    const handleDelete = (data) => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to delete the data?',
            [
                {
                    text: 'No',
                    onPress: () => alert('You Choose to Cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const cookies = await CookieManager.get('http://localhost/8081');
                            fetch('http://162.240.226.166:80/deleteLeads',
                                {
                                    method: 'DELETE',
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json",
                                        'x-api-key': `${cookies.mycookies.value}`
                                    },
                                    body: JSON.stringify(data),

                                })
                                .then((response) => response.json())
                                .then(data => {
                                    if (data.status == false) {
                                        alert("data message", data.message);
                                    } else {
                                        alert(data.message)
                                        setRefreshing(false);
                                        setLeads(data.leads);
                                        setChange(!change)
                                    }
                                })
                                .catch((error) => {
                                    alert(error)
                                });

                        } catch (error) {
                            alert(error);
                        }
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    // renderItem
    const RenderItem = ({ id, name, email, contact, message, assignTo, employeeId }) => (
        <View style={styles.leadContainer} key={id}>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Name:</Text>  {name}</Text>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Email:</Text>  {email}</Text>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Contact:</Text> {contact}</Text>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Message:</Text> {message}</Text>
            <Text style={styles.employeeText}><Text style={{ fontWeight: 'bold' }}>Assign to</Text>  {assignTo}</Text>
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.reassignButton} onPress={() => {
                    setTesting({ name: name, email: email, contact: contact, message: message, assignTo: assignTo })
                    setSelectedTask({ name, email, contact, message, });
                    setAssignTaskModalVisible(true);
                }}>
                    <Text style={styles.actionText}>ReAssign</Text>
                </TouchableOpacity>
                {/* delete */}
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        setleadDelete({ employeeId: employeeId, email: email })
                        handleDelete(leadDelete)
                    }}
                >
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={42} color={'blue'} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 10, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, color: '#000', fontWeight: '700' }}>Not Intrested Leads</Text>
            </View>
            <FlatList
                data={leads}
                renderItem={({ item, index }) => <RenderItem
                    id={index}
                    name={item.name}
                    email={item.email}
                    contact={item.contact}
                    message={item.message}
                    assignTo={item.assignTo}
                    userName={item.userName}
                    employeeId={item.employeeId}
                />}
                keyExtractor={(item, index) => {
                    return index;
                }}
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    fetchData();
                }}
            />
            <Modal visible={assignTaskModalVisible} animationType="slide">
                <View style={styles.modal}>

                    <Text style={{ color: '#000', fontSize: 28, marginBottom: 20, textAlign: 'center' }}>Select Employee</Text>
                    <Picker
                        style={{ backgroundColor: 'grey', }}
                        selectedValue={selectedEmployee}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedEmployee(itemValue)
                        }>
                        {employees && employees.id.map((employee, index) => (
                            <Picker.Item
                                style={{ backgroundColor: '#c0c0c0' }}
                                key={index}
                                label={employee.userName}
                                value={employee.userName}
                            />
                        ))}
                    </Picker>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity

                            style={styles.cancelButton}
                            onPress={reassignTask}>
                            <Text style={styles.actionText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                setAssignTaskModalVisible(false);
                                setSelectedTask({});
                                setSelectedEmployee();
                            }}>
                            <Text style={styles.actionText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leadContainer: {
        backgroundColor: '#fff',
        elevation: 10,
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    leadText: {
        fontSize: 18,
    },
    employeeText: {
        fontSize: 18,
        color: '#000',
        marginTop: 5,
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },

    deleteButton: {
        flex:1,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#4169e1',
        borderRadius: 5,

    },
    actionText: {
        color: '#fff',
        fontSize: 22,
    },
    backgroundImage: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        resizeMode: 'cover',
    },
    modal: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    reassignButton: {
        flex:1,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#6a5acd',
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: '#6a5acd',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginRight: 10,
    },
});

export default NotIntersted; 