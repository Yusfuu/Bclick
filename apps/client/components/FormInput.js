import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';

export const FormInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secure = false,
  label,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={tw`w-full shadow-sm m-2`}>
      <Text style={tw`capitalize mb-2 text-lg`}>{label}</Text>
      <TextInput
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        autoComplete='off'
        style={tw` ${
          focus ? 'border-2 border-orange-400' : 'border border-gray-300'
        } w-full h-14 px-4 rounded-2xl`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secure}
      />
    </View>
  );
};
