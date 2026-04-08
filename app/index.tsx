import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const data = await AsyncStorage.getItem('user');
    if (!data) return alert('No user found. Please register first');

    const user = JSON.parse(data);
    if (user.email === email && user.password === password) {
      alert('Login Successful ✅');
      router.push('/home');
    } else {
      alert('Invalid email or password ❌');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome</Text>
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerLink} onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Don&apos;t have an account? Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 25, backgroundColor: '#f2f5f8' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 12, marginBottom: 15, backgroundColor: '#fff' },
  loginButton: { backgroundColor: '#4A90E2', width: '100%', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  registerLink: { marginTop: 10 },
  registerText: { color: '#4A90E2', fontWeight: 'bold' },
});