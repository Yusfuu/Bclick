import { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import tw from 'twrnc';

export const LoadAvatar = ({ url }) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={tw`justify-center items-center`}>
      <Image
        source={{ uri: url }}
        style={tw`w-full h-full rounded-full`}
        resizeMode='cover'
        onLoad={() => setLoading(false)}
      />
      {loading && <ActivityIndicator style={tw`absolute`} color='#fb923c' />}
    </View>
  );
};
