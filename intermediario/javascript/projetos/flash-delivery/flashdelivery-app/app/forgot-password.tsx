import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    if (!email) {
      setError('Informe seu e-mail');
      return;
    }
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      Alert.alert('E-mail enviado', 'Se o e-mail existir na nossa base, você receberá instruções para redefinir a senha.');
      router.replace('/login');
    } catch {
      setError('Falha ao enviar e-mail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, padding: 24, gap: 16, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E11D48', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="flash-outline" size={20} color="#fff" />
          </View>
          <Text style={{ fontWeight: '800', fontSize: 18, color: '#0b2135' }}>FlashDelivery</Text>
        </View>
        <Text style={{ fontSize: 22, fontWeight: '800', color: '#0b2135' }}>Recuperar senha</Text>
        <Text style={{ color: '#475569' }}>Informe seu e-mail para receber instruções.</Text>

        {error ? (
          <View style={{ backgroundColor: '#f8d7da', padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="warning-outline" size={16} color="#842029" />
            <Text style={{ color: '#842029' }}>{error}</Text>
          </View>
        ) : null}

        <View style={{ backgroundColor: '#f8fafc', borderRadius: 10, paddingHorizontal: 12, height: 48, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="mail-outline" size={18} color="#0b2135" />
          <TextInput placeholder="E-mail" placeholderTextColor="#6c757d" style={{ flex: 1, color: '#0b2135' }} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} returnKeyType="send" onSubmitEditing={onSubmit} />
        </View>

        <TouchableOpacity disabled={loading} onPress={onSubmit} activeOpacity={0.9} style={{ backgroundColor: '#E11D48', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 }}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '800' }}>Enviar</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')} style={{ alignSelf: 'center', marginTop: 6 }}>
          <Text style={{ color: '#0b2135', fontWeight: '600' }}>Voltar ao login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
