import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const LoadingOverlay: React.FC<{ visible: boolean } > = ({ visible }) => {
  if (!visible) return null;
  return (
    <View style={styles.backdrop} pointerEvents="none">
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#E11D48" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  box: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
});
