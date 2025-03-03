import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const reviews: Review[] = [
    {
      id: '1',
      venue: 'Hide & Seek',
      type: 'Bar',
      distance: '1.4km',
      rating: 8.7,
      review: 'Avoid this place if you hate having fun',
      visited: 'Visited Recently',
      image: require('@/assets/images/hidenseek.png'),
      reviewCount: 12,
    },
    {
      id: '2',
      venue: 'Manouka',
      type: 'Rave',
      distance: '1.6km',
      rating: 4.9,
      review: 'Mid, queued up for more than half an hour for mid music.. never again tbh...',
      visited: 'Visited Over a Week Ago',
      image: require('@/assets/images/rave.jpg'),
      reviewCount: 6,
    },
    {
      id: '3',
      venue: 'Wonderbar',
      type: 'Club',
      distance: '1.4km',
      rating: 9.2,
      review: 'Great vibe, live DJ was insane...',
      visited: 'Visited Last Month',
      image: require('@/assets/images/rave.jpg'),
      reviewCount: 20,
    },
    {
      id: '4',
      venue: 'Hide & Seek',
      type: 'Bar',
      distance: '1.4km',
      rating: 8.7,
      review: 'Avoid this place if you hate having fun',
      visited: 'Visited Recently',
      image: require('@/assets/images/hidenseek.png'),
      reviewCount: 12,
    },
    {
      id: '5',
      venue: 'Manouka',
      type: 'Rave',
      distance: '1.6km',
      rating: 4.9,
      review: 'Mid, queued up for more than half an hour for mid music.. never again tbh...',
      visited: 'Visited Over a Week Ago',
      image: require('@/assets/images/rave.jpg'),
      reviewCount: 6,
    },
    {
      id: '6',
      venue: 'Wonderbar',
      type: 'Club',
      distance: '1.4km',
      rating: 9.2,
      review: 'Great vibe, live DJ was insane...',
      visited: 'Visited Last Month',
      image: require('@/assets/images/rave.jpg'),
      reviewCount: 20,
    },
  ];

  const truncateReview = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const renderReview = ({ item }: { item: Review }) => (
  <TouchableOpacity onPress={() =>  router.push('/expanded-tabs/venueDetails')}>
    <View style={styles.card}>
      <Image source={item.image} style={styles.largeImage} />
      <View style={styles.cardContent}>
        <View style={styles.rowHeader}>
          <Text style={styles.venueName}>{item.venue}</Text>
          <Text style={styles.venueDistance}>{item.distance}</Text>
          <Text style={styles.venueType}>{item.type}</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfo}>
          <Ionicons name="person-circle" size={35} color="gray" />
          <Text style={styles.visited}>{item.visited}</Text>
        </View>
        <Text style={styles.review}>{truncateReview(item.review, 50)}</Text>
        <View style={styles.rowBottom}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={20} color="gold" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount} Reviews)</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity><Ionicons name="star-outline" size={20} color="black" /></TouchableOpacity>
            <TouchableOpacity onPress={() =>  router.push('/expanded-tabs/rateTheJoint1')}><Ionicons name="add-circle-outline" size={20} color="black"/></TouchableOpacity>
            <TouchableOpacity><Ionicons name="bookmark-outline" size={20} color="black" /></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  );

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    switch (tab) { //Note to self: remove the animation when the tab gets redirected
      case 'All':
        router.replace('/');
        break;
      case 'Top Reviews':
        router.replace('/');
        break;
      case 'Near You':
        router.replace('/');
        break;
      case 'Friends Going': 
        router.replace('/expanded-tabs/friendsGoing');
        break;
      default:
        router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ClubRank</Text>
      <Text style={styles.header1}>Nightlife Venue Finder</Text>
      
      <View style={styles.tabs}>
        {['All', 'Top Reviews', 'Near You', 'Friends Going'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => handleTabPress(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.subHeader}>Your Friends Reviews</Text>
      <Text style={styles.itemCount}>Total {reviews.length} items</Text>
      
      <View style={styles.filters}>
        {['All', 'Nightclubs', 'Bars', 'Raves'].map(filter => (
          <TouchableOpacity key={filter} style={styles.filterButton}>
            <Text>{filter}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
      </View>
      
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 50 },
  header1: { fontSize: 15, textAlign: 'center', marginBottom: 30, marginTop: 5 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  tab: { fontSize: 16, color: 'gray' },
  activeTab: { fontSize: 16, fontWeight: 'bold', color: '#FB6D3A', borderBottomWidth: 5, borderBottomColor: '#FB6D3A' },
  subHeader: { fontSize: 22, marginBottom: 5, color: '#9C9BA6' },
  itemCount: { fontSize: 15, color: 'gray', marginBottom: 20 },
  filters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, },
  filterButton: { paddingHorizontal: 15, padding: 10, backgroundColor: 'rgba(255, 119, 34, 0.28)', borderRadius: 15, marginRight: 5,  },
  seeAll: { color: '#FF5733', fontWeight: 'bold' },
  listContainer: { paddingBottom: 80 },
  card: { flexDirection: 'row', padding: 10, marginBottom: 10, borderRadius: 8, backgroundColor: '#f9f9f9', alignItems: 'center',  shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  largeImage: { width: 80, height: 120, borderRadius: 10, marginRight: 10, },
  cardContent: { flex: 1 },
  venueName: { fontSize: 15, fontWeight: 'bold' },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 5 },
  visited: { fontSize: 12, color: 'gray' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rating: { fontSize: 16, fontWeight: 'bold' },
  reviewCount: { fontSize: 14, color: 'gray' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 5, justifyContent: 'flex-end' },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#FF5733', padding: 15, borderRadius: 30 },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  venueType: { backgroundColor: 'rgba(255, 119, 34, 0.28)', opacity: 40, padding: 4, paddingHorizontal: 12, borderRadius: 12, fontSize: 14, fontWeight: 'bold', marginLeft: 10, },
  venueDistance: { marginLeft: -10, fontSize: 12, marginRight: -20 },
  rowBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  review: { fontSize: 14, marginTop: 5 },
});