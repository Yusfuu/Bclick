import { query } from 'firebase/database';
import { collection, onSnapshot, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import { addRoomId } from '../app/features/user/userSlice';
import { ChatComponent, SearchComponent } from '../components';
// import { getMessaging, onMessage } from "firebase/messaging";
import { auth, db } from '../firebase/client';

const ChatList = ({ navigation }) => {
    const [msg, setMsg] = useState([])


    // const messaging = getMessaging();
    // onMessage(messaging, (payload) => {
    //     console.log('Message received. ', payload);
    //     // ...
    // });
    let dispatch = useDispatch()
    const membersCollection = collection(db, 'message');
    // const membersCollectionUser = collection(db, 'users');

    const membersList = query(membersCollection, where("members", "array-contains", auth.currentUser.uid));
    // const membersListUser = query(membersCollectionUser);

    // 

    // const Users = onSnapshot(membersListUser, querySnapshot => {
    //     setUser(querySnapshot.docs.map(doc => doc.data()))
    // })

    useEffect(() => {
        const Msgs = onSnapshot(membersList, querySnapshot => {
            setMsg(querySnapshot.docs.map(doc => doc.data()))
        })
    }, [])

    if (!msg) return (<View><Text>loading</Text></View>)

    const gotoChat = (data) => {
        dispatch(addRoomId(data?.roomId))
        navigation.navigate('Chat')

    }

    return (

        <View style={tw`w-full h-full flex-col bg-white`}>
            <SearchComponent />
            {/* <Text> */}
            {msg && msg.map(e =>
                <TouchableOpacity key={e?._id} onPress={() => gotoChat(e)}>
                    <ChatComponent lastMsg={e?.lastMsg} />
                </TouchableOpacity>

            )
            }
            {/* </Text> */}
            {/* <ChatComponent lastMsg="bro " />
            <ChatComponent lastMsg="bro " />
            <ChatComponent lastMsg="bro " />
            <ChatComponent lastMsg="bro " /> */}

        </View>
    )
};

export default ChatList;
