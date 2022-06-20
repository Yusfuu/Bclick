import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Platform, View, Linking, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Feather, Entypo, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { getDatabase, ref, push } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import uuid from 'react-native-uuid';
import { addRoomId } from "../app/features/user/userSlice";
// import { addDoc, collection, doc, set, setDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { collection, doc, query, where, getDocs, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { child, get } from "firebase/database";
import { auth, db } from "../firebase/client";


const DeliveryModel = ({ modalVisible, navigation, setModalVisible }) => {
    const { userId } = useSelector(state => state.user)
    let dispatch = useDispatch()
    const dialCall = (tel) => {
        let phoneNumber = "";

        if (Platform.OS === "android") {
            phoneNumber = `tel:${tel}`;
        } else {
            phoneNumber = `telprompt:${tel}`;
        }

        Linking.openURL(phoneNumber);
    };


    const createConnectionBetweenUsers = async () => {

        let roomId = ''


        // const collectionRef = collection(db, 'chats');
        // const q = query(collectionRef, orderBy('createdAt', 'desc'));

        // const unsubscribe = onSnapshot(q, querySnapshot => {
        //     querySnapshot.docs.map(doc => ({
        //         _id: doc.data()._id,
        //         createdAt: doc.data().createdAt.toDate(),
        //         text: doc.data().text,
        //         user: doc.data().user
        //     }))
        // });


        // let randmId = uuid.v4()

        // const user = doc(db, 'users', auth.currentUser.uid)
        // const docSnap = await getDoc(user);

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        //     if (docSnap.data().roomId == undefined) {
        //         dispatch(randmId)
        //     } else {
        //         dispatch(addRoomId(docSnap.data().roomId))
        //     }

        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }
        // const res = await user.set({
        //     roomtId: randmId
        // }, { merge: true });
        // let userExist = 0
        // const querySnapshot = await getDocs(collection(db, "users"));
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     if (doc.id == auth.currentUser.uid) {
        //         userExist = 1
        //     }
        // });



        // const citiesRef = collection(db, "chatsUser");

        // await setDoc(doc(citiesRef, "yo bro"), {
        //     createdAt: serverTimestamp(),
        //     text: 'bro',
        //     from: userId,
        //     to: "vuun8hRU9HbJHKkjFdVEZbuL3Rk2",
        //     rommId: randmId
        // });






        // const dbRef = ref(getDatabase());
        // get(child(dbRef, `users/${userId}/vuun8hRU9HbJHKkjFdVEZbuL3Rk2`)).then((snapshot) => {
        //     if (!snapshot.exists()) {
        //         let randmId = uuid.v4()
        //         roomId = randmId
        //         let sendMyMsg = {
        //             message: "",
        //             from: userId,
        //             to: "vuun8hRU9HbJHKkjFdVEZbuL3Rk2",
        //             sendTime: "",
        //             msgType: 'text',
        //             roomId: randmId
        //         }

        //         const db = getDatabase();
        //         push(ref(db, 'users/' + userId + "/" + "vuun8hRU9HbJHKkjFdVEZbuL3Rk2"), sendMyMsg)
        //             .then(() => {
        //                 // Data saved successfully!
        //             })
        //             .catch((error) => {
        //                 // The write failed...
        //             });

        //         let sendYourMsg = {
        //             message: "",
        //             to: userId,
        //             from: "vuun8hRU9HbJHKkjFdVEZbuL3Rk2",
        //             sendTime: "",
        //             msgType: 'text',
        //             roomId: randmId
        //         }
        //         push(ref(db, 'users/' + "vuun8hRU9HbJHKkjFdVEZbuL3Rk2" + "/" + userId), sendYourMsg)
        //             .then(() => {
        //                 // Data saved successfully!
        //             })
        //             .catch((error) => {
        //                 // The write failed...
        //             });
        //         dispatch(addRoomId(roomId))

        //     } else {
        //         roomId = Object.values(snapshot.val())[0].roomId
        //         dispatch(addRoomId(roomId))
        //     }
        // }).catch((error) => {
        // });

    }
    return (
        <View style={[styles.centeredView, tw`absolute bottom-0 h-[200px] bg-transparent w-full`]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}

            >
                <TouchableOpacity style={tw`bg-transparent flex-1 w-full`}
                    onPress={() => setModalVisible(!modalVisible)}
                ></TouchableOpacity>
                <View style={tw`absolute -bottom-[70%] w-full h-full rounded-3xl bg-[#213e93]`}>
                    <View style={tw`flex-row w-full  justify-center`}>
                        <View style={tw`flex-row  w-[200px] absolute  -top-10 justify-center`}>
                            <TouchableOpacity
                                onPress={() => dialCall('0666650696')}
                                style={tw` h-full mt-4 w-[50px] h-[50px] bg-[#2789fa] rounded-full`}>
                                <Feather style={tw`m-auto`} name="phone" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    navigation.navigate('Profile')
                                }}
                            >
                                <Image
                                    style={tw`w-[75px] rounded-full h-[75px] ml-4 mr-4 `}
                                    source={require("../assets/imageProfile.jpg")}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    createConnectionBetweenUsers()
                                    navigation.navigate('Chat')
                                }}
                                style={tw` h-full mt-4 w-[50px] h-[50px] bg-[#7f6cfa] rounded-full`}>
                                <MaterialCommunityIcons style={tw`m-auto`} name="message-processing-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={tw`w-full flex-col mt-13  `}>
                            <Text style={tw`m-auto text-white text-2xl`}>Azeddine Elhanouni</Text>
                            <View style={tw`w-full mt-2 mb-2 flex-row justify-center`}>
                                <View style={tw`flex-row w-[70px] justify-center border-2  rounded border-gray-200 `}>
                                    <Text style={tw`mr-1 mt-1 text-white`}>
                                        4.8/5
                                    </Text>
                                    <AntDesign name="star" size={24} color="orange" />
                                </View>
                            </View>
                            <View style={tw`flex-row justify-between max-w-full `}>
                                <View style={tw`flex-row justify-center ml-5 w-[50px] h-[50px] bg-[#a3a3a345] rounded-full `}>
                                    <MaterialIcons style={tw`m-auto`} name="delivery-dining" size={24} color="white" />
                                </View>
                                <View style={tw`w-[60%] flex-row justify-between items-center `}>
                                    {Array(20).fill(5).map((e, idx) => (<Text key={idx} style={tw`text-white my-1`}>|</Text>))}
                                </View>
                                <View style={tw`flex-row justify-center mr-5 w-[50px] h-[50px] bg-[#a3a3a345] rounded-full`}>
                                    <MaterialCommunityIcons style={tw`m-auto`} name="map-marker-outline" size={24} color="white" />
                                </View>
                            </View>
                        </View>

                    </View>

                </View>
            </Modal>



        </View >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 15,
        padding: 3,
        elevation: 2,
        width: 220,
        height: 50
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "white",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default DeliveryModel;