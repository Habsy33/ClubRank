import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const venues = [
  { id: '1', name: 'Wonderland', location: 'Lambin, UK' },
  { id: '2', name: 'Milk jugs', location: 'London, UK' },
  { id: '3', name: 'Poopy Diaper', location: 'London, UK' },
  { id: '4', name: 'Fort crop', location: 'London, UK' },
  { id: '5', name: 'Titty bar', location: 'Lambin, UK' },
  { id: '6', name: 'LittleMons Crib', location: 'London, UK' },
  { id: '7', name: 'Ed Sheerans', location: 'London, UK' },
  { id: '8', name: 'Superbowl XV', location: 'Patent FL' },
];

const RatePage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>ClubRank</Text>
        <Text style={styles.header1}>Nightlife Venue Finder</Text>
      </View>

      {/* Fixed Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Venues..."
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Places you may have been....</Text>
        <FlatList
          data={filteredVenues}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.venueItem} onPress={() => console.log(`Selected: ${item.name}`)}>
              <Text style={styles.venueName}>{item.name}</Text>
              <Text style={styles.venueLocation}>{item.location}</Text>
            </TouchableOpacity>
          )}
          scrollEnabled={false} // Disable scrolling for FlatList inside ScrollView
        />
        <TouchableOpacity style={styles.customButton}>
          <Text style={styles.customButtonText}>Can't find your event? BUILD CUSTOM</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header1: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: -3,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  venueItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  venueName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  venueLocation: {
    fontSize: 14,
    color: '#666',
  },
  customButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16, // Add margin to ensure the button is not cut off
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RatePage;