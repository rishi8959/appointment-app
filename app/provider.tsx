import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Provider() {
  const { provider } = useLocalSearchParams();
  const router = useRouter();

  if (!provider) return <Text>Loading...</Text>;

  const data = JSON.parse(provider as string);

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.category}>{data.category}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({ pathname: '/booking', params: { provider: JSON.stringify(data) } })
        }
      >
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 25, backgroundColor: '#f2f5f8' },
  image: { width: 130, height: 130, borderRadius: 65, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  category: { fontSize: 16, color: '#777', marginBottom: 30 },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});