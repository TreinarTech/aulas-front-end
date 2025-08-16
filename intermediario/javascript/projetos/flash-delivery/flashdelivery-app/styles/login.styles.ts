import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d6efd',
  },
  brandText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0b2135',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0b2135',
  },
  subtitle: {
    color: '#6c757d',
    marginTop: -6,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: '#f5c2c7',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  errorText: {
    color: '#842029',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    color: '#0b2135',
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: '#0d6efd',
    borderRadius: 9999,
    padding: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
  ghost: {
    alignItems: 'center',
  },
  ghostText: {
    color: '#6c757d',
  },
});

export default styles;
