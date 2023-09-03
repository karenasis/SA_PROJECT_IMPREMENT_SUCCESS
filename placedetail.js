import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { styles } from '../component/style';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import GlobalApi from '../services/GlobalApi';

export default function PlaceDetail() {
  const param = useRoute().params;
  const [place, setPlace] = useState([]);
  //const [detail, setDetail] = useState([]);

  useEffect(() => {
    setPlace(param.place)
    //console.log(param.place)
  }, [])

  /*useEffect(() => {
    GetDetail()
    console.log(detail)
  }, [])*/

  /*const GetDetail = () => {
    GlobalApi.detailPlace(place.place_id).then(resp=>{
      setDetail(resp.data.results);
    })
  }*/

  return (
    <View>
      <View style={styles.detailBar}>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>{place.name}</Text>
      </View>

      <View style={{backgroundColor: 'black', padding: 15}}>
        <Image source={{uri:
          'https://maps.googleapis.com/maps/api/place/photo?' + 
          'maxwidth=1600' +
          '&photo_reference=' +
          param.place.photos[0].photo_reference +
          '&key=AIzaSyAfKmEHsgxwQ3IbErdzuFZHK8978U4VJPA'}}
        style={{width: '100%', height: 300, borderRadius: 25}} />
      </View>

      <View style={styles.detailBar}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>
          {<FontAwesome5 name="map-marker-alt" size={24} color="black" />}
          {'    '}
          {place.vicinity}
        </Text>
      </View>

      <View style={styles.detailBar}>
        <Text style={param.place.opening_hours.open_now ? styles.textOpen : styles.textClose}>
          <Feather name="clock" size={24} color="black" />
          {'    '}
          {param.place.opening_hours.open_now ? 'open' : 'close'}
        </Text>
      </View>
    </View>
  )
}