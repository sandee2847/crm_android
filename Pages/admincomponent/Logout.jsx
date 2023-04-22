// import CookieManager from '@react-native-cookies/cookies';
// import { useEffect } from 'react';

// const Logout = ({ navigation }) => {
//     const tokenExpairy = async () => {
//         CookieManager.clearAll()
//             .then((success) => {
//                 console.log('CookieManager.clearAll =>', success);
//                 alert("Logout Successfull")
//             });
//         navigation.navigate('loginStack')
//     }
//     useEffect(() => {
//         tokenExpairy()
//     },
//         []);

//     return (
//         null
//     );
// };

// export default Logout;


import CookieManager from '@react-native-cookies/cookies';
import { useEffect } from 'react';

const Logout = ({ navigation }) => {
    const tokenExpairy = async () => {
        CookieManager.clearAll()
            .then((success) => {
                alert("Logout Successful");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'loginStack' }],
                });
            });
    };

    useEffect(() => {
        tokenExpairy();
    }, []);

    return null;
};

export default Logout;

