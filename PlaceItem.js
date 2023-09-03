import { View, Text } from 'react-native'
import React from 'react'

export default function PlaceItem({place}) {
  return (
    <View>
      <View>
        <Text>{place.name}</Text>
      </View>
    </View>
  )
}