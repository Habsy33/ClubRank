import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

// Dummy venue rankings data
const rankings = [
  {
    id: 1,
    name: "Hide & Seek",
    tags: ["Bar", "Jazz"],
    rating: 9.6,
    review: "Yea Mate, This plays rocked my nuts.",
    users: "@habeeb @jordan @morgan",
    image: "https://via.placeholder.com/80",
    profilePic: "https://via.placeholder.com/30"
  },
  {
    id: 2,
    name: "WonderBar",
    tags: ["NightClub", "EDM"],
    rating: 7.8,
    review: "Yea Mate, This plays tickled my nuts.",
    users: "@habeeb",
    image: "https://via.placeholder.com/80",
    profilePic: "https://via.placeholder.com/30"
  },
  {
    id: 3,
    name: "Manouka",
    tags: ["Rave", "Techno"],
    rating: 5.4,
    review: "Yea Mate, This plays was lukewarm on my nuts.",
    users: "@habeeb",
    image: "https://via.placeholder.com/80",
    profilePic: "https://via.placeholder.com/30"
  },
  {
    id: 4,
    name: "Lucky’s",
    tags: ["Bar", "Rock"],
    rating: 3.6,
    review: "Yea Mate, This plays was pouring a bucket of ice on my nuts after a day's work in the Tundra.",
    users: "@habeeb",
    image: "@/assets/images/hidenseek.png",
    profilePic: "@/assets/images/hidenseek.png"
  },
];

const Futurespots: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header with Profile */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>ClubRank</Text>
        <Image source={{ uri: "https://via.placeholder.com/60" }} style={styles.profilePic} />
        <Text style={styles.headerText}>FutureSpots</Text>
        <TouchableOpacity style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>⌄</Text>
        </TouchableOpacity>
      </View>

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
              <TouchableOpacity style={styles.plusButton}>
                <Text style={styles.plusSymbol}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.trashIcon}>🗑</Text>
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

export default Futurespots;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 15,
  },
  headerContainer: {
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    flexDirection: "row",
    textAlign: "center",
    marginTop: 60,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: -75,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    flex: 1,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  dropdownButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownText: {
    fontSize: 35,
    marginLeft: 300,
    marginTop: -55,
  },
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  venueCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
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
    paddingHorizontal: 10,
  },
  plusButton: {
    width: 25,          // Circle width
    height: 25,         // Circle height
    borderRadius: 25/2,   // Ensures it's a perfect circle
    borderWidth: 2,
    borderColor: "#E65C4F",
    backgroundColor: "#transparent", // Orange color
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  plusSymbol: {
    color: "#E65C4F",      // White plus sign
    fontSize: 20,       // Bigger font for visibility
    fontWeight: "bold",
    lineHeight: 21,
  },  
  trashIcon: {
    color: "#E65C4F", // Orange color
    fontSize: 18,     // Adjust icon size if needed
    fontWeight: "bold",
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
    paddingVertical: 2,
    paddingHorizontal: 6,
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
  },
  userTags: {
    fontSize: 12,
    color: "#666",
  },
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
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 60,
  },
  icon: {
    fontSize: 18,
    marginHorizontal: 5,
  },
});