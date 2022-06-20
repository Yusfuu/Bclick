import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { auth, db } from '../firebase/client';
// import { getDatabase, ref, push, onValue, child,  } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
// import { collection, addDoc, doc, query, where, arrayUnion, updateDoc, getDocs, onSnapshot, orderBy, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { doc, getDoc, setDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import uuid from 'react-native-uuid';
import { addRoomId } from '../app/features/user/userSlice';


// import uuid from 'react-native-uuid';
// import { add, and } from 'react-native-reanimated';


const ChatScreen = () => {
    const room = useSelector(state => state.user)
    const { userId } = useSelector(state => state.user)
    const [User, setUser] = useState({})
    const [messages, setMessages] = useState([]);
    let dispatch = useDispatch()
    console.log('chat screen Mounted');
    useEffect(async () => {
        // console.log('in chat screen', room.roomId);

        if (room.roomId) {


            const docRef = doc(db, "message", room.roomId);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap.exists());
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                // setMessages([...messages, docSnap.data()])



                let data = docSnap.data().messages.map(e => {
                    // console.log(new Date(e.createdAt.toDate().toLocaleDateString('en-GB')));
                    let a = e.createdAt.toDate().toLocaleDateString('en-GB')
                    // console.log(typeof a);
                    // e.createdAt = a
                    return e
                })
                // console.log(data);
                setMessages(data)
            } else {
                // doc.data () will be undefined in this case
                console.log("No such document!");
            }
            // const membersCollection = collection(db, 'message', room.roomId);
            // const yo = query(membersCollection);

            // const ttt = onSnapshot(yo, querySnapshot => {

            //     setMessages(querySnapshot.docs.map(doc => doc.data()))
            // })
            // console.log("yoo", messages);


            // const docRef = doc(db, 'message', room.roomId);
            // const docSnap = await getDoc(docRef);

            // if (docSnap.exists()) {
            //     console.log('ggggggggggggg');
            //     console.log("Document data:", setMessages(docSnap.data().messages));

            // } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            // }


            // const unsub = onSnapshot(doc(db, "message", room.roomId), (doc) => {
            // console.log(doc);
            // setMessages(doc.data().messages)
            // });

            // console.log('ss',unsub);
            // const collectionRef = collection(db, 'chats');
            // const q = query(collectionRef, where("roomId", "==", room.roomId));
            // const unsubscribe = onSnapshot(q, querySnapshot => {
            //     setMessages(
            //         querySnapshot.docs.map(doc => ({
            //             _id: doc.data()._id,
            //             createdAt: doc.data().createdAt.toDate(),
            //             text: doc.data().text,
            //             user: doc.data().user
            //         }))
            //     );

            // });

            // return unsubscribe;
        }

    }, [room.roomId]);



    const onSend = useCallback(async (messages = []) => {

        if (room.roomId) {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, messages)
            );
            // console.log(auth.currentUser.uuid);
            const { _id, createdAt, text, user } = messages[0];
            // console.log('roomId', room.roomId);
            let time = new Date()
            await setDoc(doc(db, "message", room.roomId), {
                _id: uuid.v4(),
                createdAt: time,
                roomId: room.roomId,
                messages: arrayUnion(
                    {
                        _id: uuid.v4(),
                        from: "au5A6vErktKuocBrFpJw",
                        createdAt: time,
                        text,
                        user: {
                            _id: "au5A6vErktKuocBrFpJw",
                            username: 'azeddine el',
                            avatar: { uri: 'https://i.pravatar.cc/300' },
                        }
                    }
                ),
                members: arrayUnion(
                    auth.currentUser.uid,
                    "au5A6vErktKuocBrFpJw"
                ),
                lastMsg: text
            }, { merge: true });
        }
    }, []);

    return (
        <>
            {
                User && (
                    <GiftedChat
                        alwaysShowSend={true}
                        inverted={true}
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: "au5A6vErktKuocBrFpJw",
                            username: '',
                            avatar: { uri: '' },
                        }}
                    />
                )
            }
        </>


    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "red"
    },
})



export default ChatScreen




