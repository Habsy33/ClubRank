import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { format, addDays, endOfMonth, addMonths, subMonths } from "date-fns";
import { Feather } from "@expo/vector-icons";

const EventScheduler = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(8); // Default to 08:00

  // Generate all dates for the selected month
  const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);
  const dates = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => ({
    label: format(addDays(firstDayOfMonth, i), "EEE d"),
    date: addDays(firstDayOfMonth, i),
  }));

  const times = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>When are you going?</Text>

        {/* Event Details */}
        <View style={styles.card}>
          <Image
            source={{ uri: "https://via.placeholder.com/80" }} // Replace with actual event image
            style={styles.eventImage}
          />
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>Balls</Text>
            <View style={styles.tags}>
              <Text style={styles.orangeTag}>Bar</Text>
              <Text style={styles.orangeTag}>Jazz</Text>
            </View>
            <Text style={styles.rating}>
              ⭐ 9.4 <Text style={styles.reviewText}>(10+ Reviews)</Text>
            </Text>
          </View>
        </View>

        {/* Month Selection */}
        <Text style={styles.sectionTitle}>Month</Text>
        <View style={styles.monthPicker}>
          <TouchableOpacity onPress={() => setSelectedMonth(subMonths(selectedMonth, 1))}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{format(selectedMonth, "MMMM yyyy")}</Text>
          <TouchableOpacity onPress={() => setSelectedMonth(addMonths(selectedMonth, 1))}>
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Date Selection */}
        <Text style={styles.sectionTitle}>Date</Text>
        <FlatList
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datePicker}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.dateOption, selectedDateIndex === index && styles.selectedDate]}
              onPress={() => setSelectedDateIndex(index)}
            >
              <Text style={selectedDateIndex === index ? styles.selectedDateText : styles.dateText}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Time Selection */}
        <Text style={styles.sectionTitle}>Time</Text>
        <FlatList
          data={times}
          keyExtractor={(item) => item}
          style={styles.timeList}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={50} // Adjusted for spacing
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.y / 50);
            setSelectedTimeIndex(index);
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.timeOption,
                selectedTimeIndex === index ? styles.centerTime : styles.fadedTime,
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTimeIndex === index ? styles.selectedTimeText : styles.fadedTimeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Buttons now evenly spaced on the screen */}
        <TouchableOpacity style={styles.tagFriendsButton}>
          <Text style={styles.buttonText}>Tag Friends?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}>
          <Text style={[styles.buttonText, { color: "white" }]}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EventScheduler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40, // Adjusted to ensure buttons fit properly
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  eventImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  eventDetails: {
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tags: {
    flexDirection: "row",
    marginTop: 5,
  },
  orangeTag: {
    backgroundColor: "#F97316",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  rating: {
    color: "#F97316",
    fontWeight: "bold",
    marginTop: 5,
  },
  reviewText: {
    color: "gray",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  monthPicker: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  datePicker: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  dateOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedDate: {
    backgroundColor: "#3B82F6",
  },
  dateText: {
    fontSize: 20,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  timeList: {
    height: 220,
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  centerTime: {
    transform: [{ scale: 1.2 }],
  },
  fadedTime: {
    opacity: 0.5,
  },
  timeText: {
    fontSize: 18,
  },
  selectedTimeText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
  },
  fadedTimeText: {
    fontSize: 16,
    color: "gray",
  },
  tagFriendsButton: {
    backgroundColor: "#F97316",
    paddingVertical: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  postButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
