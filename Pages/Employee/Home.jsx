import 'react-native-gesture-handler';
import * as React from 'react';
import Employee from './EmployeeComponent/Employee';
import Logout from './EmployeeComponent/Logout';
import FollowUpScreen from './EmployeeComponent/FollowUpScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Drawer = createDrawerNavigator();

const Home = () => {
    return (
        <Drawer.Navigator
            useLegacyImplementation
            initialRouteName="Employee"
            screenOptions={
                {
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#fff'
                    }
                }
            }
        >
            <Drawer.Screen
                name="Employee"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name="md-home"
                            size={size}
                            color={focused ? 'tomato' : '#483d8b'}
                        />
                    ),
                }}
                component={Employee}
            />
            <Drawer.Screen
                name="FollowUp"
                options={{
                    drawerLabel: 'FollowUpScreen',
                    title: 'FollowUp Screen',
                    drawerIcon: ({ focused, size }) => (
                        <SimpleLineIcons
                            name="user-follow"
                            size={size}
                            color={focused ? 'tomato' : '#483d8b'}
                        />
                    ),
                }}
                component={FollowUpScreen}
            />
            <Drawer.Screen
                name="Logout"
                options={{
                    drawerLabel: 'Logout',
                    title: 'Logout Screen',
                    drawerIcon: ({ focused, size }) => (
                        <SimpleLineIcons
                            name="logout"
                            size={size}
                            color={focused ? 'tomato' : '#483d8b'}
                        />
                    ),
                }}
                component={Logout}
            />
        </Drawer.Navigator>
    );
}

export default Home;
