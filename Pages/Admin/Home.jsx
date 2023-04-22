import 'react-native-gesture-handler';
import * as React from 'react';

// import component
import Logout from '../admincomponent/Logout';
import ChangePassword from '../admincomponent/ChangePassword';
import Admin from '../admincomponent/Admin';
import Callaction from '../admincomponent/CallAction';
import Empstatus from '../admincomponent/EmpStatus';
import CreateTask from '../admincomponent/CreateTask';
import AddEmp from '../admincomponent/AddEmp';
import Selectfile from '../admincomponent/Selectfile';

// import (important) dependencies
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
    return (
        // Bottom Bar
        <Tab.Navigator
            initialRouteName="Admin"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 60, paddingBottom: 5, paddingTop: 5, backgroundColor: "#f8f8ff" },
                activeTintColor: 'tomato',
                inactiveTintColor: '#483d8b',
                labelStyle: { paddingBottom: 10, fontSize: 14, },
            }}
        >
            <Tab.Screen
                name="Admin"
                component={Admin}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            color='#483d8b'
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CallAction"
                component={Callaction}
                options={{
                    tabBarLabel: 'Call Action',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="call-end"
                            color='#483d8b'
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="EmpStatus"
                component={Empstatus}
                options={{
                    tabBarLabel: 'Emp Status',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="list-status"
                            color='#483d8b'
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator >
    );
};
// Which Drawer Bottom Bar Will Visible or not
const MainScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Admin'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashBoard" component={BottomTabStack} />

        </Stack.Navigator>
    )
}

// main component
const Home = () => {
    return (
        // Side bar (Drawer)
        <Drawer.Navigator
            useLegacyImplementation
            initialRouteName="MainScreenStack"
            screenOptions={
                {
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#fff'
                    }
                }
            }
        >
            {/* My Home Screen  */}
            <Drawer.Screen
                name="MainScreenStack"
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
                component={MainScreenStack}
            />
            {/* Create Task */}
            <Drawer.Screen
                name="CreateTask"
                options={{
                    drawerLabel: 'CreateTask',
                    title: 'CreateTask',
                    drawerIcon: ({ focused, size }) => (
                        <MaterialIcons
                            name="add-task"
                            size={size}
                            color={focused ? 'tomato' : '#483d8b'}
                        />
                    ),
                }}
                component={CreateTask}
            />
            {/* Select file */}
            <Drawer.Screen
                name="Selectfile"
                options={{
                    drawerLabel: 'Upload File',
                    title: 'Upload File',
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="cloudupload"
                            size={size}
                            color={focused ? 'tomato' : '#483d8b'}
                        />
                    ),
                }}
                component={Selectfile}
            />
            {/* Add Employee */}
            <Drawer.Screen
                name="AddEmp"
                options={{
                    drawerLabel: 'Add Employee',
                    title: 'Add Employee',
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="addusergroup"
                            size={size}
                            color={focused ? 'tomato' : '#483d8b'}
                        />
                    ),
                }}
                component={AddEmp}
            />

            {/* Change Password Drawer */}
            <Drawer.Screen
                name="ChangePassword"
                options={{
                    drawerLabel: 'Change Password',
                    title: 'Change Password',
                    drawerIcon: ({ focused, size }) => (
                        <MaterialCommunityIcons
                            name="key-change"
                            size={size}
                            color={focused ? 'tomato' : '#483d8b'}
                        />
                    ),
                }}
                component={ChangePassword}
            />
            {/* Logout Drawer */}
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



