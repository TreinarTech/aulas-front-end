import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/state/auth';
import { useRouter } from 'expo-router';
import styles from '@/styles/login.styles';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('cliente@flash.dev');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    try {
      setLoading(true);
      await signIn(email.trim(), password);
      // Ensure we land on private area after auth
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <View style={styles.logoCircle}>
            <Ionicons name="flash-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.brandText}>FlashDelivery</Text>
        </View>

        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Use seus dados para continuar</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="warning-outline" size={16} color="#842029" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.field}>
          <Ionicons name="mail-outline" size={18} color="#0b2135" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
            placeholderTextColor="#6c757d"
            returnKeyType="next"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Ionicons name="lock-closed-outline" size={18} color="#0b2135" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor="#6c757d"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          disabled={loading}
          onPress={onSubmit}
          activeOpacity={0.9}
          style={styles.primaryButton}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.ghost}>
          <Text style={styles.ghostText}>Ao continuar, você aceita nossos termos.</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
