import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const List = ({data}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log(item.id)}>
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
      ListFooterComponent={<Text>Load more</Text>}
      data={data?.results}
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
