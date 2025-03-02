import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const RateTheJoint2 = () => {
  const [selectedDate, setSelectedDate] = useState('2023-10-01');
  const [arrivalTime, setArrivalTime] = useState('18:00');
  const [duration, setDuration] = useState('2 hours');
  const router = useRouter();

  const venue = {
    name: 'Hide & Seek',
    type: 'Bar',
    distance: '1.4km',
    description: 'A vibrant bar with a great selection of drinks and a lively atmosphere. Perfect for a night out with friends!',
    image: require('@/assets/images/hidenseek.png'), 
  };

  const dates = ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05'];

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
          <Text style={styles.progressText}>2 of 4</Text>
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
            {venue.description}
          </Text>
        </View>
      </View>

      {/* Subheader */}
      <Text style={styles.subHeader}>When Did You Go?</Text>

      {/* Horizontal Date Picker */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datePicker}>
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateButton,
              selectedDate === date && styles.selectedDateButton,
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[
              styles.dateButtonText,
              selectedDate === date && styles.selectedDateButtonText,
            ]}>
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* From and Duration Panels */}
      <View style={styles.panelsContainer}>
        {/* From Panel */}
        <View style={styles.panel}>
          <Text style={styles.panelLabel}>From</Text>
          <Text style={styles.panelValue}>{arrivalTime}</Text>
          <TouchableOpacity style={styles.panelButton}>
            <Text style={styles.panelButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Duration Panel */}
        <View style={styles.panel}>
          <Text style={styles.panelLabel}>Duration</Text>
          <Text style={styles.panelValue}>{duration}</Text>
          <TouchableOpacity style={styles.panelButton}>
            <Text style={styles.panelButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/expanded-tabs/rateTheJoint3')}>
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
  datePicker: {
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedDateButton: {
    backgroundColor: '#FF5733',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#000',
  },
  selectedDateButtonText: {
    color: '#fff',
  },
  panelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  panel: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  panelLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  panelValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  panelButton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 8,
  },
  panelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  nextButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RateTheJoint2;