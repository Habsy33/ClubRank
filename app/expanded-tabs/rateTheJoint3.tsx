import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const RateTheJoint3 = () => {
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

  const handleNext = () => {
    // You can add any validation or data processing here before navigating
    router.push('/expanded-tabs/rateTheJoint4');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>Rate The Joint</Text>

        <View style={styles.progressBox}>
          <Text style={styles.progressText}>3 of 4</Text>
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

          <Text style={styles.venueDescription}>{venue.description}</Text>
        </View>
      </View>

      {/* Subheader */}
      <Text style={styles.subHeader}>What Was It Like?</Text>

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

      {/* Scale Prompt */}
      <Text style={styles.scalePrompt}>Ok damn, on a scale of 1 - 10?</Text>

      {/* Scale Picker */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scalePicker}>
        {scaleValues.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.scaleButton,
              rating === value && styles.selectedScaleButton,
            ]}
            onPress={() => setRating(value)}
          >
            <Text style={[
              styles.scaleButtonText,
              rating === value && styles.selectedScaleButtonText,
            ]}>
              {value.toFixed(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next →</Text>
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
  nextButton: {
    bottom: 40,
    borderRadius: 10,
    backgroundColor: '#b3b9ba',
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
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
  scalePrompt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scalePicker: {
    marginBottom: 20,
  },
  scaleButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedScaleButton: {
    backgroundColor: '#FF5733',
  },
  scaleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  selectedScaleButtonText: {
    color: '#fff',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RateTheJoint3;