/* eslint-disable global-require */
/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Label, Picker, Item, Input } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import RegularTextBox from '../../components/RegularTextBox';
import LoadingIndicator from '../../components/LoadingIndicator';
import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.borderGrey,
    alignSelf: 'center',
  },
  pickerContainer: {
    borderRadius: 3,
  },
  cancelBtn: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: colours.slightlyWhite,
    borderWidth: 0.5,
    borderColor: colours.borderGrey,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  saveBtn: {
    flexDirection: 'row',
    marginRight: 5,
    backgroundColor: colours.saveGreen,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveContinueBtn: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: colours.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Disclaimer({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' && 'padding'}
    >
      <ImageBackground
        source={require('../../../assets/background_image.png')}
        imageStyle={{ resizeMode: 'stretch' }}
        style={{ flex: 1 }}
      >
        <View style={globalStyles.screenPadding}>
          <Text
            style={{ color: colours.white, fontSize: 18, fontWeight: 'bold' }}
          >
            Disclaimer
          </Text>
          <ScrollView>
            <View
              style={[
                globalStyles.addResourceFormContainer,
                globalStyles.mildShadow,
              ]}
            >
              <Text>Disclaimer</Text>

              <TouchableOpacity
                style={{ alignSelf: 'flex-end' }}
                onPress={() => navigation.navigate('UserDetails')}
              >
                <Feather name="arrow-right" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

Disclaimer.defaultProps = {
  route: null,
};

Disclaimer.propTypes = {
  route: PropTypes.object,
};

export default Disclaimer;
