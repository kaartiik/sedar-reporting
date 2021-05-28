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
  Image,
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
import LOCATIONS from '../../providers/constants/locations';
import ITEM_DEFECT from '../../providers/constants/itemDefect';
import DEFECT_DETAILS from '../../providers/constants/defectDetail';

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.borderGrey,
    alignSelf: 'center',
  },
  textMargin: {
    marginVertical: 10,
  },
});

function Report({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //   const [othersError] = useState('Type Required.');

  const { reportedDefect, isLoading } = useSelector((state) => ({
    reportedDefect: state.userReducer.reportedDefect,
    isLoading: state.userReducer.isLoading,
  }));

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
              <View
                style={[
                  globalStyles.addResourceFormContainer,
                  globalStyles.mildShadow,
                ]}
              >
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ width: '50%' }}>
                      Name: {reportedDefect.name}
                    </Text>
                    <Text style={{ width: '50%' }}>
                      Email: {reportedDefect.email}
                    </Text>
                  </View>
                  <Text style={styles.textMargin}>
                    Address: {reportedDefect.address}
                  </Text>
                  <Text style={styles.textMargin}>
                    Phone Number: {reportedDefect.phoneNumber}
                  </Text>
                  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={{ width: '50%' }}>
                      Developer: {reportedDefect.developer}
                    </Text>
                    <Text style={{ width: '50%' }}>
                      Developer Email: {reportedDefect.developerEmail}
                    </Text>
                  </View>
                  <Text style={styles.textMargin}>
                    Date: {reportedDefect.date}
                  </Text>
                </View>

                <View>
                  <Image
                    source={{
                      uri: Object.values(reportedDefect.uploadedImages)[0]
                        .image_url,
                    }}
                    style={{
                      height: 350,
                      width: '100%',
                      resizeMode: 'cover',
                      borderRadius: 6,
                    }}
                  />
                  <Text style={styles.textMargin}>
                    Location: {LOCATIONS[reportedDefect.location].label}
                  </Text>
                  <Text style={styles.textMargin}>
                    Item Defect: {ITEM_DEFECT[reportedDefect.itemDefect].label}
                  </Text>
                  <Text style={styles.textMargin}>
                    Defect Details:{' '}
                    {DEFECT_DETAILS[reportedDefect.defectDetail].label}
                  </Text>
                  <Text style={styles.textMargin}>
                    Comment: {reportedDefect.comment}
                  </Text>

                  <Text style={[styles.textMargin, { fontWeight: 'bold' }]}>
                    Report submitted and acknowledged by {reportedDefect.name}
                  </Text>

                  <TouchableOpacity
                    style={{
                      borderWidth: 0.5,
                      borderColor: colours.gray,
                      borderRadius: 6,
                      padding: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('Disclaimer')}
                  >
                    <Text>Finish</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </ImageBackground>
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
