import 'nativewind';
import './global.css';
import { View, Text } from 'react-native'
import React from 'react'
import Button from '@shipex/components/Buttons/Button'

export default function App() {
  return (
    <View className='flex-1'>
      <Text>App</Text>
      <Button label='New'/>
    </View>
  )
}