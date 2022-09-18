import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {getMovies} from '../api/getMovies';

import List from '../components/List';

const HomeScreen = () => {
  const [data, setData] = useState();
  useEffect(() => {
    (async function () {
      try {
        const response = await getMovies();
        setData(response.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {data ? (
        <List data={data} setData={setData} />
      ) : (
        <ActivityIndicator size="large" />
      )}
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
