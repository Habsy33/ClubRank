import React from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";

const Settings: React.FC = () => {
  const router = useRouter();
  const [faceIdEnabled, setFaceIdEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push("/profile")}> 
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings and activity</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("@/assets/images/TempProfilePic.png")}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.profileName}>Habeeb Oluyemo</Text>
          <Text style={styles.profileHandle}>@Habeebo</Text>
        </View>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Settings List */}
      <ScrollView style={styles.settingsList}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>My Account</Text>
          <Text style={styles.settingSubtitle}>Make changes to your account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>Your Preferences</Text>
          <Text style={styles.settingSubtitle}>Edit or add to your fitness preferences</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>Your location</Text>
          <Text style={styles.settingSubtitle}>Manage your saved account</Text>
        </TouchableOpacity>

        <View style={styles.settingItemRow}>
          <View>
            <Text style={styles.settingTitle}>Face ID / Touch ID</Text>
            <Text style={styles.settingSubtitle}>Manage your device security</Text>
          </View>
          <Switch
            value={faceIdEnabled}
            onValueChange={() => setFaceIdEnabled(!faceIdEnabled)}
          />
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
          <Text style={styles.settingSubtitle}>Further secure your account for safety</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>Log out</Text>
          <Text style={styles.settingSubtitle}>Further secure your account for safety</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>More</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>About App</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFA07A",
  },
  backArrow: {
    fontSize: 24,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFDAB9",
    borderRadius: 10,
    margin: 16,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileHandle: {
    fontSize: 14,
    color: "gray",
  },
  editIcon: {
    marginLeft: "auto",
    fontSize: 18,
  },
  settingsList: {
    paddingHorizontal: 16,
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  settingSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  settingItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Settings;
