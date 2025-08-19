import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
  const openEmail = () => Linking.openURL('mailto:suporte@flashdelivery.dev');
  const openWhats = () => Linking.openURL('https://wa.me/5500000000000');
  const openFAQ = () => Linking.openURL('https://example.com/faq');

  const RowBtn = ({ icon, label, onPress, color = '#0d6efd' }: { icon: any; label: string; onPress: () => void; color?: string }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{
      flexDirection: 'row', alignItems: 'center', gap: 10,
      backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e9ecef', padding: 14
    }}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={{ color: '#0b2135', fontWeight: '700' }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0b2135', marginBottom: 8 }}>Suporte</Text>

      <View style={{ gap: 10 }}>
        <RowBtn icon="mail-outline" label="Enviar e-mail" onPress={openEmail} />
        <RowBtn icon="logo-whatsapp" label="Falar no WhatsApp" onPress={openWhats} color="#25D366" />
        <RowBtn icon="help-circle-outline" label="Central de Ajuda (FAQ)" onPress={openFAQ} color="#6c757d" />
      </View>

      <View style={{ marginTop: 16, backgroundColor: '#fff3cd', borderColor: '#ffe69c', borderWidth: 1, borderRadius: 12, padding: 12 }}>
        <Text style={{ color: '#664d03' }}>Horário de atendimento: 08:00 às 20:00 (seg a sex)</Text>
      </View>
    </ScrollView>
  );
}
