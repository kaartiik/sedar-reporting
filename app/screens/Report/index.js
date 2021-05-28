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

function Report({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [location, setLocation] = useState('');
  const [itemDefect, setItemDefect] = useState('');
  const [defectDetail, setDefectDetail] = useState('');
  const [comment, setComment] = useState('');

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
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <ScrollView>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Formik
                  initialValues={{
                    location: Yup.string().required('Location is required.'),
                    itemDefect: Yup.string().required(
                      'Item Defect is required.'
                    ),
                    defectDetail: Yup.string().required(
                      'Defect Detail is required.'
                    ),
                    comment: Yup.string(),
                  }}
                  validationSchema={Yup.object().shape({
                    manPowerList: Yup.array().of(
                      Yup.object().shape({
                        location: Yup.string().required(
                          'Location is required.'
                        ),
                        itemDefect: Yup.string().required(
                          'Item Defect is required.'
                        ),
                        defectDetail: Yup.string().required(
                          'Defect Detail is required.'
                        ),
                        comment: Yup.string(),
                      })
                    ),
                  })}
                >
                  {({
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    submitCount,
                    setFieldValue,
                    submitForm,
                  }) => (
                    <View>
                      <AppBar
                        screenTitle="Add Manpower"
                        screenSubtext="Add manpower information to the selected site."
                        showAddResource
                        addResource={() => {
                          setFieldValue('manPowerList', [
                            addManpowerForm(),
                            ...values.manPowerList,
                          ]);

                          initialDuplicateSubcategory(
                            values.manPowerList,
                            manpowerSubcategoryList[
                              manpowerCategoryList[0].value
                            ][0].value
                          );
                        }}
                        showBack
                        navBack={() => navigation.goBack()}
                      />
                      <View
                        style={[
                          globalStyles.addResourceFormContainer,
                          globalStyles.mildShadow,
                        ]}
                      >
                        {values.manPowerList.map((mp, index) => {
                          const mainCgyId = `manPowerList[${index}].mainCgyId`;
                          const categoryTouched = getIn(touched, mainCgyId);
                          const categoryError = getIn(errors, mainCgyId);

                          const subCgyId = `manPowerList[${index}].subCgyId`;
                          const typeTouched = getIn(touched, subCgyId);
                          const typeError = getIn(errors, subCgyId);

                          const subCategoryOthers = `manPowerList[${index}].subCategoryOthers`;
                          const subCategoryOthersTouched = getIn(
                            touched,
                            subCategoryOthers
                          );

                          const quantity = `manPowerList[${index}].quantity`;
                          const quantityTouched = getIn(touched, quantity);
                          const quantityError = getIn(errors, quantity);
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <View key={index} style={{ margin: 8 }}>
                              <View style={{ margin: 8 }}>
                                <View
                                  style={
                                    globalStyles.addResourceCategoryLabelContainer
                                  }
                                >
                                  <Label style={{ fontSize: 14 }}>
                                    Category
                                  </Label>

                                  {index !== 0 && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        const newManpowerForms =
                                          removeManpowerForm(values, index);
                                        setFieldValue(
                                          'manPowerList',
                                          newManpowerForms
                                        );
                                        if (mp.uuId !== '') {
                                          dispatch(deleteManpower(mp.uuId));
                                        }
                                      }}
                                    >
                                      <Text
                                        style={{ color: colours.redDelete }}
                                      >
                                        Remove
                                      </Text>
                                    </TouchableOpacity>
                                  )}
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
                                    selectedValue={mp.mainCgyId}
                                    onValueChange={(value) => {
                                      setFieldValue(mainCgyId, value);
                                      setFieldValue(
                                        subCgyId,
                                        manpowerSubcategoryList[value][0].value
                                      );
                                    }}
                                    style={styles.pickerContainer}
                                    errorTxt={categoryError}
                                    isError={
                                      !!(
                                        (categoryTouched || submitCount > 0) &&
                                        categoryError
                                      )
                                    }
                                  >
                                    {manpowerCategoryList.map((item) => (
                                      <Picker.Item
                                        key={item.value}
                                        label={item.label}
                                        value={item.value}
                                      />
                                    ))}
                                  </Picker>
                                </View>
                              </View>

                              {isTextBox(mp.mainCgyId, mp.subCgyId) ? (
                                <View style={{ margin: 8 }}>
                                  <Label style={{ fontSize: 14 }}>Type</Label>

                                  <Item
                                    error={
                                      !!(
                                        (subCategoryOthersTouched ||
                                          submitCount > 0) &&
                                        mp.subCategoryOthers === '' &&
                                        isTextBox(mp.mainCgyId, mp.subCgyId)
                                      )
                                    }
                                    regular
                                    style={{
                                      marginTop: 10,
                                      marginBottom: 5,
                                      backgroundColor: 'white',
                                      height: 38,
                                    }}
                                  >
                                    <Input
                                      multiline
                                      style={{ fontSize: 15 }}
                                      label="Type"
                                      placeholder="Enter Type"
                                      value={mp.subCategoryOthers}
                                      onChangeText={handleChange(
                                        subCategoryOthers
                                      )}
                                    />
                                    <TouchableOpacity
                                      style={{
                                        backgroundColor: colours.redDeleteIcon,
                                        padding: 5,
                                        paddingHorizontal: 10,
                                        height: '100%',
                                        justifyContent: 'center',
                                      }}
                                      onPress={() =>
                                        revertToPicker(
                                          setFieldValue,
                                          mp.mainCgyId,
                                          subCgyId,
                                          subCategoryOthers
                                        )
                                      }
                                    >
                                      <Feather
                                        name="x"
                                        size={18}
                                        color="white"
                                      />
                                    </TouchableOpacity>
                                  </Item>
                                  {!!(
                                    (subCategoryOthersTouched ||
                                      submitCount > 0) &&
                                    mp.subCategoryOthers === '' &&
                                    isTextBox(mp.mainCgyId, mp.subCgyId)
                                  ) && (
                                    <Text
                                      style={{
                                        color: colours.errorText,
                                        fontSize: 12,
                                      }}
                                    >
                                      {othersError}
                                    </Text>
                                  )}
                                </View>
                              ) : (
                                <View style={{ margin: 8 }}>
                                  <Label style={{ fontSize: 14 }}>Type</Label>

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
                                      selectedValue={mp.subCgyId}
                                      onValueChange={(value) => {
                                        duplicateSubcategory(
                                          values.manPowerList,
                                          setFieldValue,
                                          subCgyId,
                                          value
                                        );
                                      }}
                                      style={styles.pickerContainer}
                                      errorTxt={typeError}
                                      isError={
                                        !!(
                                          (typeTouched || submitCount > 0) &&
                                          typeError
                                        )
                                      }
                                    >
                                      {manpowerSubcategoryList[
                                        mp.mainCgyId
                                      ].map((item) => (
                                        <Picker.Item
                                          key={item.value}
                                          label={item.label}
                                          value={item.value}
                                        />
                                      ))}
                                    </Picker>
                                  </View>
                                </View>
                              )}

                              <View style={{ margin: 8 }}>
                                <RegularTextBox
                                  label="Total Quantity"
                                  placeholderTxt="Enter total quantity"
                                  value={mp.quantity.toString()}
                                  handleChange={(text) => {
                                    if (
                                      text.indexOf('.') === -1 &&
                                      text.indexOf('-') === -1 &&
                                      text.indexOf(',') === -1 &&
                                      text.indexOf(' ') === -1
                                    ) {
                                      setFieldValue(quantity, text);
                                    }
                                  }}
                                  errorTxt={quantityError}
                                  isError={submitCount > 0 && quantityError}
                                  handleBlur={handleBlur(quantity)}
                                  keyboardType="numeric"
                                />
                              </View>

                              <View style={styles.divider} />
                            </View>
                          );
                        })}

                        <TouchableOpacity
                          title="SUBMIT"
                          style={globalStyles.bigBtn}
                          onPress={() => {
                            submitForm();
                            errorCheck(values, errors, () =>
                              navigation.navigate('Resources')
                            );
                          }}
                        >
                          <Text style={globalStyles.btnText}>{`Save  `}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          title="SUBMIT"
                          style={globalStyles.bigBtn2}
                          onPress={() => {
                            submitForm();
                            errorCheck(values, errors, () =>
                              navigation.navigate('Resources', {
                                activeIndex: 1,
                              })
                            );
                          }}
                        >
                          <Text style={globalStyles.btnText}>
                            {`Save & Continue  `}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </Formik>
              </TouchableWithoutFeedback>
            </ScrollView>
          )}
        </View>
      </ImageBackground>
      <CustomAlert />
    </KeyboardAvoidingView>
  );
}

Report.defaultProps = {
  route: null,
};

Report.propTypes = {
  route: PropTypes.object,
};

export default Report;
