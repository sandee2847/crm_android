import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Forget from '../Forget';
import SignUp from '../SignUp';
import Logout from '../Logout';
import DrawerNavigator from './DrawerNavigator';
import Login from '../Login';
import Employee from '../Employee';
import Allocated from '../Allocated';
import Pending from '../Pending';
import NotIntersted from '../NotInterested';
import Archived from '../Archived';
import { StatusMailFile } from '../Status/StatusMain';
import { SetReminder } from '../Status/SetReminder';
import ResetPassword from '../../ResetPassword';
import VarifyOtp from '../VarifyOtp';
const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#69b6ff"
      },
      headerTitleAlign: "center",

    }}
      initialRouteName={'Login Stack'}
    >
      <Stack.Screen name={'Login Stack'} component={Login} />
      <Stack.Screen name={'Log Out'} component={Logout}
        options={{
          headerShown: false,
          headerStyle: {
            headerTitleAlign: 'center'
          },
        }} />
      <Stack.Screen name={'Forgot Password'} component={Forget} />
      <Stack.Screen name={'Dashboard'} component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Allocated Stack" component={Allocated} />
      <Stack.Screen name="Pending Stack" component={Pending} />
      <Stack.Screen name="Not Interested Stack" component={NotIntersted} />
      <Stack.Screen name="Archived Stack" component={Archived} />
      <Stack.Screen name="Status Main File" component={StatusMailFile} initialParams={{ email: "kishor", name: "kishor", contact: "9999999999" }} />
      <Stack.Screen name="ReminderStack" component={SetReminder} options={{ headerShown: true }} />
      <Stack.Screen name="Reset" component={ResetPassword} options={{ headerShown: true }} />
      <Stack.Screen name="Verify OTP" component={VarifyOtp} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;