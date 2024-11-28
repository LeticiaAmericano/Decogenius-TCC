import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './src/Navigation';
import { ConfigProvider } from './src/Hooks/Config';

const GlobalStyle = StyleSheet.create({
  global: {
    height: '100%',
    width: '100%',
  },
});

const App: React.FC = () => (
  <SafeAreaView style={GlobalStyle.global}>
    <ConfigProvider>
      <Navigation />
    </ConfigProvider>
  </SafeAreaView>
);


//const App: React.FC = () => (
//  <SafeAreaView style={GlobalStyle.global}>
//  <ConfigProvider>
//      <AuthProvider>
//          <Navigation />
//      </AuthProvider>
//  </ConfigProvider>
//</SafeAreaView>
//);

export default App;
