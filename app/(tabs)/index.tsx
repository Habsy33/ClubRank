import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

// All available categories
const allCategories = [
  'Nightclub', 'Dive Bar', 'Rooftop Bar', 'Speakeasy', 'Sports Bar', 'Cocktail Lounge', 'Pool Bar',
  'Karaoke Bar', 'Irish Pub', 'Wine Bar', 'Tiki Bar', 'Gastropub', 'Strip Club', 'Hookah Lounge', 'Dance Club', 'Rave Venue',
  'Jazz', 'Blues', 'EDM', 'Country', 'Hip-Hop', 'Techno', 'Live Band', 'Acoustic', 'Reggae', 'Classic Rock', 'House', 'Latin', 'Punk Rock', 'Pop Hits', 'Indie',
  'Crowded', 'Intimate', 'Classy', 'Grimy', 'Creepy', 'Tourist Trap', 'Chill', 'Trendy', 'Locals-Only', 'Dance Floor', 'Loud', 'Romantic', 'Retro', 'Biker-Friendly', 'College Hangout'
];

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
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [originalReviews, setOriginalReviews] = useState<Review[]>([
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
  ]);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setLoading(false);
      else router.replace('/(auth)/signIn');
    });
    return () => unsubscribe();
  }, []);

  // Update displayed reviews whenever activeTab or activeFilter changes
  useEffect(() => {
    let filteredReviews = [...originalReviews];

    // Apply tab-based sorting
    if (activeTab === 'Top Reviews') {
      filteredReviews.sort((a, b) => b.rating - a.rating);
    } else if (activeTab === 'Near You') {
      filteredReviews.sort((a, b) => {
        const distanceA = parseFloat(a.distance.replace('km', ''));
        const distanceB = parseFloat(b.distance.replace('km', ''));
        return distanceA - distanceB;
      });
    }

    // Apply category filtering
    if (activeFilter !== 'All') {
      const filterMap: { [key: string]: string[] } = {
        'Nightclubs': ['Club', 'Dance Club', 'Rave Venue'],
        'Bars': ['Bar', 'Dive Bar', 'Rooftop Bar', 'Speakeasy', 'Sports Bar', 'Cocktail Lounge', 'Pool Bar', 'Karaoke Bar', 'Irish Pub', 'Wine Bar', 'Tiki Bar', 'Gastropub'],
        'Raves': ['Rave', 'EDM', 'Techno', 'House']
      };
      filteredReviews = filteredReviews.filter(review => 
        filterMap[activeFilter]?.includes(review.type)
      );
    }

    setDisplayedReviews(filteredReviews);
  }, [activeTab, activeFilter, originalReviews]);

  const truncateReview = (text: string, length: number) =>
    text.length > length ? text.substring(0, length) + '...' : text;

  const getRatingStyle = (rating: number) => {
    if (rating >= 8) return styles.ratingGreen;
    if (rating >= 5) return styles.ratingYellow;
    return styles.ratingRed;
  };

  const renderReview = ({ item }: { item: Review }) => (
    <TouchableOpacity onPress={() => router.push('/expanded-tabs/venueDetails')}>
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
            <View style={styles.ratingContainer}>
              <Text style={[styles.rating, getRatingStyle(item.rating)]}>{item.rating}</Text>
              <Text style={styles.reviews}>({item.reviewCount} Reviews)</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity><Ionicons name="star-outline" size={20} color="black" /></TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/expanded-tabs/rateTheJoint1')}><Ionicons name="add-circle-outline" size={20} color="black"/></TouchableOpacity>
              <TouchableOpacity><Ionicons name="bookmark-outline" size={20} color="black" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Friends Going') {
      router.replace('/expanded-tabs/friendsGoing');
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
      <Text style={styles.itemCount}>Total {displayedReviews.length} items</Text>

      <View style={styles.filters}>
        {['All', 'Nightclubs', 'Bars', 'Raves'].map(filter => (
          <TouchableOpacity 
            key={filter} 
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterButtonText,
              activeFilter === filter && styles.activeFilterButtonText
            ]}>{filter}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedReviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for All Categories */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20, backgroundColor:'white' }}>
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
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 50 },
  header1: { fontSize: 15, textAlign: 'center', marginBottom: 30, marginTop: 5 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  tab: { fontSize: 16, color: 'gray' },
  activeTab: { fontSize: 16, fontWeight: 'bold', color: '#FB6D3A', borderBottomWidth: 5, borderBottomColor: '#FB6D3A' },
  subHeader: { fontSize: 22, marginBottom: 5, color: '#9C9BA6' },
  itemCount: { fontSize: 15, color: 'gray', marginBottom: 20 },
  filters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, },
  filterButton: { 
    paddingHorizontal: 15, 
    padding: 10, 
    backgroundColor: 'rgba(255, 119, 34, 0.28)', 
    borderRadius: 15, 
    marginRight: 5,
  },
  activeFilterButton: {
    backgroundColor: '#FF5733',
  },
  filterButtonText: {
    color: '#666',
  },
  activeFilterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  seeAll: { color: '#FF5733', fontWeight: 'bold', marginTop: 10, },
  listContainer: { paddingBottom: 80 },
  card: { flexDirection: 'row', padding: 10, marginBottom: 10, borderRadius: 8, backgroundColor: '#f9f9f9', alignItems: 'center',  shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  largeImage: { width: 80, height: 120, borderRadius: 10, marginRight: 10, },
  cardContent: { flex: 1 },
  venueName: { fontSize: 15, fontWeight: 'bold' },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 5 },
  visited: { fontSize: 12, color: 'gray' },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingGreen: {
    backgroundColor: '#4CAF50',
  },
  ratingYellow: {
    backgroundColor: '#FFC107',
  },
  ratingRed: {
    backgroundColor: '#F44336',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  actions: { flexDirection: 'row', gap: 10, marginTop: 5, justifyContent: 'flex-end' },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#FF5733', padding: 15, borderRadius: 30 },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  venueType: { backgroundColor: 'rgba(255, 119, 34, 0.28)', opacity: 40, padding: 4, paddingHorizontal: 12, borderRadius: 12, fontSize: 14, fontWeight: 'bold', marginLeft: 10, },
  venueDistance: { marginLeft: -10, fontSize: 12, marginRight: -20 },
  rowBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  review: { fontSize: 14, marginTop: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});