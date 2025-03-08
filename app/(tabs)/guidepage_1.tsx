import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

export default function GuidePage1() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const reviews: Review[] = [
    {
      id: "1",
      venue: "Hide & Seek",
      type: "Bar",
      distance: "1.4km",
      rating: 8.7,
      review: "Avoid this place if you hate having fun",
      visited: "Visited Recently",
      image: require("@/assets/images/hidenseek.png"),
      reviewCount: 12,
    },
    {
      id: "2",
      venue: "Manouka",
      type: "Rave",
      distance: "1.6km",
      rating: 4.9,
      review: "Mid, queued up for more than half an hour for mid music.. never again tbh...",
      visited: "Visited Over a Week Ago",
      image: require("@/assets/images/rave.jpg"),
      reviewCount: 6,
    },
  ];

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.largeImage} />
      <View style={styles.cardContent}>
        <View style={styles.rowHeader}>
          <Text style={styles.venueName}>{item.venue}</Text>
          <Text style={styles.venueDistance}>{item.distance}</Text>
          <Text style={styles.venueType}>{item.type}</Text>
        </View>
        <View style={styles.userInfo}>
          <Ionicons name="person-circle" size={35} color="gray" />
          <Text style={styles.visited}>{item.visited}</Text>
        </View>
        <Text style={styles.review}>{item.review}</Text>
        <View style={styles.rowBottom}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={20} color="gold" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount} Reviews)</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconWrapper}>
              <Ionicons name="star-outline" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push("/expanded-tabs/rateTheJoint1")}>
              <Ionicons name="add-circle-outline" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <Ionicons name="bookmark-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nightlife Venue Finder</Text>
      <View style={styles.tabs}>
        {["All", "Top Reviews", "Near You", "Friends Going"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subHeader}>Your Friends Reviews</Text>
      <Text style={styles.itemCount}>Total {reviews.length} items</Text>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.guideOverlay}>
        <Text style={styles.guideTitle}>Venue Feed</Text>
        <Text style={styles.guideText}>See where your friends have been and share those crazy nights out.</Text>
      </View>

      <View style={styles.actionBubblesContainer}>
        <Text style={styles.actionBubble}>Add to your weekend plans</Text>
        <Text style={styles.actionBubble}>Rate venue!</Text>
        <Text style={styles.actionBubble}>Futures list</Text>
      </View>

      <View style={styles.navButtons}>
        <TouchableOpacity style={[styles.navButtons, styles.disabledButton]} disabled>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButtons} onPress={() => router.push("/guidepage_2")}>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  subHeader: { fontSize: 22, fontWeight: "bold", color: "#9C9BA6", marginBottom: 5 },
  itemCount: { fontSize: 15, color: "gray", marginBottom: 20 },
  tabs: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  tab: { fontSize: 16, color: "gray" },
  activeTab: { fontWeight: "bold", color: "#FB6D3A", borderBottomWidth: 3, borderBottomColor: "#FB6D3A" },
  listContainer: { paddingBottom: 80 },
  card: { flexDirection: "row", backgroundColor: "#f9f9f9", padding: 10, marginBottom: 10, borderRadius: 8 },
  cardContent: { flex: 1 },
  largeImage: { width: 80, height: 120, borderRadius: 10, marginRight: 10 },
  rowHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  venueDistance: { fontSize: 12, color: "gray" },
  venueType: { backgroundColor: "#FFA07A", padding: 4, borderRadius: 5, fontSize: 12 },
  userInfo: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  visited: { fontSize: 12, color: "gray" },
  review: { fontSize: 14, marginTop: 5 },
  rowBottom: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  rating: { fontSize: 16, fontWeight: "bold" },
  reviewCount: { fontSize: 14, color: "gray" },
  actions: { flexDirection: "row", gap: 20 },
  iconWrapper: { alignItems: "center" },
  guideOverlay: { position: "absolute", bottom: 100, backgroundColor: "orange", padding: 20, borderRadius: 10, alignSelf: "center", width: "90%", alignItems: "center" },
  guideTitle: { fontSize: 18, fontWeight: "bold", color: "black" },
  actionBubblesContainer: { position: "absolute", right: 50, bottom: 200, alignItems: "center" },
  actionBubble: { backgroundColor: "#FFD700", padding: 10, borderRadius: 15, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  navButtons: { flexDirection: "row", justifyContent: "space-between", position: "absolute", bottom: 30, width: "100%", paddingHorizontal: 20 },
  disabledButton: { opacity: 0.5, backgroundColor: "#B0B0B0", padding: 15, borderRadius: 10 },
  guideText: { fontSize: 14, textAlign: "center", color: "black", marginTop: 5 },
  venueName: { fontSize: 16, fontWeight: "bold", color: "#333" }
});

