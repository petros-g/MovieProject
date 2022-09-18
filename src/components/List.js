import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieDetails, getMovies} from '../api/getMovies';
import {useNavigation} from '@react-navigation/native';

const List = ({data, setData}) => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    pageNumber: 2,
    isFetching: false,
  });

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          disabled={state.isFetching}
          style={styles.button}
          onPress={() => {
            setState({...state, isFetching: true});
            getMovieDetails(item.id).then(data =>
              setTimeout(() => {
                navigation.navigate('Movie Details', {detailData: data}),
                  setState({...state, isFetching: false});
              }, 2000),
            );
          }}>
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
    <View>
      {state.isFetching && (
        <ActivityIndicator
          style={styles.loading}
          animating={true}
          size="large"
        />
      )}

      <FlatList
        // ListHeaderComponent={{}}
        ListEmptyComponent={<ActivityIndicator animating={true} size="large" />}
        ListFooterComponent={
          <Button
            disabled={state.isFetching}
            title="Load more"
            onPress={() => {
              setState({isFetching: true});
              try {
                getMovies(state.pageNumber).then(movies =>
                  setTimeout(() => {
                    setData([...data, ...movies.results]);
                    setState({
                      pageNumber: state.pageNumber + 1,
                      isFetching: false,
                    });
                  }, 1),
                );
              } catch (error) {
                setState({isFetching: false});
              }
            }}
          />
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
    width: '80%',
    height: 300,
    borderRadius: 20,
  },
  item: {marginVertical: 10},

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
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    opacity: 0.7,
    padding: 350,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
});
