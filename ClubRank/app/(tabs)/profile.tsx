import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";

// Dummy venue data
const venues = [
  { id: 1, name: "Balls", tags: ["Bar", "Jazz"], distance: "1.1km", rating: 9.4, reviews: "10+ Reviews", image: "https://via.placeholder.com/60", userNote: "@habeeb has been here" },
  { id: 2, name: "Shaft", tags: ["Rave", "Techno"], distance: "1.4km", rating: 9.2, reviews: "3 Reviews", image: "https://via.placeholder.com/60" },
  { id: 3, name: "Butt", tags: ["NightClub", "EDM"], distance: "1.4km", rating: 8.8, reviews: "300 Reviews", image: "https://via.placeholder.com/60" },
  { id: 4, name: "Pimples", tags: ["Show", "Comedy"], distance: "1.4km", rating: 8.1, reviews: "10+ Reviews", image: "https://via.placeholder.com/60" },
];

// Venue Image Component
const VenueImage = ({ uri }: { uri: string }) => (
  <Image source={{ uri }} style={styles.venueImage} />
);

const Explore: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { flex: 1, textAlign: "center" }]}>Fresh Finds</Text>
        <TouchableOpacity>
          <Text style={styles.menuButton}>⋮</Text>
        </TouchableOpacity>
      </View>



      {/* Search Inputs */}
      <TextInput placeholder="Search Venues..." style={styles.searchBar} placeholderTextColor="#999" />
      <TextInput placeholder="Enter Location..." style={styles.searchBar} placeholderTextColor="#999" />

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {["All Venues", "Bars", "Clubs", "Raves", "Jazz"].map((category) => (
          <TouchableOpacity key={category} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top Venues */}
      <Text style={styles.sectionTitle}>Top Venues</Text>
      <ScrollView>
        {venues.map((venue, index) => (
          <View key={venue.id} style={styles.venueCard}>
            <Text style={styles.venueRank}>{index + 1}</Text>
            <VenueImage uri={venue.image} />
            <View style={styles.venueInfo}>
              <Text style={styles.venueName}>{venue.name}</Text>
              <View style={styles.tagContainer}>
                {venue.tags.map((tag) => (
                  <Text key={tag} style={styles.tag}>{tag}</Text>
                ))}
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
      </ScrollView>

      {/* Show More Button */}
      <TouchableOpacity style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>Show More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Explore;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAFAFA",
    paddingTop: 50
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  menuButton: {
    fontSize: 24,
    color: "#999",
  },
  searchBar: {
    width: "80%",
    alignSelf: "center",
    padding: 12,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "",
    borderRadius: 8,
    backgroundColor: "white",
  },
  categoryScroll: {
    marginTop: 10,
    marginBottom: 50,
  },
  categoryButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 12,
    color: "",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginTop: -30, // Moves "Top Venues" up without affecting category buttons
    textAlign: "center",
  },
  venueCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginVertical: 5,
  },
  venueRank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginRight: 10,
  },
  venueImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  venueInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  venueName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  tagContainer: {
    flexDirection: "row",
    marginVertical: 2,
  },
  tag: {
    backgroundColor: "#FF7622",
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 5,
    borderRadius: 5,
    fontSize: 10,
    color: "#555",
  },
  distance: {
    fontSize: 12,
    color: "#777",
  },
  userNote: {
    fontSize: 12,
    color: "#4285F4",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
  },
  reviews: {
    fontSize: 12,
    color: "#666",
  },
  iconContainer: {
    flexDirection: "row", 
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 10, 
  },
  icon: {
    fontSize: 20,
    color: "#FFA726",
  },
  showMoreButton: {
    backgroundColor: "#FFF",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  showMoreText: {
    color: "#E65C4F",
    fontWeight: "bold",
  },
});
