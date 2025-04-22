import { TextInput, View, StyleSheet, ToastAndroid, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors'
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../../configs/Firebase_Config'
import { LinearGradient } from 'expo-linear-gradient';
import AppText from '../../../components/ui/AppText';
import AppButton from '../../../components/ui/AppButton';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [])

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter all details", ToastAndroid.CENTER);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      router.replace('/MyTrip');
    } catch (error) {
      console.log(error.message, error.code);
      
      if (error.code === "auth/invalid-credential") {
        ToastAndroid.show("Invalid Credentials!", ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Login failed. Please try again.", ToastAndroid.LONG);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <LinearGradient
              colors={[Colors.BACKGROUND_DARK, Colors.BACKGROUND_ELEVATED]}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            > 
              <Ionicons name="arrow-back" size={24} color={Colors.TEXT_PRIMARY} />
            </TouchableOpacity>
            
            <View style={styles.header}>
              <AppText variant="h2" style={styles.headerText}>Welcome Back!</AppText>
              <AppText variant="subtitle1" color="secondary" style={styles.subheaderText}>
                Sign in to continue your travel journey
              </AppText>
            </View>
            
            {/* Logo/Illustration */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/adaptive-icon.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={Colors.TEXT_SECONDARY} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={Colors.TEXT_TERTIARY}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.TEXT_SECONDARY} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={Colors.TEXT_TERTIARY}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={Colors.TEXT_SECONDARY} 
                  />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.forgotPassword}>
                <AppText variant="caption" color="primary" align="right">
                  Forgot Password?
                </AppText>
              </TouchableOpacity>
              
              <AppButton
                title="Sign In"
                onPress={onSignIn}
                loading={isLoading}
                disabled={isLoading}
                fullWidth
                style={styles.signInButton}
              />
              
              <AppButton
                title="New user? Create Account"
                onPress={() => router.replace('auth/Sign-up')}
                variant="outline"
                fullWidth
                style={styles.createAccountButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  inner: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.BACKGROUND_ELEVATED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
  },
  headerText: {
    marginBottom: 10,
  },
  subheaderText: {
    marginBottom: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 120,
    height: 120,
    opacity: 0.9,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_ELEVATED,
    borderRadius: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputIcon: {
    marginLeft: 15,
  },
  input: {
    flex: 1,
    color: Colors.TEXT_PRIMARY,
    fontFamily: 'outfit-Regular',
    fontSize: 16,
    padding: 15,
  },
  eyeIcon: {
    padding: 15,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  signInButton: {
    marginTop: 10,
  },
  createAccountButton: {
    marginTop: 15,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});