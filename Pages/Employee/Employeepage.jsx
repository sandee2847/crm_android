import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './Splash';
import Home from './Home';
import Login from './EmployeeComponent/Login';
import SignUp from './EmployeeComponent/SignUp';
import Logout from './EmployeeComponent/Logout';
import Forget from './EmployeeComponent/Forget';
import Allocated from './EmployeeComponent/Allocated';
import Pending from './EmployeeComponent/Pending';
import NotIntersted from './EmployeeComponent/NotInterested';
import Archived from './EmployeeComponent/Archived';
import { StatusMailFile } from './EmployeeComponent/Status/StatusMain';
import { SetReminder } from './EmployeeComponent/Status/SetReminder';
import ResetPassword from './ResetPassword';
import VarifyOtp from './EmployeeComponent/VarifyOtp';
// import FollowUpScreen from './EmployeeComponent/FollowUpScreen';


const Stack = createNativeStackNavigator();
const Employeepage = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={Splash}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name={'Splash Stack'} component={Splash} />
                <Stack.Screen name={'Login Stack'} component={Login} />
                <Stack.Screen name={'Home Stack'} component={Home} />
                <Stack.Screen name={'Log Out'} component={Logout}
                    options={{
                        headerShown: false,
                        headerStyle: {
                            headerTitleAlign: 'center'
                        }
                    }} />
                <Stack.Screen name={'Forgot Password'} component={Forget} />
                <Stack.Screen name="Sign Up" component={SignUp} />
                <Stack.Screen name="Allocated Stack" component={Allocated} options={{ headerShown: true }} />
                <Stack.Screen name="Pending Stack" component={Pending} options={{ headerShown: true }} />
                <Stack.Screen name="Not Interested Stack" component={NotIntersted} options={{ headerShown: true }} />
                <Stack.Screen name="Archived Stack" component={Archived} options={{ headerShown: true }} />
                <Stack.Screen name="Status Main File" component={StatusMailFile} initialParams={{ email: "kishor", name: "kishor", contact: "9999999999" }} />
                <Stack.Screen name="ReminderStack" component={SetReminder} options={{ headerShown: true }} />
                <Stack.Screen name="Reset" component={ResetPassword} options={{ headerShown: true }} />
                <Stack.Screen name="Verify OTP" component={VarifyOtp} options={{ headerShown: true }} />
                {/* <Stack.Screen name="followupStack" component={FollowUpScreen} options={{ headerShown: true }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Employeepage;