import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './src/views/Home';
import Task from './src/views/Task';
import QrCode from './src/views/QrCode';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Task,
    QrCode,
  })
);

export default function App() {
  return (
    <SafeAreaView style={S.safeAreaView}>
      <Routes />
    </SafeAreaView>
  )
}

const S = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});