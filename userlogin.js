import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'
import { useState, useEffect, React } from 'react';
// import { Axios } from 'axios';
import Axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';// import nev func

import login from './login';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const userlogin = () => {
    const navigation = useNavigation();//creat navigation func
    const [Username, setusername] = useState('')
    const [Password, setpassword] = useState('')
    const [check_u, setcheck_u] = useState(false)
    const [check_p, setcheck_p] = useState(false)
    //fetch func.
    const fetchUser = async () => {
        const url = "http://192.168.1.123:3000/api/select";
        const response = await axios.get(url);

       

        // console.log(response.data)
        //this statement for auth user 
        for (let i = 0; i < response.data.length; i++) {
            //auth username
            if(Username.includes(response.data[i].Username)){
                setcheck_u(true)
                if([check_u===true]){break;}
                
            }else{
                setcheck_u(false)
            }
            
          }
          for (let i = 0; i < response.data.length; i++) {
            //auth username
            if(Password.includes(response.data[i].Password)){
                setcheck_p(true)
                if([check_p===true]){break;}
                
            }else{
                setcheck_p(false)
            }
            
          }
        //   console.log(check_u)
        // console.log(check_p)
        if(check_u&&check_p==true){
            navigation.navigate("Home")
        }else{
            alert("login fail!")
        }
        }
   
  
    return (
        // style={{flex: 1, backgroundColor: 'black'}}
       
        <View style={{flex: 1, backgroundColor: 'black'}}>
             
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >


                <View style={styles.inputContainer}>

                    <TextInput placeholder="Username"

                        style={styles.input}
                    onChangeText={newText => setusername(newText)}


                    />

                    <TextInput placeholder="Password"
                        maxLength={8}
                        style={styles.input}
                        secureTextEntry
                    onChangeText={newText => setpassword(newText)}
                    />
                    <View style={styles}>
                    </View>
                    <View style={styles.buttonContainer}

                        onPress={() =>
                            navigation.navigate({})//button
                        }>

                        <TouchableOpacity
                            // onPress={() => {}}
                            // onPress={()=>{onclick={submitReview}}}
                             onPress={fetchUser}
                            style={styles.button}>

                            <Text style={[styles.buttonOutlineText, styles.buttonText]}>Login</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                            // onPress={() => {}}
                            // onPress={()=>{onclick={submitReview}}}
                            // onPress={submitReview}
                            style>

                            <Text style={[styles.regtext]}>Don't have account?  Register</Text>
                        </TouchableOpacity>

                    </View>


                </View>

            </KeyboardAvoidingView>
        </View>
    )
}

export default userlogin

const styles = StyleSheet.create({
    container: {
        marginTop: 230,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        textAlign: 'left',
        padding: 10



    },
    buttonContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10,


    },
    button: {
        backgroundColor: '#FFFF00',
        width: '127%',
        padding: 15,
        borderRadius: 10,
        marginLeft: 95,
        
        
        

    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,

        borderWidth: 2,
        alignContent:'center',
        alignItems:'center',


    },
    buttonText: {

        fontWeight: '700',
        fontSize: 16,
        textAlign:'center'
        

    },

    buttonOutlineText: {


        fontWeight: '700',
        fontSize: 16,

    },
    erorText: {
        color: 'red',
        marginLeft: 20,
    },
    regtext: {
        marginTop: 10,
        marginLeft:10,
        fontWeight:'bold',
        color:'white',
    },
    erorText: {
        color: 'red',
        marginLeft: 20,
    },

})