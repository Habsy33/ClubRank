import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RateTheJoint1 = () => {
  const [selectedCategory, setSelectedCategory] = useState('Nightclub');

  const venue = {
    name: 'Hide & Seek',
    type: 'Bar',
    distance: '1.4km',
    description: 'A vibrant bar with a great selection of drinks and a lively atmosphere. Perfect for a night out with friends!',
    image: require('@/assets/images/hidenseek.png'), // Replace with your image path
  };

  const categories = ['Nightclub', 'Bar', 'Rave', 'Party'];

  // Function to truncate the description
  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Page Title */}
        <Text style={styles.pageTitle}>Rate The Joint</Text>

        {/* Progress Indicator */}
        <View style={styles.progressBox}>
          <Text style={styles.progressText}>1 of 4</Text>
        </View>
      </View>

      {/* Venue Name Header */}
      <Text style={styles.venueHeader}>{venue.name}</Text>

      {/* Venue Card */}
      <View style={styles.card}>
        <Image source={venue.image} style={styles.largeImage} />
        <View style={styles.cardContent}>
          <View style={styles.rowHeader}>
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text style={styles.venueDistance}>{venue.distance}</Text>
            <Text style={styles.venueType}>{venue.type}</Text>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Venue Description */}
          <Text style={styles.venueDescription}>
            {truncateDescription(venue.description, 100)}
          </Text>
        </View>
      </View>

      {/* Category Selection Subheader */}
      <Text style={styles.subHeader}>Category of Venue</Text>

      {/* Category Option Wheel */}
      <View style={styles.categoryWheel}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryOption,
              selectedCategory === category && styles.selectedCategoryOption,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryOptionText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBox: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  venueHeader: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  largeImage: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  venueName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  venueDistance: {
    fontSize: 12,
    color: 'gray',
  },
  venueType: {
    backgroundColor: 'rgba(255, 119, 34, 0.28)',
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  venueDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#9C9BA6',
    textAlign: 'center',
  },
  categoryWheel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryOption: {
    width: '48%',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedCategoryOption: {
    backgroundColor: '#FF5733',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedCategoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  nextButton: {
    bottom: -100,
    borderRadius: 10,
    left: 0,
    right: 0,
    backgroundColor: '#b3b9ba',
    padding: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RateTheJoint1;