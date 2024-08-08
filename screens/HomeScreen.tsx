import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppEvent, HomeScreenNavigationProp } from '../types';

const initialEventsData: AppEvent[] = [
  {
    id: '1',
    title: 'Event One',
    description: 'This is a short description of Event One.',
    fullDescription: 'This is the full description of Event One. It includes more details about the event.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Event Two',
    description: 'This is a short description of Event Two.',
    fullDescription: 'This is the full description of Event Two. It includes more details about the event.',
    image: 'https://via.placeholder.com/150',
  },
];

const HomeScreen = () => {
  const [events, setEvents] = useState<AppEvent[]>(initialEventsData);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const addEvent = (newEvent: AppEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const renderItem = ({ item }: { item: AppEvent }) => (
    <View style={styles.eventContainer}>
      <View style={styles.eventContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
        {expandedEvent === item.id && <Text>{item.fullDescription}</Text>}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.learnMoreContainer} onPress={() => setExpandedEvent(expandedEvent === item.id ? null : item.id)}>
            <Text style={styles.learnMore}>{expandedEvent === item.id ? 'Hide Details' : 'Learn More'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.joinButton} onPress={() => { /* handle join chat */ }}>
            <Text style={styles.joinButtonText}>Join Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateEvent', { addEvent })}>
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  eventContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  eventContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  learnMoreContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  learnMore: {
    color: '#fff',
  },
  joinButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  joinButtonText: {
    color: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#2196F3',  // Blue color as it was previously
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
