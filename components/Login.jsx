import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login(){
    const router = useRouter();
  return (
    <View>
        <Image source={require('./../assets/images/LoginPage.png')}
        style={{
            width:'100%',
            height:'50%',
        }}
        />
        <View style={styles.container}>
            <Text style={{
                fontSize:20,
                fontFamily:"outfit-Bold",
                textAlign:'center',
                color:Colors.BLACK
            }}>AI TRAVEL PLANNER</Text>
            <Text style={{
                marginTop:0,
                padding:20,
                fontSize:15,
                fontFamily:"outfit-Regular",    
                textAlign:'center',
                color:Colors.RANDOM
            }}>Discover the best trip at your fingertips. Travel smart with AI-Driven Insights.</Text>
        <TouchableOpacity style={styles.button}
            onPress={()=>router.push('auth/Sign-in')}
        >
            <Text style = {{
                padding:15,
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:"outfit-Regular",
                fontSize:20,
            }}>Get started</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.CREAM,
        marginTop:'-20%',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        height:'100%',
        padding:20,
    },
    button:{

        marginTop:'15%',
        backgroundColor:Colors.BLACK,
        borderRadius:100,

    }
})

