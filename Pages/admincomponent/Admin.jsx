import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CookieManager from '@react-native-cookies/cookies';


const Admin = ({ navigation }) => {
    // const getEmp= async ()=>{
    //     try {
    //         const cookies = await CookieManager.get('http://localhost/8081');
    //         fetch('http://162.240.226.166:80/leads/Allocated', {
    //             method: 'GET',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //                 'x-api-key': ` ${cookies.mycookies.value}`
    //             },
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.status == false) {
    //                     alert(data.message);
    //                 } else {
    //                     setLoading(false);
    //                     setRefreshing(false);
    //                     setLeads(data.leads);
    //                 }
    //             })
    //             .catch(err => {
    //                 alert(err.message);
    //             });
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // }
    return (
        <>
            <View style={{ backgroundColor: '#fff', flex: 1, paddingVertical: 20 }}>
                {/* first row */}
                <View style={styles.Card1}>
                    {/* Allocated task */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AllocatedStack')}
                        style={styles.TouchableOpacity}>
                        <View style={styles.box1}>
                            <AntDesign
                                style={{ textAlign: 'center' }}
                                name='addusergroup'
                                color={'#000080'}
                                size={40}
                            />
                            <Text style={styles.Text}>Allocated</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Not Interested task*/}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('NotIntrestedStack')}
                        style={styles.TouchableOpacity}>
                        <View style={styles.box2}>
                            <AntDesign
                                style={{ textAlign: 'center' }}
                                name='dislike2'
                                color={'#000080'}
                                size={40}
                            />
                            <Text style={styles.Text}>Not Interested</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Second row */}
                <View style={styles.Card2}>
                    {/* Pending Task */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PendingStack')}
                        style={styles.TouchableOpacity}>
                        <View style={styles.box3}>
                            <AntDesign
                                style={{ textAlign: 'center' }}
                                name='dashboard'
                                color={'#000080'}
                                size={40}
                            />
                            <Text style={styles.Text}>Pending</Text>
                        </View>
                    </TouchableOpacity>
                    {/* Archived Completed Task */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ArchivedStack')}
                        style={styles.TouchableOpacity}>
                        <View style={styles.box4}>
                            <AntDesign
                                style={{ textAlign: 'center', padding: 20, }}
                                name='like2'
                                color={'#000080'}
                                size={40}
                            />
                            <Text style={styles.Text}>Completed</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                onPress={() => navigation.navigate('SeeEmpListStack')}
                 style={styles.bottomarea}>
                    <View style={styles.bottomarea1}>
                        {/* <Image
                            source={require('../../assets/logo1.png')}
                            style={{ height: 125, width: 125 }}
                        /> */}
                        <Text style={{ fontSize: 30, color: 'orange', textAlign:'center' }}>Check Employee list with task details</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Admin;

const styles = StyleSheet.create({
    Card1: {
        flex: 1,
        flexDirection: "row",
    },
    TouchableOpacity: {
        width: "50%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    Card2: {
        marginTop: 20,
        flex: 1,
        flexDirection: "row",
    },
    Text: {
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        color: "#000",
    },
    Text1: {
        textAlign: 'center',
        fontSize: 22,
        color: "#000",

    },
    box1: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        elevation: 5,
        backgroundColor: '#f8f8ff',
        height: 150,
        width: "80%",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },
    box2: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        elevation: 5,
        backgroundColor: '#f8f8ff',
        height: 150,
        width: "80%",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },
    box3: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        elevation: 5,
        height: 150,
        width: "80%",
        backgroundColor: "#f8f8ff",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },

    box4: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        elevation: 5,
        height: 150,
        width: "80%",
        backgroundColor: "#f8f8ff",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },

    header: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    backgroundImage: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
    bottomarea: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 150
    },
    bottomarea1: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        elevation: 5,
        backgroundColor: '#f8f8ff',
    }
});





