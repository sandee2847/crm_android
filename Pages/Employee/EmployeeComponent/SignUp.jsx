import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { button1 } from '../../../shared/Button'
import { errormessage, formgroup, head1, input, label, link, link2 } from '../../../shared/Formcss'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Signup = ({ navigation }) => {

  const [passwordShow, setPasswordShow] = useState(true)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    try {
      fetch('http://162.240.226.166:80/userRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, userName, mobile: contact, password, confirmPassword, name })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === true) {
            alert("Register Successful");
            navigation.navigate('Login Stack');
          } else {
            alert(data.message)
          }
        })
        .catch(error => {
      alert(error.message)
        });
    }
    catch (err) {
      alert(err.message)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.s1}>

        </View>
        <ScrollView style={styles.s2}>
          <Text style={head1}>Create a New Account</Text>
          <Text style={link2}>Already Registered?&nbsp;
            <Text style={link}
              onPress={() => navigation.navigate('Login Stack')}
            >
              Login here
            </Text>
          </Text>
          {
            errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
          }
          <View style={formgroup}>
            <Text style={label}>User Name</Text>
            <TextInput style={input} placeholder="Enter your Name"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Name</Text>
            <TextInput style={input} placeholder="Enter your Name"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Email</Text>
            <TextInput style={input} placeholder="Enter your Email"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Mobile</Text>
            <TextInput style={input} placeholder="Enter your Mobile No."
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setContact(text)}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Password</Text>
            <TextInput style={input} placeholder="Enter your Password"
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={passwordShow}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity>
              {passwordShow ? <Ionicons style={styles.eyeIcon} name="eye-off-outline" size={24} color="black" value={passwordShow} onPress={() => { setPasswordShow(!passwordShow) }} /> : <Ionicons name="eye-outline" style={styles.eyeIcon} size={24} color="black" value={passwordShow} onPress={() => { setPasswordShow(!passwordShow) }} />}
            </TouchableOpacity>
          </View>

          <View style={formgroup}>
            <Text style={label}>Confirm Password</Text>
            <TextInput style={input} placeholder="Confirm your Password"
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={confirmPasswordShow}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <TouchableOpacity>
              {confirmPasswordShow ? <Ionicons style={styles.eyeIcon} name="eye-off-outline" size={24} color="black" value={confirmPasswordShow} onPress={() => { setConfirmPasswordShow(!confirmPasswordShow) }} /> : <Ionicons name="eye-outline" style={styles.eyeIcon} size={24} color="black" value={confirmPasswordShow} onPress={() => { setConfirmPasswordShow(!confirmPasswordShow) }} />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginBottom: 30 }}
            onPress={() => { Sendtobackend() }}
          >
            <Text style={button1}>Signup</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: "black"

  },
  container1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  s1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  small1: {
    color: '#fff',
    fontSize: 17,
  }
  ,
  h1: {
    fontSize: 30,
    color: '#fff',
  },
  s2: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,

  },
  formgroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFB0CC",
    borderRadius: 20,
    padding: 10,
  },
  fp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  eyeIcon: {
    position: 'absolute',
    top: -36,
    right: 15
  },
})