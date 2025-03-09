import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Dummy venue data
const venues = [
  { id: 1, name: "Balls", tags: ["Bar", "Jazz"], distance: "1.1km", rating: 9.4, reviews: "10+ Reviews", image: require("@/assets/images/hidenseek.png"), userNote: "@habeeb has been here" },
  { id: 2, name: "Shaft", tags: ["Rave", "Techno"], distance: "1.4km", rating: 9.2, reviews: "3 Reviews", image: require("@/assets/images/hidenseek.png") },
  { id: 3, name: "Butt", tags: ["NightClub", "EDM"], distance: "1.4km", rating: 8.8, reviews: "300 Reviews", image: require("@/assets/images/hidenseek.png") },
];

// Venue Image Component
const VenueImage = ({ source }: { source: any }) => (
  <Image source={source} style={styles.venueImage} />
);

const Discover: React.FC = () => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ClubRank</Text>
      <Text style={styles.header1}>Nightlife Venue Finder</Text>

      <ScrollView style={styles.scrollContainer}>
        {/* Subheading with Dropdown */}
        <View style={styles.subHeaderContainer}>
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.dropdownButton}>
            <Text style={styles.subHeader}>Locals Only v</Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              onPress={() => {
                setDropdownVisible(false);
                router.push("/expanded-tabs/friendsRec"); // Navigate to Friends Rec page
              }}
            >
              <Text style={styles.dropdownItem}>Friends Rec</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDropdownVisible(false);
                router.push("/(tabs)/discover");
              }}
            >
              <Text style={styles.dropdownItem}>Fresh Finds</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search Inputs */}
        <TextInput placeholder="Search Venues..." style={styles.searchBar} placeholderTextColor="#999" />

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {["All Venues", "Distance", "Bars", "Clubs", "Raves", "Jazz", "Capacity"].map((category) => (
            <TouchableOpacity key={category} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Top Venues */}
        <Text style={styles.sectionTitle}>Top Venues</Text>
        <View style={styles.venueList}>
          {venues.map((venue, index) => (
            <View key={venue.id} style={styles.venueCard}>
              <Text style={styles.venueRank}>{index + 1}</Text>
              <VenueImage source={venue.image} />
              <View style={styles.venueInfo}>
                <View style={styles.venueHeader}>
                  <Text style={styles.venueName}>{venue.name}</Text>
                  <View style={styles.tagContainer}>
                    {venue.tags.map((tag) => (
                      <Text key={tag} style={styles.tag}>{tag}</Text>
                    ))}
                  </View>
                </View>
                <Text style={styles.distance}>{venue.distance}</Text>
                {venue.userNote && <Text style={styles.userNote}>{venue.userNote}</Text>}
                <Text style={styles.rating}>
                  <Text style={{ fontWeight: "bold", color: "#E65C4F" }}>{venue.rating}</Text>
                  <Text style={styles.reviews}> ({venue.reviews})</Text>
                </Text>
              </View>
              {/* Icons in a horizontal row */}
              <View style={styles.iconContainer}>
                <TouchableOpacity><Text style={styles.icon}>★</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.icon}>＋</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.icon}>🔖</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Show More Button */}
        <TouchableOpacity style={styles.showMoreButton}>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Discover;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  header1: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 30,
  },
  subHeaderContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    
  },
  dropdownButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownMenu: {
    position: "absolute",
    left: 200,
    top: 60, // Adjusted to position closer to the "Fresh Finds" row
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
  scrollContainer: {
    flex: 1,
  },
  searchBar: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 16,
  },
  categoryScroll: {
    marginTop: 2,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "rgba(255, 119, 34, 0.28)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 20,
  },
  venueList: {
    marginBottom: 20,
  },
  venueCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  venueRank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginRight: 12,
  },
  venueImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  venueInfo: {
    flex: 1,
    marginLeft: 12,
  },
  venueHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  venueName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#FF7622",
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    borderRadius: 12,
    fontSize: 12,
    color: "#FFF",
    fontWeight: "500",
  },
  distance: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  userNote: {
    fontSize: 14,
    color: "#4285F4",
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E65C4F",
  },
  reviews: {
    fontSize: 14,
    color: "#666",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    fontSize: 24,
    color: "#FFA726",
  },
  showMoreButton: {
    backgroundColor: "#FFF",
    padding: 16,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  showMoreText: {
    color: "#E65C4F",
    fontWeight: "bold",
    fontSize: 16,
  },
});