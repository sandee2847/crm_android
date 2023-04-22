import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Employee from '../Employee';
import ResetPassword from '../../ResetPassword';
import Logout from '../Logout';
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerLabelStyle: {
          marginLeft: 20,
        },
      }}>
      <Drawer.Screen
        name="Dashboard" component={Employee}
      />
      <Drawer.Screen name="Change Password" component={ResetPassword} />
      <Drawer.Screen name='Log Out' component={Logout} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;