// import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { BarChart } from 'react-native-chart-kit';
// import CookieManager from '@react-native-cookies/cookies';

// const Employee = ({ navigation }) => {
//     const [count, setCount] = useState({
//         Allocated: "0",
//         Pending: "0",
//         Complete: "0",
//         NotInterested: "0",
//     })

//     const getCount = async () => {
//         try {
//             const cookies = await CookieManager.get('http://localhost/8081')

//             fetch("http://162.240.226.166:80/count/lead", {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${cookies.mycookies.value}`,
//                 },
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     setCount(data);
//                     setLoading(false);
//                     setRefreshing(false);
//                 })
//                 .catch((err) => {
//                     alert("Some Thing Went Wrong !!");
//                 });
//         } catch (error) {
//             alert("Some Thing Went Wrong !!")
//         }

//     };

//     useEffect(() => {
//         getCount()
//     }, []);

//     const data = {
//         type: 'bar',
//         labels: ["Allocated", "Not Interested", "Pending", "Compeleted"],
//         datasets: [
//             {
//                 data: [`${count.Allocated}`, `${count.NotInterested}`, `${count.Pending}`, `${count.Complete}`],
//                 colors: [
//                     (opacity = 1) => `#f8f8ff`,
//                     (opacity = 1) => `#f8f8ff`,
//                     (opacity = 1) => `#f8f8ff`,
//                     (opacity = 1) => `#f8f8ff`,]
//             }
//         ],
//     };

//     return (
//         <>
//             <ScrollView onScroll={handleScroll}>
//                 <View style={{ backgroundColor: '#fff', flex: 1, paddingVertical: 20 }}>
//                     <View style={styles.Card1}>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate('Allocated Stack')}
//                             style={styles.TouchableOpacity}>
//                             <View style={styles.box1}>
//                                 <Text style={styles.Text}>Allocated</Text>
//                                 <Text style={styles.Text1}>{count.Allocated}</Text>
//                             </View>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate('Not Interested Stack')}
//                             style={styles.TouchableOpacity}>
//                             <View style={styles.box2}>
//                                 <Text style={styles.Text}>Not Interested</Text>
//                                 <Text style={styles.Text1}>{count.NotInterested}</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.Card2}>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate('Pending Stack')}
//                             style={styles.TouchableOpacity}>
//                             <View style={styles.box3}>
//                                 <Text style={styles.Text}>Pending</Text>
//                                 <Text style={styles.Text1}>{count.Pending}</Text>
//                             </View>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate('Archived Stack')}
//                             style={styles.TouchableOpacity}>
//                             <View style={styles.box4}>
//                                 <Text style={styles.Text}>Completed</Text>
//                                 <Text style={styles.Text1}>{count.Complete}</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                     <Text style={{ fontSize: 30, textAlign: "center", marginTop: 40, marginBottom: 0 }}>Performance</Text>
//                     <View style={{ marginHorizontal: 20 }}>
//                         <BarChart
//                             yAxisInterval={1}
//                             data={data}
//                             width={Dimensions.get("window").width - 40}
//                             height={420}
//                             withOuterLines={false}
//                             withShadow={false}
//                             style={{ borderRadius: 15, marginTop: 5, color: "", justifyContent: "center", alignSelf: "center", alignItems: "center" }}
//                             chartConfig={{
//                                 decimalPlaces: 2,
//                                 backgroundGradientFrom: "#33ccff",
//                                 backgroundGradientFromOpacity: 1,
//                                 backgroundGradientTo: "blue",
//                                 backgroundGradientToOpacity: 1,
//                                 color: (opacity = 2) => "#ffffff",
//                                 barRadius: 5,
//                                 useShadowColorFromDataset: false,
//                                 options: {
//                                     scales: {
//                                         x: {
//                                             display: false,
//                                         },
//                                         y: {
//                                             display: false,
//                                         },
//                                         gridLines: {
//                                             drawOnChartArea: false
//                                         }
//                                     }
//                                 }
//                             }}
//                             gridLines={display = false}
//                             withHorizontalLabels={true}
//                             showValuesOnTopOfBars={true}
//                             flatColor={true}
//                             withCustomBarColorFromData={true}
//                             fontSize={25}
//                             showBarTops={false}
//                             fromZero={false}
//                             categoryPercentage={2}
//                             withInnerLines={false}
//                         />
//                     </View>
//                 </View>

//             </ScrollView>
//         </>
//     );
// };

// export default Employee;

// const styles = StyleSheet.create({
//     Card1: {
//         marginTop:20,
//         marginBottom: 60,
//         width: "100%",
//         height: 80,
//         flexDirection: "row",

//     },
//     TouchableOpacity: {
//         width: "50%",
//         height: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     Card2: {
//         width: "100%",
//         height: 80,
//         flexDirection: "row",

//     },
//     Text: {
//         fontSize: 20,
//     },
//     Text1: {
//         fontSize: 20,
//     },
//     box1: {
//         justifyContent:'center',
//         alignItems:'center',
//         elevation: 5,
//         backgroundColor: "#f8f8ff",
//         height: 120,
//         width: "80%",
//         borderRadius: 10,
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         padding: 10,
//     },
//     box2: {
//         justifyContent:'center',
//         alignItems:'center',
//         height: 120,
//         width: "80%",
//         borderRadius: 10,
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         padding: 10,
//         elevation: 5,
//         backgroundColor: "#f8f8ff"
//     },
//     box3: {
//         justifyContent:'center',
//         alignItems:'center',
//         height: 120,
//         width: "80%",
//         elevation: 5,
//         backgroundColor: "#f8f8ff",
//         borderRadius: 10,
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         padding: 10,
//     },

