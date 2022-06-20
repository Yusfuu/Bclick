import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Modal, Image } from 'react-native';
import { getAllusers, getUserId, getUsers, logout, SignInAnonymously, getDeliverys } from '../firebase/client';
import MapView, { Marker } from 'react-native-maps';
import DeliveryModel from "../components/DeliveryModel"
const { width, height } = Dimensions.get('window')
import { addRoomId, addUserId } from '../app/features/user/userSlice';
import { useAuth } from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  let dispatch = useDispatch()

  const [markers, setMarkers] = useState([{
    "latitude": 32.301059896498586,
    "latitudeDelta": 0.10873297010665084,
    "longitude": -9.228742104023695,
    "longitudeDelta": 0.06705556064844131,
    "id_room": "11"
  },
  {
    "latitude": 32.287007556829934,
    "latitudeDelta": 0.037345906032861365,
    "longitude": -9.237496498972178,
    "longitudeDelta": 0.022088326513767242,
    "id_room": "22"

  },
  {
    "latitude": 32.288006503907255,
    "latitudeDelta": 0.029921235225572218,
    "longitude": -9.230039287358522,
    "longitudeDelta": 0.01769687980413437,
    "id_room": "33"
  },
  {
    "latitude": 32.298664931655274,
    "latitudeDelta": 0.009853544595614494,
    "longitude": -9.242027755826713,
    "longitudeDelta": 0.005828775465488434,
    "id_room": "44"
  }
  ])

  const [colorArr, setColorArr] = useState(["green", "pink", "red", "yellow"])
  const [region, setRegion] = useState({
    "latitude": 32.301059896498586,
    "latitudeDelta": 0.10873297010665084,
    "longitude": -9.228742104023695,
    "longitudeDelta": 0.06705556064844131,
  });
  const [text, setText] = useState('none tracked');
  const [modelPopUp, setModelPopUp] = useState(false)
  const user = useAuth();
  const tracking = () => {
    setText('tracked ' + user.email);
  };

  useEffect(async () => {
    const value = await AsyncStorage.getItem('userId')
    dispatch(addUserId(value))
  }, [])


  // useEffect(() => {
  //   getDeliverys((users) => {
  //     let yo = users.map(({ lan, lat }) => {
  //       return {
  //         "latitude": lat,
  //         "longitude": lan,
  //         "latitudeDelta": 0.10873297010665084,
  //         "longitudeDelta": 0.06705556064844131,
  //       }
  //     })
  //     console.log(yo);
  //     setMarkers(yo)
  //   })
  // }, [])

  const DeleviryPopUp = (e, i) => {
    setModelPopUp(true)
    dispatch(addRoomId(e.id_room))
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={region} //your region data goes here.
          onRegionChangeComplete={(region) => setRegion(region)}
        >
          {/* <Marker draggable
            coordinate={region}
            onDragEnd={() => setRegion({ ...region, latitude: region.latitude })}
          /> */}
          {markers && markers.map((e, i) =>
            <Marker
              coordinate={e}
              key={i}
              pinColor={colorArr[i]}
              title='achbghiti bro'
              description="hhhhhhhhhhhhhhhhhhhhhhh"
              //uses relative file path. 
              onPress={() => DeleviryPopUp(e, i)}
            >
              <Image
                source={require("../assets/bclick.png")}
                style={{ width: 80, height: 80 }}
              />
            </Marker>
          )
          }
          {/* <Marker coordinate={asfi2}
            pinColor="red"

          />
          <Marker coordinate={asfi3}
            pinColor="pink"

          />
          <Marker coordinate={asfi4}
            pinColor="yellow"

          /> */}

        </MapView>

      </View>

      {/* <View style={tw`w-full flex-col justify-center bg-black `}>
        <Text style={tw`w-full h-[50px] flex-row m-auto   text-white`}>
          <Button title="Click Here" />
        </Text>
        <Text style={styles.text}>Current latitude: {region.latitude}</Text>
        <Text style={styles.text}>Current longitude: {region.longitude}</Text>
      </View> */}

      {modelPopUp && <DeliveryModel navigation={navigation} setModalVisible={setModelPopUp} modalVisible={modelPopUp} />}
      {/* <Text onPress={tracking} style={styles.title}>
        {text}
      </Text> */}

      <View style={tw`flex w-full`}>
        <Button
          onPress={() => logout()}
          title="Log out"
          color="red"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      {/* <View style={styles.separator} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    width: width,
    height: height,
  },
  text: {
    color: "white"
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
});

export default HomeScreen;
