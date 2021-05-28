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
import { Label, Picker, Item, Input } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import RegularTextBox from '../../components/RegularTextBox';
import LoadingIndicator from '../../components/LoadingIndicator';
import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';
import { getUserDetails, putUserDetails } from '../../providers/actions/User';

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

function UserDetails({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userDetailsObj, setUserDetailsObj] = useState(null);
  const [location, setLocation] = useState('');
  const [itemDefect, setItemDefect] = useState('');
  const [defectDetail, setDefectDetail] = useState('');
  const [comment, setComment] = useState('');

  //   const [othersError] = useState('Type Required.');

  const { userDetails, isLoading } = useSelector((state) => ({
    userDetails: state.userReducer.userDetails,
    isLoading: state.userReducer.isLoading,
  }));

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    setUserDetailsObj(UserDetails);
  }, [userDetails]);

  const handleNext = (values) => {
    const {
      name,
      address,
      email,
      phoneNumber,
      developer,
      developerEmail,
      date,
    } = values;

    console.log(
      name,
      address,
      email,
      phoneNumber,
      developer,
      developerEmail,
      date
    );

    dispatch(putUserDetails(values));

    navigation.navigate('DefectDetails');
  };

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
          {/* {isLoading ? (
            <LoadingIndicator />
          ) : ( */}
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Formik
                initialValues={{
                  name: userDetailsObj !== null ? userDetailsObj.name : '',
                  address:
                    userDetailsObj !== null ? userDetailsObj.address : '',
                  email: userDetailsObj !== null ? userDetailsObj.email : '',
                  phoneNumber:
                    userDetailsObj !== null ? userDetailsObj.phoneNumber : '',
                  developer:
                    userDetailsObj !== null ? userDetailsObj.developer : '',
                  developerEmail:
                    userDetailsObj !== null
                      ? userDetailsObj.developerEmail
                      : '',
                  date: userDetailsObj !== null ? userDetailsObj.date : '',
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required('Name is required.'),
                  address: Yup.string().required('Address is required.'),
                  email: Yup.string()
                    .email('Please enter a valid email.')
                    .required('Email is required.'),
                  phoneNumber: Yup.string().required(
                    'Phone Number is required.'
                  ),
                  developer: Yup.string().required('Developer is required.'),
                  developerEmail: Yup.string()
                    .email('Please enter a valid email.')
                    .required('Developer Email is required.'),
                  date: Yup.string().required('Date is required.'),
                })}
                onSubmit={(values) => handleNext(values)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                  values,
                  errors,
                  touched,
                  submitCount,
                  setFieldValue,
                  submitForm,
                }) => (
                  <View>
                    <View
                      style={[
                        globalStyles.addResourceFormContainer,
                        globalStyles.mildShadow,
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginVertical: 8,
                        }}
                      >
                        SeDAR
                      </Text>

                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginVertical: 8,
                        }}
                      >
                        Systematic Defect and Reporting App
                      </Text>
                      <RegularTextBox
                        label="Name"
                        placeholderTxt="Enter name"
                        value={values.name}
                        handleChange={handleChange('name')}
                        errorTxt={errors.name}
                        isError={
                          !!((touched.name || submitCount > 0) && errors.name)
                        }
                        handleBlur={handleBlur('name')}
                        keyboardType="default"
                      />

                      <RegularTextBox
                        label="Address"
                        multiline
                        numberOfLines={3}
                        placeholderTxt="Enter address"
                        value={values.address}
                        handleChange={handleChange('address')}
                        errorTxt={errors.address}
                        isError={
                          !!(
                            (touched.address || submitCount > 0) &&
                            errors.address
                          )
                        }
                        handleBlur={handleBlur('address')}
                        keyboardType="default"
                      />

                      <RegularTextBox
                        label="Email"
                        multiline
                        placeholderTxt="Enter email address"
                        value={values.email}
                        handleChange={handleChange('email')}
                        errorTxt={errors.email}
                        isError={
                          !!((touched.email || submitCount > 0) && errors.email)
                        }
                        handleBlur={handleBlur('email')}
                        keyboardType="default"
                      />

                      <RegularTextBox
                        label="Phone Number"
                        multiline
                        placeholderTxt="Enter phone number"
                        value={values.phoneNumber}
                        handleChange={handleChange('phoneNumber')}
                        errorTxt={errors.phoneNumber}
                        isError={
                          !!(
                            (touched.phoneNumber || submitCount > 0) &&
                            errors.phoneNumber
                          )
                        }
                        handleBlur={handleBlur('phoneNumber')}
                        keyboardType="numeric"
                      />

                      <RegularTextBox
                        label="Developer"
                        multiline
                        placeholderTxt="Enter developer"
                        value={values.developer}
                        handleChange={handleChange('developer')}
                        errorTxt={errors.developer}
                        isError={
                          !!(
                            (touched.developer || submitCount > 0) &&
                            errors.developer
                          )
                        }
                        handleBlur={handleBlur('developer')}
                        keyboardType="default"
                      />

                      <RegularTextBox
                        label="Developer Email"
                        multiline
                        placeholderTxt="Enter developer email"
                        value={values.developerEmail}
                        handleChange={handleChange('developerEmail')}
                        errorTxt={errors.developerEmail}
                        isError={
                          !!(
                            (touched.developerEmail || submitCount > 0) &&
                            errors.developerEmail
                          )
                        }
                        handleBlur={handleBlur('developerEmail')}
                        keyboardType="default"
                      />

                      <RegularTextBox
                        label="Date"
                        multiline
                        placeholderTxt="Enter Date"
                        value={values.date}
                        handleChange={handleChange('date')}
                        errorTxt={errors.date}
                        isError={
                          !!((touched.date || submitCount > 0) && errors.date)
                        }
                        handleBlur={handleBlur('date')}
                        keyboardType="numeric"
                      />

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <TouchableOpacity title="SUBMIT" onPress={handleReset}>
                          <Text>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity title="SUBMIT" onPress={handleSubmit}>
                          <Feather name="arrow-right" size={20} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </TouchableWithoutFeedback>
          </ScrollView>
          {/* )} */}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

UserDetails.defaultProps = {
  route: null,
};

UserDetails.propTypes = {
  route: PropTypes.object,
};

export default UserDetails;
