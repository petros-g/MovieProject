import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovies} from '../api/getMovies';
import RenderItemList from './RenderItemList';

const List = () => {
  const [data, setData] = useState();
  const [state, setState] = useState({
    pageNumber: 2,
    isFetching: false,
  });

  useEffect(() => {
      getMovies()
        .then(response => setData(response.results))
        .catch(error =>
          Alert.alert('Error!', `${error.message}`, [{text: 'OK'}]),
        );
    
  }, []);

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
              onPress={() => {
              setState({...state, isFetching: true});
              getMovies(state.pageNumber).then(movies => {
            setData([...data, ...movies.results]);
            setState({
              pageNumber: state.pageNumber + 1,
              isFetching: false,
            });
          })
          .catch(error => {
            Alert.alert('Error!', `${error.message}`, [{text: 'OK'}]);
            setState({...state, isFetching: false});
          });
              }}
            />
          )
        }
        data={data}
        renderItem={({item}) => (
          <RenderItemList state={state} setState={setState} item={item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
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
});
