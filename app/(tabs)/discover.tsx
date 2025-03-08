import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

// Dummy venue data
const venues = [
  { id: 1, name: "Balls", tags: ["Bar", "Jazz"], distance: "1.1km", rating: 9.4, reviews: "10+ Reviews", image: require("../../assets/images/hidenseek.png"), userNote: "@habeeb has been here" },
  { id: 2, name: "Shaft", tags: ["Rave", "Techno"], distance: "1.4km", rating: 9.2, reviews: "3 Reviews", image: require("../../assets/images/hidenseek.png") },
  { id: 3, name: "Butt", tags: ["NightClub", "EDM"], distance: "1.4km", rating: 8.8, reviews: "300 Reviews", image: require("../../assets/images/hidenseek.png") },
];

const getRatingStyle = (rating: number) => {
  if (rating >= 8) return { backgroundColor: "#4CAF50" }; // Green
  if (rating >= 5) return { backgroundColor: "#FFC107" }; // Yellow
  return { backgroundColor: "#F44336" }; // Red
};

export default function Discover() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>ClubRank</Text>
      <Text style={styles.header1}>Nightlife Venue Finder</Text>

      {/* Subheading */}
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>Fresh Finds</Text>
      </View>

      {/* Search Inputs */}
      <TextInput placeholder="Search Venues..." style={styles.searchBar} placeholderTextColor="#999" />

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {["All Venues", "Distance","Bars", "Clubs", "Raves", "Jazz", "Capacity"].map((category, index) => (
          <TouchableOpacity key={category} style={[styles.categoryButton, index === 0 && styles.activeCategory]}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top Venues */}
      <Text style={styles.sectionTitle}>Top Venues</Text>
      <ScrollView style={styles.venueList}>
        {venues.map((venue, index) => (
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
              <Text style={styles.distance}>{venue.distance}</Text>
              {venue.userNote && <Text style={styles.userNote}>{venue.userNote}</Text>}
              
              {/* Rating & Icons */}
              <View style={styles.ratingContainer}>
                <View style={styles.ratingGroup}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.rating}>{venue.rating}</Text>
                  <Text style={styles.reviews}>{venue.reviews}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity>
                    <Text style={styles.outlineIcon}>☆</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.outlineIcon}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.outlineIcon}>⚑</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 35,
  },
  header1: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 3,
    marginBottom: 10,
  },
  subHeaderContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  subHeader: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  searchBar: {
    width: "100%",
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "white",
    fontSize: 16,
  },
  categoryScroll: {
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 119, 34, 0.28)',
    marginRight: 8,
    minWidth: 70,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },
  activeCategory: {
    backgroundColor: Colors.primary.orange,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 8,
    paddingHorizontal: 15,
  },
  venueList: {
    paddingHorizontal: 15,
  },
  venueCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  venueImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    backgroundColor: Colors.background.redLight,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 11,
    fontWeight: '500',
  },
  distance: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  userNote: {
    fontSize: 13,
    color: '#4285F4',
    marginBottom: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.warning,
  },
  reviews: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  starIcon: {
    fontSize: 18,
    color: Colors.text.warning,
  },
  outlineIcon: {
    fontSize: 20,
    color: '#666',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  showMoreButton: {
    backgroundColor: "#FFF",
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginHorizontal: 15,
    marginVertical: 15,
  },
  showMoreText: {
    color: Colors.primary.orange,
    fontWeight: "bold",
    fontSize: 14,
  },
});