import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import List from '../components/List';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
