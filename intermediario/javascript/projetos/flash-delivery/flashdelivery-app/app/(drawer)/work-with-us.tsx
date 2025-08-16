import React from 'react';
import { Alert, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function WorkWithUsScreen() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const submit = () => {
    Alert.alert('Obrigado!', 'Recebemos seu interesse. Entraremos em contato.');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0b2135' }}>Trabalhe Conosco</Text>
      <Text style={{ color: '#475569' }}>Junte-se ao FlashDelivery! Preencha seus dados abaixo:</Text>

      <View style={{ gap: 8 }}>
        <Text style={{ color: '#0b2135', fontWeight: '700' }}>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Seu nome"
          style={{ borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, padding: 12 }}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ color: '#0b2135', fontWeight: '700' }}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="voce@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, padding: 12 }}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ color: '#0b2135', fontWeight: '700' }}>Mensagem</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Conte um pouco sobre você"
          multiline
          numberOfLines={5}
          style={{ borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, padding: 12, textAlignVertical: 'top' }}
        />
      </View>

      <TouchableOpacity onPress={submit} activeOpacity={0.9} style={{ backgroundColor: '#E11D48', padding: 14, borderRadius: 12, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: '800' }}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL('mailto:jobs@flashdelivery.com')}>
        <Text style={{ color: '#E11D48', fontWeight: '700', textAlign: 'center' }}>Ou envie seu CV para jobs@flashdelivery.com</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
