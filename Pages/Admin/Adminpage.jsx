import 'react-native-gesture-handler';
import * as React from 'react';

// import component
import Login from '../admincomponent/Login';
import Logout from '../admincomponent/Logout';
import ChangePassword from '../admincomponent/ChangePassword';
import Forgot from '../admincomponent/Forgot';
import Allocated from '../admincomponent/Allocated';
import NotIntrested from '../admincomponent/NotIntrested';
import Pending from '../admincomponent/Pending';
import Archived from '../admincomponent/Archived';
import Admin from '../admincomponent/Admin';
import CreateTask from '../admincomponent/CreateTask';
import AddEmp from '../admincomponent/AddEmp';
import Selectfile from '../admincomponent/Selectfile';
import Verifymail from '../admincomponent/Verifymail';
import Generatepass from '../admincomponent/Generatepass';
import Splash from './Splash';
import Home from './Home';
import SeeEmpList from '../admincomponent/SeeEmpList';
import FetchedLeads from '../admincomponent/FetchedLeads';

// import (important) dependencies
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// main component
const Adminpage = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="splashStack" component={Splash} />
                <Stack.Screen name="loginStack" component={Login} />
                <Stack.Screen name="homeStack" component={Home} />
                <Stack.Screen name="logoutStack" component={Logout} />
                <Stack.Screen name="changePasswordStack" component={ChangePassword} />
                <Stack.Screen name="createTaskStack" component={CreateTask} />
                <Stack.Screen name="addEmpStack" component={AddEmp} />
                <Stack.Screen name="selectfileStack" component={Selectfile} />
                <Stack.Screen name="ForgotStack" component={Forgot} />
                <Stack.Screen name="AdminStack" component={Admin} />
                <Stack.Screen name="VerfiymailStack" component={Verifymail} />
                <Stack.Screen name="GeneratepassStack" component={Generatepass} />
                <Stack.Screen options={{ headerShown: true, headerTitle: 'Allocated Task' }} name="AllocatedStack" component={Allocated} />
                <Stack.Screen options={{ headerShown: true, headerTitle: 'Not Intrested Task' }} name="NotIntrestedStack" component={NotIntrested} />
                <Stack.Screen options={{ headerShown: true, headerTitle: 'Pending Task' }} name="PendingStack" component={Pending} />
                <Stack.Screen options={{ headerShown: true, headerTitle: 'Completed Task' }} name="ArchivedStack" component={Archived} />
                <Stack.Screen options={{ headerShown: true, headerTitle: 'Employee List' }} name="SeeEmpListStack" component={SeeEmpList} />
                <Stack.Screen options={{ headerShown: true, headerTitle: 'Leads Data' }} name="FetchedLeads" component={FetchedLeads} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Adminpage;



