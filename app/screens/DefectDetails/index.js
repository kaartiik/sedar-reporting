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
  Image,
} from 'react-native';
import { Label, Picker, Item, Input } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import RegularTextBox from '../../components/RegularTextBox';
import LoadingIndicator from '../../components/LoadingIndicator';
import LOCATIONS from '../../providers/constants/locations';
import ITEM_DEFECT from '../../providers/constants/itemDefect';
import DEFECT_DETAILS from '../../providers/constants/defectDetail';

import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';
import dayjs from 'dayjs';

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

function DefectDetails({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [location, setLocation] = useState('');
  const [itemDefect, setItemDefect] = useState('');
  const [defectDetail, setDefectDetail] = useState('');
  const [comment, setComment] = useState('');
  const [picture, setPicture] = useState([]);

  //   const [othersError] = useState('Type Required.');

  //   const {
  //     currentProject,
  //     currentSite,
  //     existingManpower,
  //     manpowerCategoryList,
  //     manpowerSubcategoryList,
  //     isLoading,
  //   } = useSelector((state) => ({
  //     currentProject: state.projectsReducer.currentProject,
  //     currentSite: state.projectsReducer.currentSite,
  //     existingManpower: state.resourcesReducer.existingManpower,
  //     manpowerCategoryList: state.resourcesReducer.manpowerCategoryList,
  //     manpowerSubcategoryList: state.resourcesReducer.manpowerSubcategoryList,
  //     isLoading: state.resourcesReducer.isLoading,
  //   }));

  useEffect(() => {}, []);

  const onSelectPhotos = (res) => {
    if (!res) {
      return;
    }

    res.then((photos) => {
      setPicture([
        {
          encodedImage: photos.uri,
          fileName: photos.filename,
        },
      ]);
    });
  };

  const onTakenPictureFromCamera = (photo) => {
    const id = new Date().getTime();

    const { width, height, uri } = photo;
    const splittedURI = uri.split('/');
    const filename = splittedURI[splittedURI.length - 1];

    const modPhoto = {
      id,
      width,
      height,
      uri,
      filename,
    };

    if (onSelectPhotos) {
      onSelectPhotos(Promise.resolve(modPhoto));
    }
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
                  location: '',
                  itemDefect: '',
                  defectDetail: '',
                  comment: '',
                }}
                validationSchema={Yup.object().shape({
                  location: Yup.string().required('Location is required.'),
                  itemDefect: Yup.string().required('Item Defect is required.'),
                  defectDetail: Yup.string().required(
                    'Defect Detail is required.'
                  ),
                  comment: Yup.string(),
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
                      <Text>{dayjs().format('DD-MM-YYYY')}</Text>

                      {picture.length > 0 ? (
                        <View style={{ marginVertical: 8 }}>
                          <Image
                            source={{ uri: picture[0].encodedImage }}
                            style={{
                              height: 200,
                              width: '100%',
                              resizeMode: 'cover',
                              borderRadius: 6,
                            }}
                          />

                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 5,
                              right: 5,
                              padding: 5,
                              backgroundColor: 'red',
                              borderRadius: 6,
                            }}
                            onPress={() => setPicture([])}
                          >
                            <Feather name="x" size={20} color={colours.white} />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('CameraView', {
                              callback: {
                                onTakenPictureFromCamera,
                              },
                            })
                          }
                          style={{
                            backgroundColor: colours.gray,
                            marginVertical: 8,
                            padding: 15,
                            borderRadius: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '49%',
                            alignSelf: 'center',
                          }}
                        >
                          <Feather
                            name="camera"
                            size={50}
                            color={colours.white}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: colours.white,
                            }}
                          >
                            {`Capture Image  `}
                          </Text>
                        </TouchableOpacity>
                      )}

                      <View
                        style={[
                          globalStyles.textBoxContainer,
                          globalStyles.androidPickerContainer,
                        ]}
                      >
                        <Picker
                          placeholder="Select"
                          placeholderStyle={{ color: 'black' }}
                          textStyle={{ color: 'black' }}
                          iosIcon={
                            <Feather
                              name="chevron-down"
                              size={18}
                              color="black"
                            />
                          }
                          selectedValue={values.location}
                          onValueChange={(value) => {
                            setFieldValue('location', value);
                          }}
                          style={styles.pickerContainer}
                          errorTxt={errors.location}
                          isError={
                            !!(
                              (touched.location || submitCount > 0) &&
                              errors.location
                            )
                          }
                        >
                          {LOCATIONS.map((item) => (
                            <Picker.Item
                              key={item.value}
                              label={item.label}
                              value={item.value}
                            />
                          ))}
                        </Picker>
                      </View>

                      <View
                        style={[
                          globalStyles.textBoxContainer,
                          globalStyles.androidPickerContainer,
                        ]}
                      >
                        <Picker
                          placeholder="Select"
                          placeholderStyle={{ color: 'black' }}
                          textStyle={{ color: 'black' }}
                          iosIcon={
                            <Feather
                              name="chevron-down"
                              size={18}
                              color="black"
                            />
                          }
                          selectedValue={values.itemDefect}
                          onValueChange={(value) => {
                            setFieldValue('itemDefect', value);
                          }}
                          style={styles.pickerContainer}
                          errorTxt={errors.itemDefect}
                          isError={
                            !!(
                              (touched.itemDefect || submitCount > 0) &&
                              errors.itemDefect
                            )
                          }
                        >
                          {ITEM_DEFECT.map((item) => (
                            <Picker.Item
                              key={item.value}
                              label={item.label}
                              value={item.value}
                            />
                          ))}
                        </Picker>
                      </View>

                      <View
                        style={[
                          globalStyles.textBoxContainer,
                          globalStyles.androidPickerContainer,
                        ]}
                      >
                        <Picker
                          placeholder="Select"
                          placeholderStyle={{ color: 'black' }}
                          textStyle={{ color: 'black' }}
                          iosIcon={
                            <Feather
                              name="chevron-down"
                              size={18}
                              color="black"
                            />
                          }
                          selectedValue={values.defectDetail}
                          onValueChange={(value) => {
                            setFieldValue('defectDetail', value);
                          }}
                          style={styles.pickerContainer}
                          errorTxt={errors.defectDetail}
                          isError={
                            !!(
                              (touched.defectDetail || submitCount > 0) &&
                              errors.defectDetail
                            )
                          }
                        >
                          {DEFECT_DETAILS.map((item) => (
                            <Picker.Item
                              key={item.value}
                              label={item.label}
                              value={item.value}
                            />
                          ))}
                        </Picker>
                      </View>

                      <RegularTextBox
                        label="Comment"
                        multiline
                        numberOfLines={3}
                        placeholderTxt="Enter comment"
                        value={values.comment}
                        handleChange={handleChange('comment')}
                        errorTxt={errors.comment}
                        isError={
                          (touched.comment || submitCount > 0) && errors.comment
                        }
                        handleBlur={handleBlur('comment')}
                        keyboardType="default"
                      />

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <TouchableOpacity title="SUBMIT" onPress={handleSubmit}>
                          <Feather name="arrow-left" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity title="SUBMIT" onPress={handleReset}>
                          <Text>Finish</Text>
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

DefectDetails.defaultProps = {
  route: null,
};

DefectDetails.propTypes = {
  route: PropTypes.object,
};

export default DefectDetails;
