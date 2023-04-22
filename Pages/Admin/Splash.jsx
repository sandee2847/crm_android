import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';
import { notificationListner, requestUserPermission } from '../../src/Notifications';


const Splash = ({ navigation }) => {

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        requestUserPermission()
        notificationListner()
    }, [])

    useEffect(() => {
        const fetchCookies = async () => {
            const cookies = await CookieManager.get('http://localhost/8081');
            setUserLoggedIn(!!cookies.mycookies?.value);
        };
        fetchCookies();
    }, []);

    useEffect(() => {
        if (userLoggedIn) {
            navigation.navigate('homeStack');
        } else {
            navigation.navigate('loginStack');
        }
    }, [userLoggedIn]);

    return <View />;
};

export default Splash;



