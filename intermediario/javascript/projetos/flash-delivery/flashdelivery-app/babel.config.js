module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Expo Router plugin should be before others
      'expo-router/babel',
      // Reanimated plugin must be listed last
      'react-native-reanimated/plugin',
    ],
  };
}
