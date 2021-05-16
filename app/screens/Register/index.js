import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../providers/actions/User';
import LoadingIndicator from '../../components/LoadingIndicator';
import colours from '../../providers/constants/colours';

// import { AuthContext } from '../navigation/AuthProvider';\

const IMAGE_DIMENSION = 50;

const styles = StyleSheet.create({
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  bigBtn: {
    marginVertical: 5,
    marginHorizontal: 30,
    backgroundColor: colours.themePrimary,
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textboxContainer: {
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    padding: 5,
    marginVertical: 5,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Required'),
  mobile: yup.string().required('Required'),
  email: yup.string().required('Required').email('Please enter a valid email'),
  password: yup.string().required('Required').min(6, 'Minimum 6 characters'),
  age: yup.string().required('Required'),
  //location: yup.string().required('Required'),
});

export default function Register({ navigation }) {
  LayoutAnimation.easeInEaseOut();
  const dispatch = useDispatch();
  const [userImage, setUserImage] = useState(null);

  const { isLoading } = useSelector((state) => ({
    isLoading: state.userReducer.isLoading,
  }));

  // const handleLogin = ({ location, username, mobile, email, password }) => {
  //   dispatch(register(location, username, mobile, email, password, userImage));
  // };

  const handleLogin = ({ username, email, password, age, mobile }) => {
    dispatch(register(username, email, password, age, mobile));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  //location: '',
                  username: '',
                  mobile: '',
                  email: '',
                  password: '',
                  age: '',
                }}
                onSubmit={(values) => handleLogin(values)}
                validationSchema={validationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  touched,
                  values,
                  submitCount,
                  errors,
                }) => {
                  return (
                    <View style={{ padding: 10 }}>
                      <Text style={styles.greeting}>
                        {'Hello there.\nRegister an account.'}
                      </Text>

                      <View style={styles.textboxContainer}>
                        <TextInput
                          placeholder="Enter email..."
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                        />
                      </View>
                      <Text style={{ color: 'red' }}>
                        {(touched.email || submitCount > 0) && errors.email}
                      </Text>

                      <View style={styles.textboxContainer}>
                        <TextInput
                          secureTextEntry
                          placeholder="Enter password..."
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                        />
                      </View>
                      <Text style={{ color: 'red' }}>
                        {(touched.password || submitCount > 0) &&
                          errors.password}
                      </Text>

                      <View style={styles.textboxContainer}>
                        <TextInput
                          placeholder="Enter username..."
                          value={values.username}
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                        />
                      </View>
                      <Text style={{ color: 'red' }}>
                        {(touched.username || submitCount > 0) &&
                          errors.username}
                      </Text>

                      <View style={styles.textboxContainer}>
                        <TextInput
                          placeholder="Enter age..."
                          value={values.age}
                          onChangeText={handleChange('age')}
                          onBlur={handleBlur('age')}
                        />
                      </View>
                      <Text style={{ color: 'red' }}>
                        {(touched.username || submitCount > 0) &&
                          errors.username}
                      </Text>

                      <View style={styles.textboxContainer}>
                        <TextInput
                          placeholder="Enter mobile number..."
                          value={values.mobile}
                          onChangeText={handleChange('mobile')}
                          onBlur={handleBlur('mobile')}
                        />
                      </View>
                      <Text style={{ color: 'red' }}>
                        {(touched.mobile || submitCount > 0) && errors.mobile}
                      </Text>

                      {/* <View style={styles.textboxContainer}>
                        <TextInput
                          placeholder="Enter location..."
                          value={values.location}
                          onChangeText={handleChange('location')}
                          onBlur={handleBlur('location')}
                        />
                      </View>
                      <Text style={{ color: 'red' }}>
                        {(touched.location || submitCount > 0) &&
                          errors.location}
                      </Text>

                      <TouchableOpacity
                        style={styles.bigBtn}
                        onPress={() =>
                          getLocationAsync(setFieldValue, 'location')
                        }
                      >
                        <Text style={{ color: 'white' }}>Detect Location</Text>
                      </TouchableOpacity> */}

                      <TouchableOpacity
                        style={styles.bigBtn}
                        onPress={handleSubmit}
                        title="SUBMIT"
                      >
                        <Text style={{ color: 'white' }}>Register</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => navigation.goBack()}
                      >
                        <Text style={{ color: 'blue' }}>
                          Aready have an account? Sign in here.
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