//     box4: {
//         justifyContent:'center',
//         alignItems:'center',
//         height: 120,
//         width: "80%",
//         elevation: 5,
//         backgroundColor: "#f8f8ff",
//         borderRadius: 10,
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         padding: 10,
//     },
//     header: {
//         color: '#fff',
//         textAlign: 'center',
//         fontSize: 28,
//         fontWeight: 'bold',
//     },
//     backgroundImage: {
//         zIndex: -1,
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         resizeMode: 'cover',
//     },
// });

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarChart } from 'react-native-chart-kit';
import CookieManager from '@react-native-cookies/cookies';

const Employee = ({ navigation }) => {
    const [count, setCount] = useState({
        Allocated: "0",
        Pending: "0",
        Complete: "0",
        NotInterested: "0",
    });

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const getCount = async () => {
        try {
            const cookies = await CookieManager.get('http://localhost/8081')

            fetch("http://162.240.226.166:80/count/lead", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${cookies.mycookies.value}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    setCount(data);
                    setLoading(false);
                    setRefreshing(false);
                })
                .catch((err) => {
                    alert("Some Thing Went Wrong !!");
                });
        } catch (error) {
            alert("Some Thing Went Wrong !!")
        }

    };

    const onRefresh = () => {
        setRefreshing(true);
        getCount();
    };

    useEffect(() => {
        setLoading(true);
        getCount();
    }, []);

    const data = {
        type: 'bar',
        labels: ["Allocated", "Not Interested", "Pending", "Compeleted"],
        datasets: [
            {
                data: [`${count.Allocated}`, `${count.NotInterested}`, `${count.Pending}`, `${count.Complete}`],
                colors: [
                    (opacity = 1) => `#f8f8ff`,
                    (opacity = 1) => `#f8f8ff`,
                    (opacity = 1) => `#f8f8ff`,
                    (opacity = 1) => `#f8f8ff`,]
            }
        ],
    };

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ backgroundColor: '#fff', flex: 1, paddingVertical: 20 }}>
                    <View style={styles.Card1}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Allocated Stack')}
                            style={styles.TouchableOpacity}>
                            <View style={styles.box1}>
                                <Text style={styles.Text}>Allocated</Text>
                                <Text style={styles.Text1}>{count.Allocated}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Not Interested Stack')}
                            style={styles.TouchableOpacity}>
                            <View style={styles.box2}>
                                <Text style={styles.Text}>Not Interested</Text>
                                <Text style={styles.Text1}>{count.NotInterested}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Card2}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Pending Stack')}
                            style={styles.TouchableOpacity}>
                            <View style={styles.box3}>
                                <Text style={styles.Text}>Pending</Text>
                                <Text style={styles.Text1}>{count.Pending}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Archived Stack')}
                            style={styles.TouchableOpacity}>
                            <View style={styles.box4}>
                                <Text style={styles.Text}>Completed</Text>
                                <Text style={styles.Text1}>{count.Complete}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* follow up start */}
                    {/* <TouchableOpacity style={styles.followup} onPress={() => navigation.navigate('followupStack')}>
                        <Text style={{fontSize:22, fontWeight:'bold', color:'#fff',}}>Follow Up</Text>
                    </TouchableOpacity> */}
                    {/* follow up end */}
                    <Text style={{ fontSize: 30, textAlign: "center", marginTop:50}}>Performance</Text>
                    <View style={{ marginHorizontal: 20 }}>
                        <BarChart
                            yAxisInterval={1}
                            data={data}
                            width={Dimensions.get("window").width - 40}
                            height={420}
                            withOuterLines={false}
                            withShadow={false}
                            style={{ borderRadius: 15, marginTop: 5, color: "", justifyContent: "center", alignSelf: "center", alignItems: "center" }}
                            chartConfig={{
                                decimalPlaces: 2,
                                backgroundGradientFrom: "#33ccff",
                                backgroundGradientFromOpacity: 1,
                                backgroundGradientTo: "blue",
                                backgroundGradientToOpacity: 1,
                                color: (opacity = 2) => "#ffffff",
                                barRadius: 5,
                                useShadowColorFromDataset: false,
                                options: {
                                    scales: {
                                        x: {
                                            display: false,
                                        },
                                        y: {
                                            display: false,
                                        },
                                        gridLines: {
                                            drawOnChartArea: false
                                        }
                                    }
                                }
                            }}
                            gridLines={display = false}
                            withHorizontalLabels={true}
                            showValuesOnTopOfBars={true}
                            flatColor={true}
                            withCustomBarColorFromData={true}
                            fontSize={25}
                            showBarTops={false}
                            fromZero={false}
                            categoryPercentage={2}
                            withInnerLines={false}
                        />
                    </View>
                </View>

            </ScrollView>
        </>
    );
};

export default Employee;

const styles = StyleSheet.create({
    Card1: {
        marginTop: 20,
        marginBottom: 60,
        width: "100%",
        height: 80,
        flexDirection: "row",

    },
    TouchableOpacity: {
        width: "50%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    Card2: {
        width: "100%",
        height: 80,
        flexDirection: "row",

    },
    Text: {
        fontSize: 20,
    },
    Text1: {
        fontSize: 20,
    },
    box1: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: "#f8f8ff",
        height: 120,
        width: "80%",
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },
    box2: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: "80%",
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
        elevation: 5,
        backgroundColor: "#f8f8ff"
    },
    box3: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: "80%",
        elevation: 5,
        backgroundColor: "#f8f8ff",
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },

    box4: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: "80%",
        elevation: 5,
        backgroundColor: "#f8f8ff",
        borderRadius: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 10,
    },
    header: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    backgroundImage: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
});