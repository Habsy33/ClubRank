import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";

const venues = [
  { id: 1, name: "Balls", tags: ["Bar", "Jazz"], distance: "1.1km", rating: 9.4, reviews: "10+ Reviews", image: "https://via.placeholder.com/50", userNote: "@habeeb has been here" },
  { id: 2, name: "Shaft", tags: ["Rave", "Techno"], distance: "1.4km", rating: 9.2, reviews: "3 Reviews", image: "https://via.placeholder.com/50" },
  { id: 3, name: "Butt", tags: ["NightClub", "EDM"], distance: "1.4km", rating: 8.8, reviews: "300 Reviews", image: "https://via.placeholder.com/50" },
  { id: 4, name: "Pimples", tags: ["Show", "Comedy"], distance: "1.4km", rating: 8.1, reviews: "10+ Reviews", image: "https://via.placeholder.com/50" },
];

const Explore: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Fresh Finds</Text>
        <TouchableOpacity>
          <Text style={styles.menuButton}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Search Inputs */}
      <TextInput placeholder="Search Venues..." style={styles.searchBar} />
      <TextInput placeholder="Enter Location..." style={styles.searchBar} />

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {["All Venues", "Bars", "Clubs", "Raves", "Jazz"].map((category) => (
          <TouchableOpacity key={category} style={styles.categoryButton}>
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top Venues */}
      <Text style={styles.sectionTitle}>Top Venues</Text>
      <ScrollView>
        {venues.map((venue, index) => (
          <View key={venue.id} style={styles.venueCard}>
            <Text style={styles.venueRank}>{index + 1}</Text>
            <Image source={{ uri: venue.image }} style={styles.venueImage} />
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
                <Text style={{ fontWeight: "bold" }}>{venue.rating}</Text> <Text style={styles.reviews}>({venue.reviews})</Text>
              </Text>
            </View>
            {/* Icons */}
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
        <Text>Show More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  headerText: { fontSize: 20, fontWeight: "bold" },
  menuButton: { fontSize: 24, color: "gray" },
  searchBar: { width: "100%", padding: 10, marginVertical: 5, borderWidth: 1, borderColor: "#ccc", borderRadius: 5 },
  categoryScroll: { marginVertical: 10 },
  categoryButton: { backgroundColor: "#f0f0f0", padding: 10, marginRight: 10, borderRadius: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  venueCard: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  venueRank: { fontSize: 20, fontWeight: "bold", marginRight: 10 },
  venueImage: { width: 50, height: 50, borderRadius: 5 },
  venueInfo: { flex: 1 },
  venueName: { fontSize: 16, fontWeight: "bold" },
  tagContainer: { flexDirection: "row", marginVertical: 2 },
  tag: { backgroundColor: "#e0e0e0", padding: 3, marginRight: 5, borderRadius: 3, fontSize: 12 },
  distance: { fontSize: 12, color: "gray" },
  userNote: { fontSize: 12, color: "blue" },
  rating: { fontSize: 14, fontWeight: "bold", marginTop: 2 },
  reviews: { fontSize: 12, color: "gray" },
  iconContainer: { flexDirection: "column", alignItems: "center" },
  icon: { fontSize: 20, marginVertical: 2 },
  showMoreButton: { backgroundColor: "#f0f0f0", padding: 10, alignItems: "center", borderRadius: 5, marginTop: 10 },
});