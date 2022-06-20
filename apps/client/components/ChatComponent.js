import { View, Text, Image } from 'react-native';
import tw from "twrnc";




export const ChatComponent = ({ lastMsg }) => {
    return (
        <>
            <View style={tw`flex-row w-full mt-2 `}>
                <View>
                    <Image
                        style={tw`w-[75px] rounded-full h-[75px] ml-4 mr-4 `}
                        source={require("../assets/imageProfile.jpg")}
                    />
                </View>
                <View style={tw`flex-col justify-center w-full   `}>
                    <Text style={tw`text-black text-xl`}>Azeddine ELhanouni</Text>
                    <View style={tw`flex-row  w-40  `}>
                        <Text style={tw`text-gray-400 mr-4`}>{lastMsg}</Text>
                        <Text style={tw`text-gray-400`}>19:24</Text>
                    </View>
                </View>
            </View>
        </>
    )
}


