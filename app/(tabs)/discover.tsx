import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Modal } from "react-native";
import { Colors } from "../../styles/colors";
import { Ionicons } from '@expo/vector-icons';

const allCategories = [
  'Nightclub', 'Dive Bar', 'Rooftop Bar', 'Speakeasy', 'Sports Bar', 'Cocktail Lounge', 'Pool Bar',
  'Karaoke Bar', 'Irish Pub', 'Wine Bar', 'Tiki Bar', 'Gastropub', 'Strip Club', 'Hookah Lounge', 'Dance Club', 'Rave Venue',
  'Jazz', 'Blues', 'EDM', 'Country', 'Hip-Hop', 'Techno', 'Live Band', 'Acoustic', 'Reggae', 'Classic Rock', 'House', 'Latin', 'Punk Rock', 'Pop Hits', 'Indie',
  'Crowded', 'Intimate', 'Classy', 'Grimy', 'Creepy', 'Tourist Trap', 'Chill', 'Trendy', 'Locals-Only', 'Dance Floor', 'Loud', 'Romantic', 'Retro', 'Biker-Friendly', 'College Hangout'
];

const venues = [
  { id: 1, name: "Balls", tags: ["Bar", "Jazz"], distance: "1.1km", rating: 9.4, reviews: "10+ Reviews", image: require("../../assets/images/hidenseek.png"), userNote: "@habeeb has been here" },
  { id: 2, name: "Shaft", tags: ["Rave", "Techno"], distance: "1.4km", rating: 9.2, reviews: "3 Reviews", image: require("../../assets/images/hidenseek.png") },
  { id: 3, name: "Butt", tags: ["NightClub", "EDM"], distance: "1.4km", rating: 8.8, reviews: "300 Reviews", image: require("../../assets/images/hidenseek.png") },
];

const getRatingStyle = (rating: number) => {
  if (rating >= 8) return styles.ratingGreen;
  if (rating >= 5) return styles.ratingYellow;
  return styles.ratingRed;
};

export default function Discover() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>ClubRank</Text>
      <Text style={styles.header1}>Nightlife Venue Finder</Text>

      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>Fresh Finds</Text>
      </View>

      <TextInput placeholder="Search Venues..." style={styles.searchBar} placeholderTextColor="#999" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {["All Venues", "Distance", "Bars", "Clubs", "Raves", "Jazz", "Capacity"].map((category, index) => (
          <TouchableOpacity key={category} style={[styles.categoryButton, index === 0 && styles.activeCategory]}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.categoryButton}>
          <Text style={styles.categoryText}>See All</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.sectionTitle}>Top Venues</Text>
      <ScrollView style={styles.venueList}>
        {venues.map((venue) => (
          <View key={venue.id} style={styles.venueCard}>
            <Image source={venue.image} style={styles.venueImage} />
            <View style={styles.venueInfo}>
              <View style={styles.venueHeader}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <Text style={styles.distance}>{venue.distance}</Text>
              </View>
              <View style={styles.tagContainer}>
                {venue.tags.map((tag) => (
                  <Text key={tag} style={styles.tag}>{tag}</Text>
                ))}
              </View>
              {venue.userNote && <Text style={styles.userNote}>{venue.userNote}</Text>}
              <View style={styles.ratingContainer}>
                <Text style={[styles.rating, getRatingStyle(venue.rating)]}>{venue.rating}</Text>
                <Text style={styles.reviews}>{venue.reviews}</Text>
                <View style={styles.iconContainer}>
                  <Ionicons name="star-outline" size={20} color="gray" />
                  <Ionicons name="add" size={20} color="gray" />
                  <Ionicons name="bookmark-outline" size={20} color="gray" />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>Show More</Text>
      </TouchableOpacity>

      {/* Modal for All Categories */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Select a Category</Text>
          <ScrollView>
            {allCategories.map((cat) => (
              <TouchableOpacity key={cat} style={{ paddingVertical: 10 }} onPress={() => { setSelectedCategory(cat); setModalVisible(false); }}>
                <Text style={{ fontSize: 18 }}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
            <Text style={{ color: 'red', fontSize: 16 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
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
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviews: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
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
  ratingGreen: {
    backgroundColor: "#4CAF50",
  },
  ratingYellow: {
    backgroundColor: "#FFC107",
  },
  ratingRed: {
    backgroundColor: "#F44336",
  },
});