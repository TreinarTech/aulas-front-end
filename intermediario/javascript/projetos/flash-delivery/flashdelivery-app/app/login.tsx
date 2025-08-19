import { useAuth } from '@/state/auth';
import styles from '@/styles/login.styles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('cliente@flash.dev');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await AsyncStorage.getItem('flash.login.remember');
        const rem = r === '1';
        setRemember(rem);
        if (rem) {
          const savedEmail = await AsyncStorage.getItem('flash.login.email');
          const savedPass = await AsyncStorage.getItem('flash.login.password');
          if (savedEmail) setEmail(savedEmail);
          if (savedPass) setPassword(savedPass);
        }
      } catch {}
    })();
  }, []);

  const onSubmit = async () => {
    setError(null);
    try {
      setLoading(true);
      await signIn(email.trim(), password);
      // Ensure we land on private area after auth
      router.replace('/');
      // persist if remember is on
      if (remember) {
        await AsyncStorage.multiSet([
          ['flash.login.remember', '1'],
          ['flash.login.email', email.trim()],
          ['flash.login.password', password],
        ]);
      } else {
        await AsyncStorage.multiRemove(['flash.login.remember', 'flash.login.email', 'flash.login.password']);
      }
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.screen}>
      <LinearGradient
        colors={[ '#ECFDF5', '#A7F3D0', '#34D399', '#059669' ]}
        locations={[0, 0.3, 0.65, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
      <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.14)' }] }>
        <View style={styles.brandRow}>
          <View style={styles.logoCircle}>
            <Ionicons name="flash-outline" size={28} color="#fff" />
          </View>
          <Text style={[styles.brandText, { color: '#fff' }]}>FlashDelivery</Text>
        </View>

        <Text style={[styles.title, { color: '#fff' }]}>Entrar</Text>
        <Text style={[styles.subtitle, { color: 'rgba(255,255,255,0.9)' }]}>Use seus dados para continuar</Text>

        {/* Feature chips */}
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.16)' }}>
            <Ionicons name="flash" size={14} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 6, fontWeight: '700', fontSize: 12 }}>Entrega rápida</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.16)' }}>
            <Ionicons name="pricetags-outline" size={14} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 6, fontWeight: '700', fontSize: 12 }}>Cupons</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.16)' }}>
            <Ionicons name="navigate-outline" size={14} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 6, fontWeight: '700', fontSize: 12 }}>Rastreamento</Text>
          </View>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="warning-outline" size={16} color="#842029" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.field}>
          <Ionicons name="mail-outline" size={18} color="#fff" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="E-mail"
            placeholderTextColor="#e5e7eb"
            returnKeyType="next"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Ionicons name="lock-closed-outline" size={18} color="#fff" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor="#e5e7eb"
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

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Switch
            value={remember}
            onValueChange={async (v) => {
              setRemember(v);
              if (v) {
                await AsyncStorage.multiSet([
                  ['flash.login.remember', '1'],
                  ['flash.login.email', email.trim()],
                  ['flash.login.password', password],
                ]);
              } else {
                await AsyncStorage.multiRemove(['flash.login.remember', 'flash.login.email', 'flash.login.password']);
              }
            }}
            trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#fb7185' }}
            thumbColor={remember ? '#E11D48' : '#f4f3f4'}
          />
          <Text style={{ color: '#fff' }}>Lembrar dados</Text>
        </View>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%', marginTop: 10 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <Text style={{ color: 'rgba(255,255,255,0.85)', fontWeight: '700' }}>ou continuar com</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
        </View>

        {/* Social buttons */}
        <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
          <TouchableOpacity activeOpacity={0.9} style={{ flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            <Ionicons name="logo-google" size={18} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '800' }}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={{ flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            <Ionicons name="logo-apple" size={18} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '800' }}>Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ghost}>
          <Text style={[styles.ghostText, { color: 'rgba(255,255,255,0.9)' }]}>Ao continuar, você aceita nossos termos.</Text>
        </View>
        <View style={{ marginTop: 8, gap: 6, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
