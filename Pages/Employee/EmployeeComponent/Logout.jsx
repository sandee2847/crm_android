// import CookieManager from '@react-native-cookies/cookies';
// import { useEffect } from 'react';

// const Logout = ({ navigation }) => {
//     const tokenExpairy = async () => {
//         CookieManager.clearAll()
//             .then((success) => {
//                 alert("Logout Successfull")
//             });
//         navigation.navigate('Login Stack')

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
                    routes: [{ name: 'Login Stack' }],
                });
            });
    };

    useEffect(() => {
        tokenExpairy();
    }, []);

    return null;
};

export default Logout;

