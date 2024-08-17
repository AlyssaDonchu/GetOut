import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, AppEvent } from '../types';
import * as ImagePicker from 'expo-image-picker';

type Props = StackScreenProps<RootStackParamList, 'CreateEvent'>;

const CreateEventScreen: React.FC<Props> = ({ route, navigation }) => {
  const { addEvent } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateEvent = () => {
    const newEvent: AppEvent = {
      id: Math.random().toString(),
      title,
      description,
      fullDescription,
      image: image || '',
    };
    addEvent(newEvent);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Short Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Description"
        value={fullDescription}
        onChangeText={setFullDescription}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.space}></View>
      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 50,
    marginVertical: 10,
    width: 150,
    alignSelf: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
  },
  space: {
    height: 20,
  },
});

export default CreateEventScreen;
