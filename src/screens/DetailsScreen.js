import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DetailsScreen = ({route}) => {
  const {
    title,
    adult,
    vote_average,
    release_date,
    genres,
    runtime,
    tagline,
    overview,
    backdrop_path,
    spoken_languages,
  } = route.params.detailData;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/original${backdrop_path}`,
          }}
        />
        <View style={styles.titleView}>
          <Text style={styles.title}>
            {title} {adult && '🔞'}
          </Text>
          <Text style={styles.title}>
            ⭐{vote_average?.toFixed(1)}
            <Text style={{fontSize: 13}}> /10</Text>
          </Text>
        </View>
        <Text style={styles.text}>
          {release_date?.substring(0, 4)} |{'  '}
          {genres?.map(item => `${item.name} `)} | {runtime} mins
        </Text>
        <Text style={styles.tagline}>"{tagline}"</Text>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={[styles.title, {fontSize: 20}]}>Summary:</Text>
          <Text style={styles.summary}>{overview}</Text>
        </View>
        <Text style={styles.languagesText}>
          Spoken Languages:{spoken_languages?.map(item => `  ${item.name}`)}
        </Text>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    padding: 5,
  },
  titleView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  summary: {
    paddingHorizontal: 15,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 250,
  },
  text: {
    marginLeft: 10,
  },
  tagline: {
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: '300',
    alignSelf: 'center',
    marginTop: 30,
  },
  languagesText: {
    marginHorizontal: 15,
    marginTop: 30,
    fontSize: 15,
  },
});
