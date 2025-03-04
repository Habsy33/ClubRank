import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width } = Dimensions.get("window");

const ProfileScreen: React.FC = () => {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section with Background Color */}
      <View style={styles.topContainer}>
        {/* Top Row: Username (Left), Plus Sign & Settings (Right) */}
        <View style={styles.topRow}>
          <Text style={styles.username}>habeeb.rtw</Text>
          <View style={styles.rightIcons}>
            {/* Plus sign aligned with settings */}
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton} onPress={() => {router.push("/expanded-tabs/Settings")}}>
              <Text style={styles.settingsIcon}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Avatar & Basic Info */}
        <View style={styles.avatarWrapper}>
          {/* Local image for profile picture */}
          <Image
            source={require("@/assets/images/TempProfilePic.png")}
            style={styles.avatar}
          />
          <Text style={styles.statsText}>
            255 Followers • 32 Reviews • 200 Following
          </Text>
          <Text style={styles.bioText}>I like to go places ig...</Text>

          {/* Buttons: Edit / Share */}
          <View style={styles.profileActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Scrollable Content Below */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top 3 Ranked Visits - Side by Side */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your top 3 ranked visits...</Text>
          <View style={styles.topThreeRow}>
            {[1, 2, 3].map((rank) => (
              <View style={styles.topThreeItem} key={rank}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankBadgeText}>{rank}</Text>
                </View>
                <Text style={styles.visitPlace}>Hide &amp; Seek</Text>
                <Text style={styles.visitDetails}>⭐ 8.7</Text>
                <Text style={styles.visitDetails}>Visited Recently</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Where You're Going */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>See where you’re going...</Text>
          <View style={styles.goingRow}>
            {/* Small image on the left */}
            <Image
              source={require("@/assets/images/HidennSeekProPic.png")}
              style={styles.goingImage}
            />
            <Text style={styles.goingText}>Hide &amp; Seek • 12/12</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreGoingText}>See more &gt;</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Reviews */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Reviews...</Text>
          <View style={styles.reviewItem}>
            {/* Local image on the left */}
            <Image
              source={require("@/assets/images/HidennSeekProPic.png")}
              style={styles.reviewImage}
            />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewTitle}>
                Hide &amp; Seek • ⭐ 8.7 • 1.3km • Bar
              </Text>
              <Text style={styles.reviewSnippet}>Visited Recently</Text>
              <Text style={styles.reviewSnippet}>
                Avoid this place if you hate fun...
              </Text>
            </View>
          </View>
          {/* Centered "See More Reviews..." */}
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreButtonText}>See More Reviews...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation (Optional) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text>Rate Page</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text>My Nights</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  // Top portion background
  topContainer: {
    backgroundColor: "#FF5E62",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  plusButton: {
    marginRight: 15,
    marginTop: -2,
  },
  plusText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "600",
  },
  settingsButton: {
    padding: 10,
  },
  settingsIcon: {
    fontSize: 22,
    color: "#FFF",
  },
  avatarWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    resizeMode: "cover",
  },
  statsText: {
    color: "#FFF",
    marginBottom: 5,
  },
  bioText: {
    color: "#FFF",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  profileActions: {
    flexDirection: "row",
    marginTop: 5,
  },
  actionButton: {
    backgroundColor: "#EEE",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  topThreeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  topThreeItem: {
    alignItems: "center",
    width: width * 0.25,
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFA500",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  rankBadgeText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  visitPlace: {
    fontWeight: "600",
    marginBottom: 2,
  },
  visitDetails: {
    color: "#333",
    fontSize: 12,
  },
  // "See where you're going" section
  goingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goingImage: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    marginRight: 8,
  },
  goingText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  seeMoreGoingText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  // Recent Reviews
  reviewItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: "cover",
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewTitle: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  reviewSnippet: {
    color: "#777",
  },
  seeMoreButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  seeMoreButtonText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  // Bottom navigation bar
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
