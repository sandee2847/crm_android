// import React, { useState, useEffect } from 'react';
// import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

// const SeeEmpList = () => {
//     const [employees, setEmployees] = useState([]);

//     useEffect(() => {
//         // fetch employee id
//         fetch('https://carrierbuild.in/Empdata.json')
//             .then(response => response.json())
//             .then(data => setEmployees(data))
//             .catch(error => console.error(error));
//     }, []);

//     // update status enable / disable
//     const updateEmployeeStatus = (id, status) => {
//         fetch(`https://example.com/employees/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ status }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 const index = employees.findIndex(employee => employee.id === id);
//                 const newEmployees = [...employees];
//                 newEmployees[index] = data;
//                 setEmployees(newEmployees);
//             })
//             .catch(error => console.error(error));
//     };

//     // leads allocated to employee
//     const getleads = (id, status) => {
//         fetch(`https://example.com/employees/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ status }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 const index = employees.findIndex(employee => employee.id === id);
//                 const newEmployees = [...employees];
//                 newEmployees[index] = data;
//                 setEmployees(newEmployees);
//                 //   onPress={() => NavigationContainer.navigate('LeadsStack')}
//             })
//             .catch(error => console.error(error));
//     };

//     const renderItem = ({ item }) => (
//         <ScrollView>
//             <View style={styles.container}>
//                 <TouchableOpacity style={styles.container1}>
//                     <Text style={{fontSize:20,color:'#000'}}><Text style={{fontWeight:'800'}}>Name:</Text> {item.name}</Text>
//                     <Text style={{fontSize:20,color:'#000'}}><Text style={{fontWeight:'800'}}>Contact:</Text> {item.contact}</Text>
//                     <Text style={{fontSize:20,color:'#000'}}><Text style={{fontWeight:'800'}}>Name: </Text>{item.email}</Text>
//                     <Text style={{fontSize:20,color:'#000'}}><Text style={{fontWeight:'800'}}>Status:</Text> {item.status ? 'Enabled' : 'Disabled'}</Text>
//                     <View style={{ flex: 1, flexDirection: 'row', paddingTop:20, justifyContent:'space-between' }}>
//                         {/* <Button 
//                             title={item.status ? 'Disable' : 'Enable'}
//                             onPress={() => updateEmployeeStatus(item.id, !item.status)}
//                             style={styles.button}
//                         /> */}
//                         <TouchableOpacity
//                             key={item.id}
//                             onPress={() => updateEmployeeStatus(item.id, !item.status)}
//                             style={[styles.button, { backgroundColor: item.status ? '#a52a2a' : '#228b22' }]}
//                         >
//                             <Text style={styles.buttonText}>{item.status ? 'Disable' : 'Enable'}</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             key={item.id}
//                             onPress={() => getleads(item.id)}
//                             style={styles.button1}
//                         >
//                             <Text style={styles.buttonText}>See Leads</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );

//     return (
//         <FlatList
//             data={employees}
//             renderItem={renderItem}
//             keyExtractor={item => item.id.toString()}
//         />
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     container1: {
//         margin:10,
//         backgroundColor:'#f8f8ff',
//         elevation:10,
//         flex: 1,
//         padding: 20,
//     },
//     button: {
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         marginHorizontal:10,
//         backgroundColor: 'green',
//         padding: 10,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: 'gray',
//     },
//     buttonText:{
//         color: 'white',
//         fontSize:20
//     },
//     button1: {
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         marginHorizontal:10,
//         backgroundColor: '#1e90ff',
//         padding: 10,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: 'gray',
//     },
// });

// export default SeeEmpList;


import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FetchedLeads from './FetchedLeads';


const SeeEmpList = ({navigation}) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // fetch employee id
        fetch('https://carrierbuild.in/Empdata.json')
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error(error));
    }, []);

    // update status enable / disable
    const updateEmployeeStatus = (id, status) => {
        fetch(`https://example.com/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        })
            .then(response => response.json())
            .then(data => {
                const index = employees.findIndex(employee => employee.id === id);
                const newEmployees = [...employees];
                newEmployees[index] = data;
                setEmployees(newEmployees);
            })
            .catch(error => console.error(error));
    };

    const renderItem = ({ item }) => (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.container1}>
                    <Text style={{fontSize:20,color:'#000'}}><Text style={{fontWeight:'800'}}>Name:</Text> {item.name}</Text>
                    <Text style={{fontSize:20,color:'#000'}}><Text style={{fontWeight:'800'}}>Contact:</Text> {item.contact}</Text>
                    <Text style={{fontSize:20,color:'#000'}}><Text style={{fontWeight:'800'}}>Email: </Text>{item.email}</Text>
                    <Text style={{fontSize:20,color:'#000'}}><Text style={{fontWeight:'800'}}>Status:</Text> {item.status ? 'Enabled' : 'Disabled'}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop:20, justifyContent:'space-between' }}>
                        {/* <Button 
                            title={item.status ? 'Disable' : 'Enable'}
                            onPress={() => updateEmployeeStatus(item.id, !item.status)}
                            style={styles.button}
                        /> */}
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => updateEmployeeStatus(item.id, !item.status)}
                            style={[styles.button, { backgroundColor: item.status ? '#a52a2a' : '#228b22' }]}
                        >
                            <Text style={styles.buttonText}>{item.status ? 'Disable' : 'Enable'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => navigation.navigate('FetchedLeads', { employeeId: item.id })}
                        >
                            <Text style={styles.buttonText}>See Leads</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    return (
        <FlatList
            data={employees}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        margin:10,
        backgroundColor:'#f8f8ff',
        elevation:10,
        flex: 1,
        padding: 20,
    },
    button: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    buttonText:{
        color: 'white',
        fontSize:20
    },
    button1: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
});

export default SeeEmpList;
