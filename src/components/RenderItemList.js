import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {getMovieDetails} from '../api/getMovies';
import {useNavigation} from '@react-navigation/native';

const RenderItemList = ({state, setState, item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <TouchableOpacity
        disabled={state.isFetching}
        style={styles.touchableOp}
        onPress={() => {
          setState({...state, isFetching: true});

          getMovieDetails(item.id)
            .then(data => {
              navigation.navigate('Movie Details', {detailData: data}),
                setState({...state, isFetching: false});
            })
            .catch(error => {
              Alert.alert('Error!', `${error.message}`, [{text: 'OK'}]);
              setState({...state, isFetching: false});
            });
        }}>
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

export default RenderItemList;

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
  text: {
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
  },
});
