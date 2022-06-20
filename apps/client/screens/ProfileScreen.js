import { View, StyleSheet, Text, Image, ImageBackground, Modal, TouchableOpacity, Button, SafeAreaView, TextInput } from "react-native";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import {  useState } from "react";
import tw from "twrnc";

const ProfileScreen = ({ navigation }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [modelPopUP, setModelPopUP] = useState(false)

 
  return (
    <View style={tw`w-full flex-col  h-full bg-[#fcfaf3] `}>
      <View style={tw` rounded-0 border-0 		`}>
        <ImageBackground
          source={require("../assets/imageProfile.jpg")}
          style={styles.image}
        >
          <View style={tw`w-full flex-row justify-center h-[230px]`}>
            <View style={tw`flex-row justify-between mt-4 w-[95%]`}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
              >
                <AntDesign name="left" size={24} color="white" />
              </TouchableOpacity>
              <Text style={tw`text-xl text-white`}>Profile</Text>
              <Feather onPress={() => setModelPopUP(!modelPopUP)} name="edit-3" size={24} color="white" />
            </View>
          </View>
        </ImageBackground>
        <View
          style={tw`flex-row  rounded-0  border-0 justify-center w-full m-auto absolute  mt-30`}
        >
          <View>
            <Image
              style={tw`bg-black w-[130px] h-[130px] rounded-full  border-2  border-gray-200 `}
              source={require("../assets/imageProfile.jpg")}
            />
          </View>
        </View>
      </View>
      {modelPopUP &&
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={modelPopUP}
          onRequestClose={() => { console.log("Modal has been closed.") }}>
          <View style={styles.modal}>
            <Text style={tw`w-full flex-row text-right mr-20`}>
              <Entypo onPress={() => setModelPopUP(!modelPopUP)} name="cross" style size={24} color="black" />
            </Text>
            <SafeAreaView >
              <TextInput
                style={styles.input}
                onChangeText={setFname}
                value={fname}
                placeholder="First Name"
              />
              <TextInput
                style={styles.input}
                onChangeText={setLname}
                value={lname}
                placeholder="Last Name"
              />
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="Mobile Number"
              />
            </SafeAreaView>
            <View style={tw` w-full flex-row  justify-center `}>
              <Button
                title={'Edit Profile'}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                onPress={() => setModelPopUP(!modelPopUP)}
              />
            </View>
          </View>
        </Modal>

      }
      <View style={tw`mt-10 flex-col items-center  w-full`}>
        <View style={tw`mb-3 `}>
          <Text style={tw`text-[#b1b0ae]  font-bold	 text-xl`}>MY DETAILS</Text>
        </View>

        <View style={tw`flex-col w-[90%] p-2 bg-[#ffffff] rounded-2xl`}>
          <View style={tw`w-full p-1 flex-col bg-white `}>
            <Text style={tw`ml-3 text-[#c3c3c3]`}>First Name</Text>
            <Text style={tw`ml-5  text-black`}>Azeddine</Text>
          </View>
          <View style={tw`w-full p-1 flex-col bg-white `}>
            <Text style={tw`ml-3  text-[#c3c3c3]`}>Last Name</Text>
            <Text style={tw`ml-5  text-black`}>ELhanouni</Text>
          </View>
          <View style={tw`w-full p-1 flex-col bg-white `}>
            <Text style={tw`ml-3  text-[#c3c3c3]`}>Email ID</Text>
            <Text style={tw`ml-5 text-black`}>
              elhanouniazeddine00@gmail.com
            </Text>
          </View>
          <View style={tw`w-full p-1 flex-col bg-white `}>
            <Text style={tw`ml-3  text-[#c3c3c3]`}>Mobile Number</Text>
            <Text style={tw`ml-5  text-black`}>981241488124</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  color: {
    color: "red",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  image: {

  },
  backgroundImage: {
    height: "200px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    height: "100%",
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  text: {
    color: '#3f2949',
    marginTop: 10
  },
  input: {
    width: 250,
    margin: 15,
    height: 40,
    borderColor: 'white',
    borderWidth: 1
  }
});

export default ProfileScreen;
