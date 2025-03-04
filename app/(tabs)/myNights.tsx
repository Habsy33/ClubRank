import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const rankings = [
  {
    id: 1,
    name: "Hide & Seek",
    tags: ["Bar", "Jazz"],
    rating: 9.6,
    review: "Yea Mate, This plays rocked my nuts.",
    users: "@habeeb @jordan @morgan",
    image: "https://via.placeholder.com/80",
    profilePic: "https://via.placeholder.com/30",
  },
  {
    id: 2,
    name: "WonderBar",
    tags: ["NightClub", "EDM"],
    rating: 7.8,
    review: "Yea Mate, This plays tickled my nuts.",
    users: "@habeeb",
    image: "https://via.placeholder.com/80",
    profilePic: "https://via.placeholder.com/30",
  },
  {
    id: 3,
    name: "Manouka",
    tags: ["Rave", "Techno"],
    rating: 5.4,
    review: "Yea Mate, This plays was lukewarm on my nuts.",
    users: "@habeeb",
    image: "https://via.placeholder.com/80",
    profilePic: "https://via.placeholder.com/30",
  },
  {
    id: 4,
    name: "Lucky’s",
    tags: ["Bar", "Rock"],
    rating: 3.6,
    review: "Yea Mate, This plays was pouring a bucket of ice on my nuts after a day's work in the Tundra.",
    users: "@habeeb",
    image: "@/assets/images/hidenseek.png",
    profilePic: "@/assets/images/hidenseek.png",
  },
];

const MyNights: React.FC = () => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>ClubRank</Text>
        <Image source={{ uri: "https://via.placeholder.com/60" }} style={styles.profilePic} />
      </View>

      {/* Centered Title with Dropdown */}
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.dropdownButton}>
          <Text style={styles.headerText}>My Nights ⌄</Text>
        </TouchableOpacity>
      </View>

{/* Dropdown Menu */}
{dropdownVisible && (
  <View style={styles.dropdownMenu}>
    <TouchableOpacity
      onPress={() => {
        setDropdownVisible(false);
        router.push("/expanded-tabs/Drafts"); // Navigate to Drafts page
      }}
    >
      <Text style={styles.dropdownItem}>Drafts</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
      onPress={() => {
        setDropdownVisible(false);
        router.push("/expanded-tabs/Futurespots"); // Navigate to FutureSpots
      }}
    >
      <Text style={styles.dropdownItem}>FutureSpots</Text>
    </TouchableOpacity>
  </View>
)}


      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {["All Venues", "Bars", "Clubs", "Raves", "Jazz"].map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={[styles.categoryText, index === 0 && styles.activeCategory]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Your Rankings Title */}
      <Text style={styles.sectionTitle}>Your Rankings</Text>

      {/* Rankings List */}
      {rankings.map((venue) => (
        <View key={venue.id} style={styles.venueCard}>
          <Image source={{ uri: venue.image }} style={styles.venueImage} />
          <View style={styles.venueInfo}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <View style={styles.tagContainer}>
              {venue.tags.map((tag) => (
                <Text key={tag} style={styles.tag}>{tag}</Text>
              ))}
            </View>
            <View style={styles.userReview}>
              <Image source={{ uri: venue.profilePic }} style={styles.reviewProfilePic} />
              <Text style={styles.reviewText}>{venue.review}</Text>
            </View>
            <Text style={styles.userTags}>{venue.users}</Text>
          </View>

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
      ))}
    </ScrollView>
  );
};

// Function to color rating based on value
const getRatingStyle = (rating: number) => {
  if (rating >= 8) return { backgroundColor: "#4CAF50" }; // Green
  if (rating >= 5) return { backgroundColor: "#FFC107" }; // Yellow
  return { backgroundColor: "#F44336" }; // Red
};

export default MyNights;

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    flex: 1,
  },

  // Header Section
  headerContainer: {
    alignItems: "center", // Center content horizontally
    justifyContent: "center",
    paddingVertical: 40, // Adjust padding to bring it lower
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -80, // Move closer to "My Nights"
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10, // Adjust space between "ClubRank" and the profile picture
  },

  // Centered Title with Dropdown
  titleContainer: {
    alignItems: "center",
    paddingVertical: 10,
    marginTop: -20, // Adjust space between "ClubRank" and "My Nights"
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
    top: 90, // Adjust dropdown position
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

  // Category Tabs
  categoryScroll: {
    marginVertical: 10,
  },
  categoryButton: {
    paddingVertical: 5,
    marginTop: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#555",
  },
  activeCategory: {
    fontWeight: "bold",
    color: "#E65C4F",
  },

  // Rankings Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  // Venue Cards
  venueCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  venueImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  venueInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  venueName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  tagContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  tag: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 12,
    marginRight: 5,
  },

  userReview: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  reviewProfilePic: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 5,
  },
  reviewText: {
    fontSize: 12,
    color: "#666",
    flexShrink: 1,
  },
  userTags: {
    fontSize: 12,
    color: "#666",
  },

  // Rating & Icons
  ratingContainer: {
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  icon: {
    fontSize: 18,
    marginHorizontal: 6,
  },
});
