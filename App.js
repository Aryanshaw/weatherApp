/* eslint-disable prettier/prettier */

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {haze , snow , rain , sunny , weatherBack , cloud} from './assets/index'
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);


  // const [{ main }] = weather;

  

  const api = {
    key: '96fb2b829ba232491fb9bd18e1b7bcb8',
    baseUrl: 'https://api.weatherstack.com/',
  };

  const fetchDataHandler = useCallback(() => {
    // console.log('fired')
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.weatherstack.com/current?access_key=${api.key}&query=${input}`,
    })
      .then(res => {
        console.log(res.data);
        // console.log(data?.current?.weather_icons)

        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [api.key, input]);

  useEffect(() => {
    setBackgroundImage(getBackgroundImg);
  },[data])

function getBackgroundImg() {
     if (`${data?.current?.weather_descriptions[0]}` === 'Snow' ) return snow;
     else if (`${data?.current?.weather_descriptions[0]}` === 'Clear') return sunny
     else if (`${data?.current?.weather_descriptions[0]}` === 'Sunny') return sunny
     else if (`${data?.current?.weather_descriptions[0]}` === 'Rain' ) return rain;
     else if (`${data?.current?.weather_descriptions[0]}` === 'Light Rain' ) return rain;
     else if (`${data?.current?.weather_descriptions[0]}` === 'Haze' ) return haze;
     else if (`${data?.current?.weather_descriptions[0]}` === 'Mist' ) return haze;
     else if (`${data?.current?.weather_descriptions[0]}` === 'Partly cloudy' ) return cloud;
     return weatherBack;   
}
  

  return (
    <View style={styles.root}>
      {/* <Text>App</Text> */}
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.imageBackground}>
        <View>
          {/* <Text>Weather</Text> */}
          <TextInput
            placeholder="Enter city name and press.. "
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'black'}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color="#000" />
          </View>
        )}
        {data && (
          // {input ,&& (
          <View style={styles.infoView}>
            <Text
              style={
                styles.citytext
              }>{`${data?.location?.name}, ${data?.location?.country}`}</Text>
            <Text style={styles.date}>{`${data?.location?.localtime}`}</Text>
            <Text style={styles.temp}>
              {`${Math.round(data?.current?.temperature)} °C`}
            </Text>
            {/* <Text style={styles.humidity}>{`${data?.current?.humidity}`}</Text> */}
            {/* <View style={{}}> */}
            {/* <Image
                // style={styles.weatherImage}
                source={{
                  url: "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0006_mist.png",
                  width: 200,
                  height: 200,
                }}
              /> */}
            <Image
              style={{marginTop: 20}}
              source={{
                uri: `${data?.current?.weather_icons}`,
                width: 120,
                height: 120,
              }}
            />
            <Text
              style={
                styles.description
              }>{`${data?.current?.weather_descriptions}`}</Text>

            {/* </View> */}
          </View>
          // )}
        )}
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 25,
    paddingVertical: 15,
    marginVertical: 100,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8c00',
  },
  infoView: {
    alignItems: 'center',
  },
  citytext: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  date: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  temp: {
    fontSize: 45,
    color: '#fff',
    marginVertical: 10,
  },
  description: {
    color: '#fff',
    fontSize: 28,
    marginVertical: 20,
    // fontWeight: '500',
  },
  weatherImage: {
    height: 50,
    width: 50,
    // zIndex:1,
    // flex: 1
  },
});
