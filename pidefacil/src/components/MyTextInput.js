import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import color from '@styles/colors'

export default function MyTextInput(props) {

  return (
    <Input
      style={{ alignItems: 'center' }}
      containerStyle={{ marginBottom: 10 }}
      inputStyle={{
        fontSize: 18, paddingVertical: 10,
        paddingHorizontal: 8, marginTop: 12,
        color: color.PRIMARY_COLOR,
        fontFamily: "LibreBaskerville-Regular",
      }}
      placeholderTextColor={color.SECONDARYCOLOR}
      placeholder={props.placeholder}
      leftIconContainerStyle={{ marginLeft: 0 }}
      leftIcon={<Icon size={24} color={color.PRIMARYCOLOR}
        type={'font-awesome'} name={props.image} />}
      
      errorStyle={{ color: color.RED }}
      errorMessage={(props.bolError) ? props.strError : ''}
      editable={props.editable}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      value={props.value} />
  )
}

const styles = StyleSheet.create({

  btnVisibility:
  {
    height: 40,
    width: 35,
    paddingTop: 8,
    paddingLeft: 5,
    paddingRight: 5
  },

  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
})