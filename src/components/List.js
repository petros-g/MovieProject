import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieDetails, getMovies} from '../api/getMovies';
import {useNavigation} from '@react-navigation/native';

const List = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [state, setState] = useState({
    pageNumber: 2,
    isFetching: false,
  });

  useEffect(() => {
    (async function () {
      try {
        const response = await getMovies();
        setData(response.results);
      } catch (error) {
        Alert.alert('Error!', `${error.message}`, [{text: 'OK'}]);
      }
    })();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          disabled={state.isFetching}
          style={styles.touchableOp}
          onPress={() => onClick(item)}>
          <Image
            accessibilityLabel="Image that shows movie content"
            resizeMode="center"
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>
            Rating: ★{item.vote_average.toFixed(1)}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onClick = item => {
    setState({...state, isFetching: true});
    try {
      item
        ? //If a movie is pressed runs this:
          getMovieDetails(item.id).then(data => {
            navigation.navigate('Movie Details', {detailData: data}),
              setState({...state, isFetching: false});
          })
        : //if load more button is pressed runs this:
          getMovies(state.pageNumber).then(movies => {
            setData([...data, ...movies.results]);
            setState({
              pageNumber: state.pageNumber + 1,
              isFetching: false,
            });
          });
    } catch (error) {
      Alert.alert('Error!', `${error.message}`, [{text: 'OK'}]);
      setState({...state, isFetching: false});
    }
  };

  return (
    <View>
      {state.isFetching && (
        <ActivityIndicator
          style={styles.loading}
          animating={state.isFetching}
          size="large"
        />
      )}

      <FlatList
        contentContainerStyle={{padding: 10}}
        numColumns={2}
        ListHeaderComponent={<Text style={styles.title}>Popular Movies</Text>}
        ListEmptyComponent={<ActivityIndicator animating={true} size="large" />}
        ListFooterComponentStyle={styles.buttonFooter}
        ListFooterComponent={
          data && (
            <Button
              disabled={state.isFetching}
              accessibilityLabel="Press to load more movies"
              title="Load more movies ..."
              onPress={() => onClick()}
            />
          )
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  item: {marginVertical: 5, flex: 1},
  touchableOp: {padding: 5},
  title: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    fontWeight: '700',
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    opacity: 0.8,
    height: '100%',
    width: '100%',
  },
  text: {
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
  },
});
