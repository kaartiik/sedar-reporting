import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Item, Picker } from 'native-base';
import AppBar from '../../components/AppBar';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import colours from '../../providers/constants/colours';
import * as Location from 'expo-location';
import { updateUserLocation } from '../../providers/actions/User';

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.borderGrey,
    alignSelf: 'center',
  },
  recipeDescription: {
    marginVertical: 3,
    width: 220,
  },
  bookingItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
  },
  previewImg: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  flatlistEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textboxContainer: {
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    padding: 5,
    marginVertical: 5,
  },
  pickerOuterContainer: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: colours.themePrimary,
  },
  pickerContainer: { width: '95%', alignSelf: 'center' },
});

const GeneralInfo = ({ title, info }) => (
  <View style={{ flexDirection: 'row', marginLeft: 10, marginVertical: 5 }}>
    <Text style={{ fontSize: 16, marginRight: 8 }}>{title}: </Text>
    <Text style={{ flex: 1 }}>{info}</Text>
  </View>
);

function Home({ route, navigation }) {
  const dispatch = useDispatch();

  const { name, email, age, isLoading } = useSelector((state) => ({
    name: state.userReducer.name,
    email: state.userReducer.email,
    age: state.userReducer.age,
    isLoading: state.userReducer.isLoading,
  }));

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let location = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Highest, distanceInterval: 0 },
      (locationObj) => dispatch(updateUserLocation(locationObj))
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar />

      <View>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              padding: 10,
            }}
          >
            <GeneralInfo title="Name" info={name} />
            <GeneralInfo title="Email" info={email} />
            <GeneralInfo title="Age" info={age} />

            <Text style={{ color: 'black', textAlign: 'center' }}>
              Your location is being tracked by the hospital
            </Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

export default Home;
