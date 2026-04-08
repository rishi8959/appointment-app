import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) return alert('Fill all fields');

    await AsyncStorage.setItem('user', JSON.stringify({ email, password }));
    alert('Registered Successfully ✅');

    router.push('/home'); // auto-login
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Register & Go Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 25, backgroundColor: '#f2f5f8' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 12, marginBottom: 15, backgroundColor: '#fff' },
  registerButton: { backgroundColor: '#50E3C2', width: '100%', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  registerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loginLink: { marginTop: 10 },
  loginText: { color: '#4A90E2', fontWeight: 'bold' },
});