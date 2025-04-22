import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { auth } from '../../configs/Firebase_Config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import AppText from '../../components/ui/AppText';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppCard from '../../components/ui/AppCard';
import AppButton from '../../components/ui/AppButton';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    if (user) {
      setUserName(user.displayName || 'Travel Enthusiast');
      setUserEmail(user.email || '');
    }
  }, [user]);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/');
            } catch (error) {
              console.error("Error signing out: ", error);
              Alert.alert("Error", "Failed to sign out. Please try again.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const preferences = [
    { id: 1, icon: "bed-outline", title: "Preferred Accommodation", value: "Hotels & Resorts", color: Colors.ACCENT_1 },
    { id: 2, icon: "airplane-outline", title: "Flight Class", value: "Economy", color: Colors.ACCENT_2 },
    { id: 3, icon: "restaurant-outline", title: "Dining Preference", value: "Local Cuisine", color: Colors.ACCENT_3 },
    { id: 4, icon: "language-outline", title: "Language", value: "English", color: Colors.ACCENT_1 },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.BACKGROUND_DARK, 'rgba(18,18,18,0.8)']}
        style={styles.headerGradient}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={Colors.GRADIENT_PRIMARY}
                style={styles.avatarGradient}
              >
                <AppText variant="h3" style={styles.avatarText}>
                  {userName.charAt(0).toUpperCase()}
                </AppText>
              </LinearGradient>
            </View>
            
            <View style={styles.userInfo}>
              <AppText variant="h4">{userName}</AppText>
              <AppText variant="body2" color="secondary">{userEmail}</AppText>
            </View>
          </View>

          <AppButton
            title="Edit Profile"
            variant="outline"
            size="small"
            icon={<Ionicons name="create-outline" size={16} color={Colors.TEXT_PRIMARY} style={{marginRight: 8}} />}
            style={styles.editButton}
          />
        </View>
        
        <View style={styles.section}>
          <AppText variant="h5" style={styles.sectionTitle}>Travel Preferences</AppText>
          
          {preferences.map(pref => (
            <AppCard key={pref.id} style={styles.preferenceCard}>
              <View style={styles.preferenceContent}>
                <View style={[styles.prefIconContainer, { backgroundColor: `${pref.color}20` }]}>
                  <Ionicons name={pref.icon} size={20} color={pref.color} />
                </View>
                <View style={styles.preferenceTextContainer}>
                  <AppText variant="body2" color="secondary">{pref.title}</AppText>
                  <AppText variant="subtitle2">{pref.value}</AppText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.TEXT_TERTIARY} />
              </View>
            </AppCard>
          ))}
        </View>
        
        <View style={styles.section}>
          <AppText variant="h5" style={styles.sectionTitle}>Account</AppText>
          
          <AppCard style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="notifications-outline" size={22} color={Colors.PRIMARY} />
              <AppText variant="body" style={styles.menuText}>Notifications</AppText>
              <Ionicons name="chevron-forward" size={18} color={Colors.TEXT_TERTIARY} style={styles.menuArrow} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="lock-closed-outline" size={22} color={Colors.PRIMARY} />
              <AppText variant="body" style={styles.menuText}>Privacy & Security</AppText>
              <Ionicons name="chevron-forward" size={18} color={Colors.TEXT_TERTIARY} style={styles.menuArrow} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={22} color={Colors.PRIMARY} />
              <AppText variant="body" style={styles.menuText}>App Settings</AppText>
              <Ionicons name="chevron-forward" size={18} color={Colors.TEXT_TERTIARY} style={styles.menuArrow} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <Ionicons name="help-circle-outline" size={22} color={Colors.PRIMARY} />
              <AppText variant="body" style={styles.menuText}>Help & Support</AppText>
              <Ionicons name="chevron-forward" size={18} color={Colors.TEXT_TERTIARY} style={styles.menuArrow} />
            </TouchableOpacity>
          </AppCard>
        </View>

        <View style={styles.section}>
          <AppButton
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            style={styles.signOutButton}
            icon={<Ionicons name="log-out-outline" size={20} color={Colors.ERROR} style={{marginRight: 8}} />}
          />
          <AppText variant="caption" color="tertiary" align="center" style={styles.versionText}>
            AI TripPlanner v1.0.0
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_DARK,
  },
  headerGradient: {
    position: 'absolute',
    height: 200,
    left: 0,
    right: 0,
    top: 0,
  },
  header: {
    paddingTop: 70,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.WHITE,
  },
  userInfo: {
    flex: 1,
  },
  editButton: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  preferenceCard: {
    marginBottom: 10,
    padding: 0,
  },
  preferenceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  prefIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  preferenceTextContainer: {
    flex: 1,
  },
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuText: {
    marginLeft: 15,
    flex: 1,
  },
  menuArrow: {
    marginLeft: 10,
  },
  signOutButton: {
    marginBottom: 20,
  },
  versionText: {
    marginBottom: 30,
  },
});