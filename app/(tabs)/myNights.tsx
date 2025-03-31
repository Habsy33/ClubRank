import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";

const rankings = [
  {
    id: 1,
    name: "Hide & Seek",
    tags: ["Bar", "Jazz"],
    rating: 9.6,
    review: "Yea Mate, This plays rocked my nuts.",
    users: "@habeeb @jordan @morgan",
    image: require("../../assets/images/hidenseek.png"),
    profilePic: require("../../assets/images/TempProfilePic.png"),
  },
  {
    id: 2,
    name: "WonderBar",
    tags: ["NightClub", "EDM"],
    rating: 7.8,
    review: "Yea Mate, This plays tickled my nuts.",
    users: "@habeeb",
    image: require("../../assets/images/rave.jpg"),
    profilePic: require("../../assets/images/TempProfilePic.png"),
  },
  {
    id: 3,
    name: "Manouka",
    tags: ["Rave", "Techno"],
    rating: 5.4,
    review: "Yea Mate, This plays was lukewarm on my nuts.",
    users: "@habeeb",
    image: require("../../assets/images/rave.jpg"),
    profilePic: require("../../assets/images/TempProfilePic.png"),
  },
  {
    id: 4,
    name: "Lucky's",
    tags: ["Bar", "Rock"],
    rating: 3.6,
    review: "Yea Mate, This place was pouring a bucket of ice on my nuts after a day's work in the Tundra.",
    users: "@habeeb",
    image: require("../../assets/images/hidenseek.png"),
    profilePic: require("../../assets/images/TempProfilePic.png"),
  },
];

export default function MyNights() {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>ClubRank</Text>
      </View>

      {/* Centered Title with Dropdown and Profile Pic */}
      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <Image 
            source={require("../../assets/images/TempProfilePic.png")} 
            style={styles.profilePic} 
            defaultSource={require("../../assets/images/TempProfilePic.png")}
          />
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.dropdownButton}>
            <Text style={styles.headerText}>My Nights ⌄</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => router.push("/expanded-tabs/Drafts")}>
            <Text style={styles.dropdownItem}>Drafts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/expanded-tabs/Futurespots")}>
            <Text style={styles.dropdownItem}>FutureSpots</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {["All Venues", "Bars", "Clubs", "Raves", "Jazz"].map((category, index) => (
          <TouchableOpacity key={index} style={[styles.categoryButton, index === 0 && styles.activeCategory]}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Your Rankings Title */}
      <Text style={styles.rankingsTitle}>Your Rankings</Text>

      {/* All Venues Scrollable */}
      <ScrollView style={styles.rankingsContainer}>
        {rankings.map((venue) => (
          <View key={venue.id} style={styles.venueCard}>
            <Image source={venue.image} style={styles.venueImage} />
            <View style={styles.venueInfo}>
              <View style={styles.venueHeader}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <View style={styles.tagContainer}>
                  {venue.tags.map((tag) => (
                    <Text key={tag} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.userReview}>
                <Image source={venue.profilePic} style={styles.reviewProfilePic} />
                <Text style={styles.reviewText}>{venue.review}</Text>
              </View>
              <Text style={styles.userTags}>{venue.users}</Text>
              
              {/* Rating & Icons */}
              <View style={styles.ratingContainer}>
                <Text style={[styles.rating, getRatingStyle(venue.rating)]}>{venue.rating}</Text>
                <View style={styles.iconContainer}>
                  <TouchableOpacity>
                    <Text style={styles.icon}>✎</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.icon}>🗑</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Function to color rating based on value
const getRatingStyle = (rating: number) => {
  if (rating >= 8) return { backgroundColor: "#4CAF50" }; // Green
  if (rating >= 5) return { backgroundColor: "#FFC107" }; // Yellow
  return { backgroundColor: "#F44336" }; // Red
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  rankingsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -10,
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  rankingsContainer: {
    paddingHorizontal: 15,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  dropdownButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownMenu: {
    position: "absolute",
    top: 90,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 160,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryScroll: {
    marginVertical: 20,
    paddingHorizontal: 15,
    height: 60, // Add fixed height to prevent cutting
},
categoryButton: {
    paddingVertical: 10, // Increased vertical padding
    paddingHorizontal: 16, // Slightly increased horizontal padding
    borderRadius: 20, // More rounded corners for better appearance
    backgroundColor: 'rgba(255, 119, 34, 0.28)',
    marginRight: 10, // Slightly increased margin between buttons
    height: 36, // Fixed height for consistency
    justifyContent: 'center', // Center text vertically
    alignItems: 'center',
},
categoryText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    includeFontPadding: false, // This prevents extra padding around text
    textAlignVertical: 'center', // Ensures text is properly centered
},
  activeCategory: {
    backgroundColor: Colors.primary.orange,
  },
  venueCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  venueImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 12,
  },
  venueInfo: {
    flex: 1,
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    backgroundColor: Colors.background.redLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  userReview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  reviewProfilePic: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  userTags: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    fontSize: 20,
    color: Colors.text.warning,
  },
});
