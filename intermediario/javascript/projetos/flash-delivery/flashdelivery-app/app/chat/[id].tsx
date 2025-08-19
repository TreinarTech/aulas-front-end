import React, { useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RESTAURANTS } from '@/data/mock';

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = useMemo(() => RESTAURANTS.find(r => r.id === id), [id]);

  type Msg = { id: string; from: 'me' | 'store'; text: string; ts: number };
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 'm1', from: 'store', text: `Olá! Aqui é ${restaurant?.name ?? 'o estabelecimento'}. Como posso ajudar?`, ts: Date.now() - 60000 },
  ]);
  const listRef = useRef<FlatList<Msg>>(null);

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const myMsg: Msg = { id: `m_${Date.now()}`, from: 'me', text: trimmed, ts: Date.now() };
    setMsgs(prev => [...prev, myMsg]);
    setText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);

    // Simula resposta do estabelecimento
    setTimeout(() => {
      setMsgs(prev => [
        ...prev,
        { id: `a_${Date.now()}`, from: 'store', text: 'Já estamos verificando para você 👍', ts: Date.now() },
      ]);
      listRef.current?.scrollToEnd({ animated: true });
    }, 900);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity accessibilityRole="button" onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={22} color="#0b2135" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{restaurant?.name ?? 'Chat'}</Text>
        <View style={styles.headerBtn} />
      </View>

      <FlatList
        ref={listRef}
        data={msgs}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.from === 'me' ? styles.me : styles.store]}>
            <Text style={[styles.bubbleText, item.from === 'me' ? styles.meText : styles.storeText]}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Escreva sua mensagem"
          placeholderTextColor="#6c757d"
          style={styles.input}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <TouchableOpacity accessibilityRole="button" onPress={send} style={styles.sendBtn}>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e9ecef', gap: 8 },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#f8f9fa' },
  headerTitle: { flex: 1, color: '#0b2135', fontWeight: '700', fontSize: 16 },
  list: { padding: 12, gap: 8 },
  bubble: { maxWidth: '80%', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14 },
  me: { alignSelf: 'flex-end', backgroundColor: '#0d6efd' },
  store: { alignSelf: 'flex-start', backgroundColor: '#f1f3f5' },
  bubbleText: { fontSize: 14 },
  meText: { color: '#fff' },
  storeText: { color: '#0b2135' },
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 8, borderTopWidth: 1, borderTopColor: '#e9ecef' },
  input: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e9ecef', borderRadius: 999, paddingHorizontal: 14, paddingVertical: Platform.select({ ios: 12, android: 8 }), color: '#0b2135' },
  sendBtn: { backgroundColor: '#0d6efd', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999 },
});
