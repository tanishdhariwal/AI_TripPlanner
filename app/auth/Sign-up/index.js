import { TextInput, View, StyleSheet, ToastAndroid, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors'
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from './../../../configs/Firebase_Config'
import { LinearGradient } from 'expo-linear-gradient';
import AppText from '../../../components/ui/AppText';
import AppButton from '../../../components/ui/AppButton';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const onCreateAccount = async () => {
    if (!email || !password || !name) {
      ToastAndroid.show("Please enter all details", ToastAndroid.CENTER);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.CENTER);
      return;
    }

    if (password.length < 6) {
      ToastAndroid.show("Password must be at least 6 characters", ToastAndroid.CENTER);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update the user profile with the name
      await updateProfile(user, { displayName: name });
      
      console.log("User created:", user);
      router.replace('/MyTrip');
    } catch (error) {
      console.log(error.message, error.code);
      
      if (error.code === "auth/email-already-in-use") {
        ToastAndroid.show("Email is already in use", ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Account creation failed. Please try again.", ToastAndroid.LONG);
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
      <LinearGradient
        colors={[Colors.BACKGROUND_DARK, Colors.BACKGROUND_ELEVATED]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            > 
              <Ionicons name="arrow-back" size={24} color={Colors.TEXT_PRIMARY} />
            </TouchableOpacity>
            
            <View style={styles.headerContainer}>
              <AppText variant="h2" style={styles.headerText}>Create Account</AppText>
              <AppText variant="subtitle1" color="secondary" style={styles.subheaderText}>
                Join our community of travelers
              </AppText>
            </View>
            
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={Colors.TEXT_SECONDARY} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={Colors.TEXT_TERTIARY}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
              
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
              
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.TEXT_SECONDARY} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.TEXT_TERTIARY}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
              </View>
              
              <AppButton
                title="Create Account"
                onPress={onCreateAccount}
                loading={isLoading}
                disabled={isLoading}
                fullWidth
                style={styles.createButton}
              />
              
              <AppButton
                title="Already have an account? Sign In"
                onPress={() => router.replace('auth/Sign-in')}
                variant="outline"
                fullWidth
                style={styles.signInButton}
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
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    padding: 30,
    paddingTop: 100,
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
  headerContainer: {
    marginBottom: 30,
  },
  headerText: {
    marginBottom: 10,
  },
  subheaderText: {
    marginBottom: 5,
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
  createButton: {
    marginTop: 20,
  },
  signInButton: {
    marginTop: 15,
  },
});