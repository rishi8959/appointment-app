import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { providers } from './data/providers';

export default function Home() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof providers[0] }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: '/provider', params: { provider: JSON.stringify(item) } })
      }
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <Text style={styles.arrow}>➡️</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={providers}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 15 }}
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: { marginBottom: 15 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: 70, height: 70, borderRadius: 35 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  category: { fontSize: 14, color: '#777', marginTop: 4 },
  arrow: { fontSize: 20, color: '#999' },
});