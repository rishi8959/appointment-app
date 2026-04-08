import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Booking() {
  const { provider } = useLocalSearchParams();
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!provider) return <Text>Loading...</Text>;

  const data = JSON.parse(provider as string);

  const handleBooking = async () => {
    if (!selectedSlot) return alert('Select a time slot');
    const existing = await AsyncStorage.getItem('appointments');
    const appointments = existing ? JSON.parse(existing) : [];
    appointments.push({ provider: data.name, slot: selectedSlot });
    await AsyncStorage.setItem('appointments', JSON.stringify(appointments));
    alert('Appointment Booked ✅');
    router.push('/appointments');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select a Time Slot</Text>
      <View style={styles.slotsContainer}>
        {data.slots.map((slot: string) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.slotButton,
              selectedSlot === slot && { backgroundColor: '#4A90E2' },
            ]}
            onPress={() => setSelectedSlot(slot)}
          >
            <Text style={[styles.slotText, selectedSlot === slot && { color: '#fff' }]}>
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleBooking}>
        <Text style={styles.confirmText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#f2f5f8', flexGrow: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  slotsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 },
  slotButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  slotText: { color: '#333', fontWeight: 'bold' },
  confirmButton: {
    backgroundColor: '#50E3C2',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});