import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Review {
  id: string;
  venue: string;
  type: string;
  distance: string;
  rating: number;
  review: string;
  visited: string;
  image: any;
  reviewCount: number;
}

export default function HomeScreen() {
  const reviews: Review[] = [
    {
      id: '1',
      venue: 'Hide & Seek',
      type: 'Bar',
      distance: '1.4km',
      rating: 8.7,
      review: 'Avoid this place if you hate having fun...',
      visited: 'Visited Recently',
      image: require('@/assets/images/rave.jpg'),
      reviewCount: 12,
    },
    {
      id: '2',
      venue: 'Manouka',
      type: 'Rave',
      distance: '1.6km',
      rating: 4.9,
      review: 'Wild crowd & free dance hall...',
      visited: 'Visited Over a Week Ago',
      image: require('@/assets/images/rave.jpg'),
      reviewCount: 6,
    },
    {
      id: '3',
      venue: 'Wonderbar',
      type: 'Nightclub',
      distance: '1.4km',
      rating: 9.2,
      review: 'Great vibe, live DJ was insane...',
      visited: 'Visited Last Month',
      image: require('@/assets/images/rave.jpg'),
      reviewCount: 20,
    },
  ];

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.venueName}>{item.venue}</Text>
        <Text style={styles.venueType}>{item.type} • {item.distance}</Text>
        <Text style={styles.review}>{item.review}</Text>
        <Text style={styles.visited}>{item.visited}</Text>
        <View style={styles.actions}>
          <TouchableOpacity><Ionicons name="heart-outline" size={20} color="black" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="chatbubble-outline" size={20} color="black" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="bookmark-outline" size={20} color="black" /></TouchableOpacity>
        </View>
      </View>
      <Text style={styles.rating}>{item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Nightlife Venue Finder</Text>
      
      {/* Navigation Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.activeTab}>All</Text>
        <Text style={styles.tab}>Top Reviews</Text>
        <Text style={styles.tab}>Near You</Text>
        <Text style={styles.tab}>Friends Going</Text>
      </View>
      
      {/* Friends Reviews */}
      <Text style={styles.subHeader}>Your Friends Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        contentContainerStyle={styles.listContainer}
      />
      
      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, marginTop: 60, },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  tab: { fontSize: 16, color: 'gray' },
  activeTab: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 30 },
  listContainer: { paddingBottom: 80 },
  card: { flexDirection: 'row', padding: 12, marginBottom: 10, borderRadius: 8, backgroundColor: '#f9f9f9', alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  cardContent: { flex: 1 },
  venueName: { fontSize: 16, fontWeight: 'bold' },
  venueType: { fontSize: 14, color: 'gray' },
  review: { fontSize: 14, marginVertical: 5 },
  visited: { fontSize: 12, color: 'gray' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 5 },
  rating: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#FF5733', padding: 15, borderRadius: 30 },
});
