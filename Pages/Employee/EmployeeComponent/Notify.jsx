import { useEffect } from 'react';
import { View, Text , StyleSheet } from 'react-native';
import { requestUserPermission, getFCMToken, NotificationListener } from './_OldNotification';

const Notify = () => {
    useEffect(()=>{
        requestUserPermission();
        getFCMToken();
        NotificationListener();
        
    },[]);
    return (
        <View style = {styles.container}>
            <Text style = {{fontWeight: "bold"}}>Push Notification</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
})
export default Notify;