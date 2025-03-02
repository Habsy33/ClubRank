import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FriendsGoing = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Friends Going');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDayEmpty} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <TouchableOpacity key={i} style={styles.calendarDay}>
          <Text style={styles.calendarDayText}>{i}</Text>
          {/* Example icons and names */}
          {i === 3 && (
            <>
              <Ionicons name="beer" size={16} color="#FF5733" />
              <Text style={styles.calendarDayName}>Alice</Text>
            </>
          )}
          {i === 7 && (
            <>
              <Ionicons name="musical-notes" size={16} color="#FF5733" />
              <Text style={styles.calendarDayName}>Bob</Text>
            </>
          )}
        </TouchableOpacity>
      );
    }
    return days;
  };

  const changeMonth = (direction: number) => {
    setCurrentMonth(prev => {
      let newMonth = prev + direction;
      if (newMonth < 0) {
        newMonth = 11;
        setCurrentYear(prevYear => prevYear - 1);
      } else if (newMonth > 11) {
        newMonth = 0;
        setCurrentYear(prevYear => prevYear + 1);
      }
      return newMonth;
    });
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'All':
        router.push('/(tabs)');
        break;
      case 'Top Reviews':
        router.push('/');
        break;
      case 'Near You':
        router.push('/');
        break;
      case 'Friends Going':
        router.push('/');
        break;
      default:
        router.push('/');
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
      
      <Text style={styles.subHeader}>Venues Your Friends Are Going To</Text>
      
      <View style={styles.filters}>
        {['All', 'Nightclubs', 'Bars', 'Raves'].map(filter => (
          <TouchableOpacity key={filter} style={styles.filterButton}>
            <Text>{filter}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
      </View>
      
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Ionicons name="chevron-back" size={24} color="#FF5733" />
          </TouchableOpacity>
          <Text style={styles.calendarMonthText}>
            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Ionicons name="chevron-forward" size={24} color="#FF5733" />
          </TouchableOpacity>
        </View>
        <View style={styles.calendarGrid}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Text key={day} style={styles.calendarDayHeader}>{day}</Text>
          ))}
          {renderCalendar()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 50 },
  header1: { fontSize: 15, textAlign: 'center', marginBottom: 30, marginTop: 5 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  tab: { fontSize: 16, color: 'gray' },
  activeTab: { fontSize: 16, fontWeight: 'bold', color: '#FB6D3A', borderBottomWidth: 5, borderBottomColor: '#FB6D3A' },
  subHeader: { fontSize: 22, marginBottom: 20, color: '#9C9BA6' },
  filters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  filterButton: { paddingHorizontal: 15, padding: 10, backgroundColor: 'rgba(255, 119, 34, 0.28)', borderRadius: 15, marginRight: 5 },
  seeAll: { color: '#FF5733', fontWeight: 'bold' },
  calendarContainer: { marginBottom: 20 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  calendarMonthText: { fontSize: 18, fontWeight: 'bold' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calendarDayHeader: { width: '14.28%', textAlign: 'center', fontWeight: 'bold', marginBottom: 10 },
  calendarDay: { width: '14.28%', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 5 },
  calendarDayEmpty: { width: '14.28%', padding: 10 },
  calendarDayText: { fontSize: 16 },
  calendarDayName: { fontSize: 12, color: '#FF5733' },
});

export default FriendsGoing;