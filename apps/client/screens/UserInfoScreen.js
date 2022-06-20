import { useState } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';


const UserInfoScreen = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [focus, setFocus] = useState(false);
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [focus3, setFocus3] = useState(false);


    const addInfo = () => {
        console.log(fname);
        console.log(lname);
        console.log(email);
        console.log(phone);
    }


    return (
        <View style={tw`w-full flex-row justify-center items-center bg-gray-500 h-full`} >
            <SafeAreaView style={tw`w-full  flex-col justify-center items-center h-full`} >
                <TextInput
                    style={[styles.input, tw` bg-white rounded-xl pl-2 border-2 border-orange `, tw` ${focus ? 'border-2 border-orange-400' : 'border border-gray-300'
                        }  h-14 px-4 rounded-2xl`]}
                    onChangeText={setFname}
                    value={fname}
                    placeholder="First Name"
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    autoComplete='off'
                />
                <TextInput
                    style={[styles.input, tw` bg-white rounded-xl pl-2 border-2 border-orange `, tw` ${focus1 ? 'border-2 border-orange-400' : 'border border-gray-300'
                        }  h-14 px-4 rounded-2xl`]} onChangeText={setLname}
                    value={lname}
                    placeholder="Last Name"
                    onBlur={() => setFocus1(false)}
                    onFocus={() => setFocus1(true)}
                    autoComplete='off'
                />
                <TextInput
                    style={[styles.input, tw` bg-white rounded-xl pl-2 border-2 border-orange `, tw` ${focus2 ? 'border-2 border-orange-400' : 'border border-gray-300'
                        }  h-14 px-4 rounded-2xl`]} onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    onBlur={() => setFocus2(false)}
                    onFocus={() => setFocus2(true)}
                    autoComplete='off'
                />
                <TextInput
                    style={[styles.input, tw` bg-white rounded-xl pl-2 border-2 border-orange `, tw` ${focus3 ? 'border-2 border-orange-400' : 'border border-gray-300'
                        }  h-14 px-4 rounded-2xl`]} onChangeText={setPhone}
                    value={phone}
                    placeholder="Mobile Number"
                    onBlur={() => setFocus3(false)}
                    onFocus={() => setFocus3(true)}
                    autoComplete='off'
                />
                <View style={tw`w-full `}>
                    <TouchableOpacity
                    style={tw`w-[80px] h-[40px]  m-auto rounded-xl  bg-orange-500`}
                        onPress={() => addInfo()}
                    >
                        <Text style={tw`m-auto text-white`}>Add Info</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>);
};



const styles = StyleSheet.create({

    input: {
        width: 250,
        margin: 15,
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        color: "black"
    }
});
export default UserInfoScreen;
