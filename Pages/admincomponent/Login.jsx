import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {button1} from '../../shared/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formgroup, head1, head2, link} from '../../shared/Formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';

const Login = ({navigation}) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState(false);

  const getNotifyToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      setToken(fcmToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifyToken();
  });

  const Sendtobackend = () => {
    if (email == '' || password == '') {
      alert('All fields are required');
      return;
    } else {
      try {
        fetch('http://162.240.226.166:80/adminLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({email, password}),
        })
          .then(res => res.json())
          .then(data => {
            if (data.status == true) {
              CookieManager.set('http://localhost/8081', {
                name: 'mycookies',
                value: data.data,
              })
                .then(done => {
                  console.log('CookieManager.set=>', done);
                })
                .catch(err => console.log('err', err));
              navigation.reset({
                index: 0,
                routes: [{name: 'homeStack'}],
              });
              alert('Login Successfully');
              navigation.navigate('homeStack');
            } else {
              alert(data.message);
            }
          })
          .catch(err => {
            alert(err.message);
          });
      } catch (error) {
        alert(error.message);
      }
    }
    try {
      fetch(
        'http://162.240.226.166:80/add/notification/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({email: email, token: token}),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={styles.container1}>
        <View style={styles.s2}>
          <Text style={head1}>Login</Text>
          <Text style={head2}>Sign in to continue</Text>
          <View style={formgroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={'#000'}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={formgroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={'#000'}
              secureTextEntry={passwordShow}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setPasswordShow(!passwordShow)}>
              {passwordShow ? (
                <Ionicons
                  style={styles.eyeIcon}
                  name="eye-off-outline"
                  size={24}
                  color="black"
                />
              ) : (
                <Ionicons
                  name="eye-outline"
                  style={styles.eyeIcon}
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.fp}>
            <Pressable onPress={() => navigation.navigate('ForgotStack')}>
              <Text style={link}>Forgot Password?</Text>
            </Pressable>
          </View>
          <Text style={button1} onPress={() => Sendtobackend()}>
            Login
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  patternbg: {
    left: '18%',
    position: 'absolute',
    width: 250,
    height: 250,
    zIndex: 1,
  },
  container1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  s1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  small1: {
    color: '#fff',
    fontSize: 17,
  },
  h1: {
    fontSize: 30,
    color: '#fff',
  },
  s2: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    position: 'absolute',
    bottom: 0,
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
    backgroundColor: '#c0c0c0',
    borderRadius: 20,
    padding: 10,
  },
  fp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  logo: {
    height: 80,
    resizeMode: 'contain',
  },
  eyeIcon: {
    position: 'absolute',
    // right: 9,
    top: -36,
    right: 15,
  },
});
