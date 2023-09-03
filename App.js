import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import react navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './login';
import { useState, useEffect } from 'react';
import axios from 'axios';
import userlogin from './userlogin';
import annonymous from './annonymous';
const Stack = createNativeStackNavigator();
///////////////////////////////////////////////
import HomeScreen from './screens/homescreen';
import Map from './screens/map';
import PlaceDetail from './screens/placedetail';
import { UserLocationContext } from './context/UserLocationContext';
import * as Location from 'expo-location';



export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }{/*ask for permission */}

      let location = await Location.getLastKnownPositionAsync();{/*get the position, if fail will use the last known one */}
      
      setLocation(location);
      //console.log(location);
    })();
  }, []);{/*asking for position permission */}

  return (
    <UserLocationContext.Provider value={{location, setLocation}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={userlogin} />




        
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{ headerShown: false, }} />{/*modify header of homescreen */}

        <Stack.Screen name="Map"
          component={Map}
          options={{/*modify header of Map Screen */
            title: "Where's My Beer",
            headerStyle: { backgroundColor: 'yellow' },
            headerTitleStyle: { fontWeight: 'bold' }
          }} />
          <Stack.Screen name='PlaceDetail'
            component={PlaceDetail}
            options={{/*modify header of placedetail Screen */
            title: 'Detail',
            headerStyle: {backgroundColor: 'yellow'},
            headerTitleStyle: {fontWeight: 'bold'}}} />

      



        <Stack.Screen name="Register" component={login} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserLocationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
