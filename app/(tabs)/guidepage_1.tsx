import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { walkthroughable, CopilotStep, CopilotProvider, useCopilot } from "react-native-copilot";
import { Colors } from "../../styles/colors";

const WalkthroughTouchable = walkthroughable(TouchableOpacity);
const WalkthroughView = walkthroughable(View);

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

function GuidePage1() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [activeFilter, setActiveFilter] = useState("");
  const { start, copilotEvents } = useCopilot();
  const [isReady, setIsReady] = useState(false);

  const filters = ["All", "Nightclubs", "Bars", "Raves"];

  useEffect(() => {
    // Set a flag when component is mounted
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Subscribe to copilot events for debugging
    copilotEvents.on("stepChange", (step) => {
      console.log("Current step:", step?.name);
    });

    copilotEvents.on("stop", () => {
      console.log("Tour ended");
      router.push("/guidepage_2");
    });

    // Start the guide with a delay to ensure components are mounted
    const timer = setTimeout(() => {
      console.log("Starting guide...");
      start();
    }, 1500);

    return () => {
      clearTimeout(timer);
      copilotEvents.off("stepChange");
      copilotEvents.off("stop");
    };
  }, [isReady]);

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
          <Text style={styles.venueType}>{item.type}</Text>
        </View>
        <View style={styles.userInfo}>
          <Ionicons name="person-circle" size={20} color="gray" />
          <Text style={styles.visited}>{item.visited}</Text>
        </View>
        <Text style={styles.review}>{item.review}</Text>
        <View style={styles.rowBottom}>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount} Reviews)</Text>
          </View>
          <View style={styles.actions}>
            {/* Highlight Star Icon */}
            <CopilotStep 
              text="Add this exciting venue to your weekend plans! 🎉" 
              order={6} 
              name="rateVenue"
            >
              <WalkthroughTouchable style={styles.iconContainer}>
                <Ionicons name="star-outline" style={styles.icon} />
              </WalkthroughTouchable>
            </CopilotStep>

            {/* Highlight Plus Icon */}
            <CopilotStep 
              text="Share your experience by rating this venue! ⭐️" 
              order={7} 
              name="addToPlans"
            >
              <WalkthroughTouchable 
                style={styles.iconContainer}
                onPress={() => router.push("/expanded-tabs/rateTheJoint1")}
              >
                <Ionicons name="add-circle-outline" style={styles.icon} />
              </WalkthroughTouchable>
            </CopilotStep>

            {/* Highlight Bookmark Icon */}
            <CopilotStep 
              text="Save this venue to your futures list for later" 
              order={8} 
              name="futuresList"
            >
              <WalkthroughTouchable style={styles.iconContainer}>
                <Ionicons name="bookmark-outline" style={styles.icon} />
              </WalkthroughTouchable>
            </CopilotStep>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nightlife Venue Feed</Text>
      <Text style={styles.header1}>Find your next night out</Text>
      
      <View style={styles.tabs}>
        {["All", "Top Reviews", "Near You", "Friends Going"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            {tab !== "All" ? (
              <CopilotStep
                text={
                  tab === "Top Reviews" ? "Prioritize top reviews in your feed" :
                  tab === "Near You" ? "Find places near you" :
                  tab === "Friends Going" ? "See you and your friends upcoming events" :
                  ""
                }
                order={
                  tab === "Top Reviews" ? 2 :
                  tab === "Near You" ? 3 :
                  tab === "Friends Going" ? 4 :
                  -1
                }
                name={tab.toLowerCase().replace(" ", "_")}
              >
                <WalkthroughTouchable>
                  <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
                </WalkthroughTouchable>
              </CopilotStep>
            ) : (
              <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.rowHeader}>
        <Text style={styles.subHeader}>Your Friends' Reviews</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <Text style={styles.itemCount}>{reviews.length} items</Text>

      <View style={styles.filters}>
        {filters.map((filter) => (
          <TouchableOpacity 
            key={filter} 
            onPress={() => setActiveFilter(filter)}
          >
            {filter === "Nightclubs" ? (
              <CopilotStep
                text="Filter to only see certain types of venues"
                order={5}
                name="filter_nightclubs"
              >
                <WalkthroughTouchable>
                  <View style={[styles.filterButton, activeFilter === filter && styles.activeFilter]}>
                    <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                      {filter}
                    </Text>
                  </View>
                </WalkthroughTouchable>
              </CopilotStep>
            ) : (
              <View style={[styles.filterButton, activeFilter === filter && styles.activeFilter]}>
                <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                  {filter}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <FlatList 
        data={reviews} 
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View>
            {item.id === "1" ? (
              <CopilotStep
                text="See where friends have been and whether they liked it"
                order={1}
                name="venue_card"
              >
                <WalkthroughTouchable>
                  {renderReview({ item })}
                </WalkthroughTouchable>
              </CopilotStep>
            ) : (
              renderReview({ item })
            )}
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// Wrap with CopilotProvider
export default function WrappedGuidePage1() {
  return (
    <CopilotProvider 
      overlay="view"
      animated={true}
      tooltipStyle={{
        backgroundColor: 'rgba(255, 236, 217, 0.98)',
        padding: 15,
        borderRadius: 12,
      }}
      backdropColor="rgba(50, 50, 50, 0.9)"
      stepNumberComponent={() => null}
      labels={{
        next: "Next →",
        skip: "Skip",
        finish: "Got it! 🎉"
      }}
      androidStatusBarVisible={false}
      stopOnOutsideClick={true}
    >
      <GuidePage1 />
    </CopilotProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 16 
  },
  header: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 50 
  },
  header1: { 
    fontSize: 15, 
    textAlign: 'center', 
    marginBottom: 30, 
    marginTop: 5 
  },
  tabs: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 30 
  },
  tab: { 
    fontSize: 16, 
    color: 'gray' 
  },
  activeTab: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: Colors.primary.orange, 
    borderBottomWidth: 5, 
    borderBottomColor: Colors.primary.orange 
  },
  rowHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  subHeader: { 
    fontSize: 22, 
    marginBottom: 5, 
    color: '#9C9BA6' 
  },
  seeAll: { 
    color: Colors.primary.orange, 
    fontWeight: 'bold' 
  },
  itemCount: { 
    fontSize: 15, 
    color: 'gray', 
    marginBottom: 10 
  },
  listContainer: { 
    paddingBottom: 80 
  },
  card: { 
    flexDirection: 'row', 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 8, 
    backgroundColor: '#f9f9f9', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  largeImage: { 
    width: 80, 
    height: 120, 
    borderRadius: 10, 
    marginRight: 10 
  },
  cardContent: { 
    flex: 1,
    paddingRight: 5
  },
  venueName: { 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  venueType: { 
    backgroundColor: Colors.background.redLight,
    opacity: 40,
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10
  },
  userInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5, 
    marginBottom: 5 
  },
  visited: { 
    fontSize: 12, 
    color: 'gray' 
  },
  review: { 
    fontSize: 14, 
    marginTop: 5 
  },
  rowBottom: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 5 
  },
  ratingRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  rating: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: Colors.text.red
  },
  reviewCount: { 
    fontSize: 14, 
    color: 'gray' 
  },
  actions: { 
    flexDirection: 'row', 
    gap: 8,
    marginTop: 5, 
    justifyContent: 'flex-end',
    paddingRight: 5
  },
  icon: { 
    fontSize: 20,
    color: Colors.text.warning 
  },
  iconContainer: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.background.redLight,
    borderRadius: 15,
  },
  activeFilter: {
    backgroundColor: Colors.primary.orange,
  },
  filterText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500'
  },
  activeFilterText: {
    color: '#fff'
  }
});