import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity,Text, Button } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import {COLORS, FONTS, SIZES} from "../constants";
import {LinearGradient} from "expo-linear-gradient";
import {AuthContext} from "../context/AuthContext";
import  { Roles} from '../models/User'
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
    const {signUp, loginUser, signout} = useContext(AuthContext);
    const onSignUpPressed =async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
        console.log('validation error',name, email , password, 'USER');
    }else {
        const role = {
            ADMIN: false, DELIVERY: false, MANAGER: false, USER: true
        };
    const res = await signUp(name.value, email.value , password.value, role);
    if(res){
        navigation.navigate('Home');
    }
        console.log('validation success',name, email , password, 'USER');
    }
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // })
  }

  const onSignOut =async () => {
const res = await  signout();

    navigation.navigate('Home')

  }
  console.log('loginuser', loginUser);
if(loginUser){
    return (
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
                style={[styles.shadow, { marginTop: SIZES.padding * 2, width: '70%', height: 50, alignItems: 'center', justifyContent: 'center' }]}
                onPress={() =>onSignOut()}
            >
                <LinearGradient
                    style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
                    colors={['#46aeff', '#5884ff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Log Out</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}
  return (
    <Background>
      <Logo />
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        placeholder='Name'
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        placeholder='Email'
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        placeholder='Password'
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
        <TouchableOpacity
            style={[styles.shadow, { marginTop: SIZES.padding * 2, width: '70%', height: 50, alignItems: 'center', justifyContent: 'center' }]}
            onPress={() =>onSignUpPressed()}
        >
            <LinearGradient
                style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
                colors={['#46aeff', '#5884ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign Up</Text>
            </LinearGradient>
        </TouchableOpacity>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
  },
    header: {
      color: 'blue',
        fontWeight: 'bold'
    }
})
