import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DetailsScreen = ({route}) => {
  const {detailData} = route.params;

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/original${detailData.backdrop_path}`,
        }}
      />
      <View style={styles.titleView}>
        <Text style={styles.title}>{detailData.title}</Text>
        <Text style={styles.title}>★{detailData.vote_average.toFixed(1)}</Text>
      </View>
      <Text>
        {detailData.release_date.substring(0, 4)} |{' '}
        {detailData.genres.map(item => `${item.name} `)} | {detailData.runtime}m
      </Text>
      <Text style={styles.summary}>{detailData.overview}</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    padding: 5,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summary: {
    margin: 5,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 250,
  },
});
