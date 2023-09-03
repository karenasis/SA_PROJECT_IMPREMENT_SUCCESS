import React from "react";
import { FlatList } from "react-native";
import { View, Text } from "react-native-web";

export default function PlaceList({placeList}) {
    return (
        <View>
            <Text>found {placeList.lenght} Places</Text>

            <FlatList data={placeList}
            renderItem={({item}) => (
                <PlaceItem place={item} />
            )} />
        </View>
    )
}