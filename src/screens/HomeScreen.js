import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import List from '../components/List';
import {getMovies} from '../api/getMovies';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();

  useEffect(() => {
    // (async function () {
    //   const data = await getMovies();
    //   console.log(data);
    // })();

    const fetching = async () => {
      const movies = await getMovies();
      setData(movies);
      console.log(movies);
    };

    fetching().catch(e => e);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <List data={data} />

      <Button title="Press" onPress={() => getMoviesFromApiAsync()} />
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
