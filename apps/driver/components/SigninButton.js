import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

export const SigninButton = ({ onPress, enabel, loading }) => {
  return (
    <View
      style={tw`${
        enabel ? '' : 'opacity-60'
      } w-full bg-orange-500 text-white py-5 mt-4 rounded-2xl`}>
      <TouchableOpacity
        onPress={onPress}
        style={tw`flex justify-center items-center`}>
        {loading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={tw`text-white shadow-sm text-center font-bold`}>
            Login
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
