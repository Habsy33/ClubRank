import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const VenueDetails = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Website'); // State to track active tab

  // Function to handle tab press
  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Hide N Seek</Text>
        <Image
          source={require('@/assets/images/hidenseek.png')} // Replace with your image path
          style={styles.imagePanel}
        />
        <Text style={styles.subtitle}>Bar</Text>
        <Text style={styles.distance}>1.1km away from you</Text>
      </View>

      {/* Tab Navigation Bar */}
      <View style={styles.tabs}>
        {['Website', 'Top Reviews', 'Friends Going'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable Main Content Section */}
      <ScrollView style={styles.scrollContent}>
        {/* Description Section */}
        <Text style={styles.description}>
          A bar, treehouse and late night den of entertainment. By users in app attracted in the heart of Glasgow city centre, concealed in plain sight.
        </Text>

        {activeTab === 'Website' && (
          <>
            <Text style={styles.sectionTitle}>Hide N Seek Bar</Text>
            <View style={styles.review}>
              <Text style={styles.reviewWebsite}> Website: https://www.thehideandseek.co</Text>
              <Text style={styles.reviewContent}>
                Address: 84 Buchanan St, Glasgow G1 3HA
                 {'\n'}Phone No: 0141 8008 561 
              </Text>
            </View>
          </>
        )}




        {/* Top Reviews Section (Visible only if the active tab is "Top Reviews") */}
        {activeTab === 'Top Reviews' && (
          <>
            <Text style={styles.sectionTitle}>Top Reviews</Text>
            <View style={styles.review}>
              <Text style={styles.reviewText}>Awesome and Nice</Text>
              <Text style={styles.reviewDate}>2012/2020</Text>
              <Text style={styles.reviewContent}>
                This Food so tasty & delicious. Breakfast
              </Text>
            </View>
          </>
        )}

        {/* Friends Section (Visible only if the active tab is "Friends Going") */}
        {activeTab === 'Friends Going' && (
          <>
            <Text style={styles.sectionTitle}>What your friends think:</Text>
            <View style={styles.friends}>
              <Text style={styles.friendsText}>RohukL_rates</Text>
              <Text style={styles.friendsText}>Illyzoxo</Text>
              <Text style={styles.friendsText}>Visited Recently</Text>
              <Text style={styles.friendsText}>Visited A While Ago</Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="heart" size={30} color="#FF5733" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() =>  router.push('/expanded-tabs/rateTheJoint1')}>
        <Ionicons name="add-circle-outline" size={60} color="#FF5733" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="share-social" size={30} color="#FF5733" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePanel: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
  distance: {
    fontSize: 16,
    color: 'gray',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FF5733',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollContent: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 0,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
  },
  review: {
    marginBottom: 20,
  },
  reviewText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  reviewWebsite: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  reviewContent: {
    fontSize: 16,
    color: '#666',
  },
  friends: {
    marginBottom: 20,
  },
  friendsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    padding: 10,
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
});

export default VenueDetails;