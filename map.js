import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../component/style';
import React, { useContext, useEffect, useState } from 'react';
import GlobalApi from '../services/GlobalApi';
import PlaceMarker from '../component/PlaceMarker';
import { UserLocationContext } from '../context/UserLocationContext';

//TODO: filter the CraftBeer business in the map
//TODO: optimize CraftBeer business filter and increase it's number
//TODO: ability to click on a marker
//TODO: place data after click

export default function Map() {
  const [mapRegion, setMapRegion] = useState([]);

  const {location, setLocation} = useContext(UserLocationContext);
  //console.log(location)

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0.006866,/*latDelta and longDelta control the zoom level*/
      })
    }
  }, [])/*set region for coordinate */
  //latitudeDelta: 0.004757, longitudeDelta: 0.006866,//

  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
      GetNearBySearchPlace();
      //console.log(placeList); //get a data sheet from api 
    }, []);

  const GetNearBySearchPlace = () => {
    GlobalApi.nearByPlace(location.coords.latitude, 
      location.coords.longitude).then(resp=>{
      setPlaceList(resp.data.results);
    });{/*request place api */}
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.mapContainer}>
            <MapView style={styles.mapSize} 
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapRegion}>
              
              <Marker
              title='You'
              coordinate={mapRegion} />

              {placeList.map((item, index) => index<=20&&(/*place business marker according to api data*/
                <PlaceMarker item={item} key={index}/>/* "index<=5&&" mean only place 5 location */
              ))}
            </MapView>
            {/*{placeList ? <PlaceList placeList={placeList} /> : null}*/}
      </View>
    </>
  );
}
