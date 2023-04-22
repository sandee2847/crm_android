// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const FollowUpScreen = () => {
//   const [clientName, setClientName] = useState('');
//   const [contact, setContact] = useState('');
//   const [followUpDate, setFollowUpDate] = useState('');
//   const [notes, setNotes] = useState('');
//   const [followUpList, setFollowUpList] = useState([]);

//   useEffect(() => {
//     loadFollowUpData();
//   }, []);

//   const loadFollowUpData = async () => {
//     try {
//       const data = await AsyncStorage.getItem('followUpList');
//       if (data !== null) {
//         setFollowUpList(JSON.parse(data));
//       }
//     } catch (error) {
//       console.log('Error loading follow-up data', error);
//     }
//   };

//   const saveFollowUpData = async (data) => {
//     try {
//       await AsyncStorage.setItem('followUpList', JSON.stringify(data));
//     } catch (error) {
//       console.log('Error saving follow-up data', error);
//     }
//   };

//   const handleFollowUp = () => {
//     const newFollowUp = {
//       id: Math.random().toString(),
//       clientName: clientName,
//       clientContact: contact,
//       followUpDate: followUpDate,
//       notes: notes,
//     };
//     const updatedFollowUpList = [...followUpList, newFollowUp];
//     console.log("updatedFollowUpList", updatedFollowUpList)
//     setFollowUpList(updatedFollowUpList);
//     saveFollowUpData(updatedFollowUpList);
//     setClientName('');
//     setContact('');
//     setFollowUpDate('');
//     setNotes('');
//   };

//   const handleDeleteFollowUp = id => {
//     const updatedFollowUpList = followUpList.filter(item => item.id !== id);
//     setFollowUpList(updatedFollowUpList);
//     saveFollowUpData(updatedFollowUpList);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <View style={styles.column}>
//         <Text style={styles.Title}>Name: </Text>
//         <Text style={styles.Name}>{item.clientName}</Text>
//       </View>
//       <View style={styles.column}>
//         <Text style={styles.Title}>Contact: </Text>
//         <Text style={styles.Name}>{item.clientContact}</Text>
//       </View>
//       <View style={styles.column}>
//         <Text style={styles.Title}>Follow Up Date: </Text>
//         <Text style={styles.Name}>{item.followUpDate}</Text>
//       </View>
//       <View style={styles.column}>
//         <Text style={styles.Title}>Notes: </Text>
//         <Text style={styles.Name}>{item.notes}</Text>
//       </View>
//       <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteFollowUp(item.id)}>
//         <Text style={styles.deleteButtonText}>Delete</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>Follow Up</Text> */}
//       <TextInput
//         style={styles.input}
//         placeholder="Client Name"
//         onChangeText={setClientName}
//         value={clientName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Contact"
//         onChangeText={setContact}
//         value={contact}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Follow Up Date"
//         onChangeText={setFollowUpDate}
//         value={followUpDate}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Notes"
//         onChangeText={setNotes}
//         value={notes}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleFollowUp}>
//         <Text style={styles.buttonText}>Follow Up</Text>
//       </TouchableOpacity>
//       <FlatList
//         style={styles.list}
//         data={followUpList}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   title: {
//     textAlign:'center',
//     fontSize: 24,
//     color:'#000',
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height:45,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     borderRadius: 4,
//     padding: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   list: {
//     marginTop: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: 10,
//   },
//   column: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   Title: {
//     color: '#000',
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   Name: {
//     color: '#000',
//     fontSize: 18,

//   },
//   deleteButton: {
//     backgroundColor: '#ff3b30',
//     borderRadius: 4,
//     width: '50%',
//     padding: 10,
//     alignItems: 'center',
//   },
//   deleteButtonText: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   item: {
//     elevation:10,
//     backgroundColor: '#f9f9f9',
//     padding: 10,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 5,
//   },
// });


// export default FollowUpScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FollowUpScreen = () => {
  const [clientName, setClientName] = useState('');
  const [contact, setContact] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpList, setFollowUpList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState('');

  useEffect(() => {
    loadFollowUpData();
  }, []);

  const loadFollowUpData = async () => {
    try {
      const data = await AsyncStorage.getItem('followUpList');
      if (data !== null) {
        setFollowUpList(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading follow-up data', error);
    }
  };

  const saveFollowUpData = async (data) => {
    try {
      await AsyncStorage.setItem('followUpList', JSON.stringify(data));
    } catch (error) {
      console.log('Error saving follow-up data', error);
    }
  };

  const handleFollowUp = () => {
    const newFollowUp = {
      id: Math.random().toString(),
      clientName: clientName,
      clientContact: contact,
      followUpDate: followUpDate,
      notes: selectedOption,
    };
    const updatedFollowUpList = [...followUpList, newFollowUp];
    console.log("updatedFollowUpList", updatedFollowUpList)
    setFollowUpList(updatedFollowUpList);
    saveFollowUpData(updatedFollowUpList);
    setClientName('');
    setContact('');
    setFollowUpDate('');
    setSelectedOption('');
    setSelectedOptions('');
  };

  const handleDeleteFollowUp = id => {
    const updatedFollowUpList = followUpList.filter(item => item.id !== id);
    setFollowUpList(updatedFollowUpList);
    saveFollowUpData(updatedFollowUpList);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.column}>
        <Text style={styles.Title}>Name: </Text>
        <Text style={styles.Name}>{item.clientName}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.Title}>Contact: </Text>
        <Text style={styles.Name}>{item.clientContact}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.Title}>Follow Up Date: </Text>
        <Text style={styles.Name}>{item.followUpDate}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.Title}>Notes: </Text>
        <Text style={styles.Name}>{item.notes}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteFollowUp(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={item.notes}
          onValueChange={(itemValue) => {
            // create a new array with updated values
            const updatedFollowUpList = followUpList.map((followUp) => {
              if (followUp.id === item.id) {
                return { ...followUp, notes: itemValue };
              }
              return followUp;
            });
            setFollowUpList(updatedFollowUpList);
            saveFollowUpData(updatedFollowUpList);
          }}
        >
          <Picker.Item label="Select Notes" value="" />
          <Picker.Item label="Follow Up Completed" value="Follow Up Completed" />
          <Picker.Item label="Reschedule Follow Up" value="Reschedule Follow Up" />
          <Picker.Item label="Client Not Interested" value="Client Not Interested" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Client Name"
        onChangeText={setClientName}
        value={clientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        onChangeText={setContact}


        value={contact}
      />
      <TextInput
        style={styles.input}
        placeholder="Follow Up Date"
        onChangeText={setFollowUpDate}
        value={followUpDate}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
        >
          <Picker.Item label="Select Notes" value="" />
          <Picker.Item label="Follow Up Completed" value="Follow Up Completed" />
          <Picker.Item label="Reschedule Follow Up" value="Reschedule Follow Up" />
          <Picker.Item label="Client Not Interested" value="Client Not Interested" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleFollowUp}>
        <Text style={styles.buttonText}>Follow Up</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <FlatList
          data={followUpList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  Title: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 18
  },
  Name: {
    flex: 1,
    fontSize: 18
  },
  deleteButton: {
    marginBottom: 10,
    backgroundColor: '#d11a2a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FollowUpScreen;


