import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Appointments() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => { loadAppointments(); }, []);

  const loadAppointments = async () => {
    const data = await AsyncStorage.getItem('appointments');
    if (data) setAppointments(JSON.parse(data));
  };

  const cancelAppointment = async (index: number) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    await AsyncStorage.setItem('appointments', JSON.stringify(updated));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Appointments</Text>
      {appointments.length === 0 && <Text style={{ color: '#555' }}>No appointments yet</Text>}
      {appointments.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{item.provider}</Text>
          <Text style={styles.slot}>{item.slot}</Text>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => cancelAppointment(index)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#f2f5f8', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  slot: { fontSize: 16, color: '#777', marginVertical: 5 },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  cancelText: { color: '#fff', fontWeight: 'bold' },
});