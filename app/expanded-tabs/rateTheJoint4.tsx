import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const RateTheJoint4 = () => {
  const router = useRouter();
  const [rating, setRating] = useState(5.0); // Default rating
  const [reviewText, setReviewText] = useState('');

  const venue = {
    name: 'Hide & Seek',
    type: 'Bar',
    distance: '1.4km',
    description: 'A vibrant bar with a great selection of drinks and a lively atmosphere. Perfect for a night out with friends!',
    image: require('@/assets/images/hidenseek.png'), // Replace with your image path
  };

  const scaleValues = Array.from({ length: 90 }, (_, i) => (i + 10) / 10); // 1.0 to 9.9

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Page Title */}
        <Text style={styles.pageTitle}>Rate The Joint</Text>

        {/* Progress Indicator */}
        <View style={styles.progressBox}>
          <Text style={styles.progressText}>4 of 4</Text>
        </View>
      </View>

      {/* Scrollable Content */}
    <ScrollView contentContainerStyle={styles.scrollContent}>

    
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
            {venue.description}
          </Text>
        </View>
      </View>

      {/* Subheader and Save to Drafts */}
      <View style={styles.subHeaderRow}>
        <Text style={styles.subHeader}>Almost Done...</Text>
        <TouchableOpacity style={styles.saveToDrafts}>
          <Ionicons name="create-outline" size={20} color="#FF5733" />
          <Text style={styles.saveToDraftsText}>Save to Drafts</Text>
        </TouchableOpacity>
      </View>

      {/* Textbox for Review */}
      <View style={styles.textBox}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Write your review here..."
          value={reviewText}
          onChangeText={setReviewText}
        />
        <View style={styles.textBoxIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="image" size={24} color="#FF5733" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="mic" size={24} color="#FF5733" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Three Image Icons */}
      <View style={styles.imageIconsContainer}>
        <Ionicons name="image" size={50} color="#FF5733" style={styles.imageIcon} />
        <Ionicons name="image" size={50} color="#FF5733" style={styles.imageIcon} />
        <Ionicons name="image" size={50} color="#FF5733" style={styles.imageIcon} />
      </View>

      {/* Who Did You Go With? */}
      <Text style={styles.whoDidYouGoWith}>Who did you go with?</Text>

      {/* Tag Friends Button */}
      <TouchableOpacity style={styles.tagFriendsButton}>
        <Text style={styles.tagFriendsButtonText}>Tag Friends?</Text>
      </TouchableOpacity>

  </ScrollView>

      {/* Submit Review Button */}
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/expanded-tabs/rateTheJoint4')}>
        <Text style={styles.nextButtonText}>Post Your Review →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
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
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9C9BA6',
  },
  saveToDrafts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveToDraftsText: {
    fontSize: 16,
    color: '#FF5733',
    marginLeft: 5,
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  textBoxIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  imageIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageIcon: {
    flex: 1,
    textAlign: 'center',
  },
  whoDidYouGoWith: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagFriendsButton: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  tagFriendsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    alignItems: 'center',
  },
  nextButton: {
    bottom: 10,
    borderRadius: 10,
    backgroundColor: '#b3b9ba',
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RateTheJoint4;