import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieDetails, getMovies} from '../api/getMovies';
import {useNavigation} from '@react-navigation/native';

const List = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();

  useEffect(() => {
    // (async function () {
    //   const data = await getMovies();
    //   console.log(data);
    // })();

    const fetching = async () => {
      await getMovies().then(movies => setData(movies.results));
    };

    fetching().catch(e => e);
  }, []);
  console.log(data);
  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            getMovieDetails(item.id).then(data =>
              navigation.navigate('Movie Details', {detailData: data}),
            )
          }>
          <Image
            resizeMode="center"
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>Rating: {item.vote_average} </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={<Text>Hello</Text>}
      ListFooterComponent={
        <Button
          title="Load more"
          onPress={() =>
            getMovies(2).then(movies => setData([...data, ...movies.results]))
          }
        />
      }
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: 300,
    borderRadius: 20,
  },
  item: {marginVertical: 100},

  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
});
