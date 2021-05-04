import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Item, Picker } from 'native-base';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import { updateProduct, deletePerImage } from '../../providers/actions/Product';
import colours from '../../providers/constants/colours';
import AppBar from '../../components/AppBar';

dayjs.extend(customParseFormat);

const styles = StyleSheet.create({
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
  componentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  regBtn: {
    margin: 10,
    width: 170,
    backgroundColor: colours.themeSecondary,
    borderRadius: 20,
    padding: 10,
  },
  postBtn: {
    margin: 10,
    width: 170,
    backgroundColor: colours.themePrimary,
    borderRadius: 20,
    padding: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
  pickerContainer: { width: '95%', alignSelf: 'center' },
});

const productCategories = [
  { label: 'Select', value: '' },
  { label: 'Books & Stationeries', value: 'c1' },
  { label: 'Clothes & Accessories', value: 'c2' },
  { label: 'Food', value: 'c3' },
  { label: 'Furniture', value: 'c4' },
  { label: 'Home & Living', value: 'c5' },
  { label: 'Kitchenware', value: 'c6' },
  { label: 'Toiletries', value: 'c7' },
  { label: 'Vehicles & Accessories ', value: 'c8' },
  { label: 'Others', value: 'c9' },
];

export default function EditProduct({ route, navigation }) {
  const dispatch = useDispatch();

  const [productUid, setProductUid] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sellType, setSellType] = useState('');
  const [productImages, setProductImages] = useState([]);

  const [meetUpLocation, setMeetUpLocation] = useState('');

  const [submitCount, setSubmitCount] = useState(0);

  const fieldRefName = useRef();
  const fieldRefDescr = useRef();
  const fieldRefPrice = useRef();
  const fieldRefMeetUpLocation = useRef();

  const { uuid, sellerInfo, currentProduct, isLoading } = useSelector(
    (state) => ({
      uuid: state.userReducer.uuid,
      sellerInfo: state.productReducer.sellerInfo,
      currentProduct: state.productReducer.currentProduct,
      isLoading: state.productReducer.isLoading,
    })
  );

  useEffect(() => {
    setProductUid(currentProduct.productUid);
    setProductName(currentProduct.productName);
    setCategory(currentProduct.category);
    setDescription(currentProduct.description);
    setPrice(currentProduct.price);
    setSellType(currentProduct.sellType);
    setProductImages(currentProduct.productImages);
    setMeetUpLocation(currentProduct.meetUpLocation);
  }, [currentProduct]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearText();
      };
    }, [])
  );

  const clearText = () => {
    fieldRefName.current.clear();
    fieldRefDescr.current.clear();
    fieldRefMeetUpLocation.current.clear();
    setProductImages([]);
    setProductName('');
    setCategory('');
    setDescription('');
    setPrice('');
    setSellType('');
    setMeetUpLocation('');
    setSubmitCount(0);
  };

  const findNewImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setProductImages((existingImg) => [
        ...existingImg,
        {
          imageUri: result.uri,
          imageName: result.uri.substring(result.uri.lastIndexOf('/') + 1),
        },
      ]);
    }
  };

  const validatePost = () => {
    setSubmitCount(submitCount + 1);
    if (
      productImages.length > 0 &&
      sellType === 'Sell' &&
      category !== '' &&
      productName !== '' &&
      description !== '' &&
      price !== '' &&
      meetUpLocation !== ''
    ) {
      dispatch(
        updateProduct(
          productUid,
          productName,
          category,
          description,
          price,
          sellType,
          productImages,
          meetUpLocation,
          () => navigation.goBack()
        )
      );
    }
    if (
      productImages.length > 0 &&
      sellType === 'Donate' &&
      category !== '' &&
      productName !== '' &&
      description !== '' &&
      meetUpLocation !== ''
    ) {
      dispatch(
        updateProduct(
          productUid,
          productName,
          category,
          description,
          price,
          sellType,
          productImages,
          meetUpLocation,
          () => navigation.goBack()
        )
      );
    } else {
      alert(`All fields are required.`);
    }
  };

  const handleDeletePerImage = (item) => {
    const newProductImages = productImages.filter(
      (img) => img.imageUri !== item.imageUri
    );

    setProductImages(newProductImages);

    const encodedStr = item.imageUri;
    const isHttps = encodedStr.indexOf('https');
    const isHttp = encodedStr.indexOf('http');

    if (isHttps !== -1 || isHttp !== -1) {
      dispatch(deletePerImage(item, productUid));
    }
  };

  const renderImages = ({ index, item }) => (
    <View>
      <Image
        source={{ uri: item.imageUri }}
        style={{ height: 100, width: 100, borderRadius: 4, margin: 8 }}
      />
      <TouchableOpacity
        style={{ position: 'absolute', right: 5, top: 5 }}
        onPress={() => handleDeletePerImage(item)}
      >
        <Ionicons name="ios-close" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <AppBar />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                  <TouchableOpacity
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 4,
                      margin: 8,
                      backgroundColor: colours.gray,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => findNewImage()}
                  >
                    <Ionicons name="ios-add-circle" size={20} color="black" />
                  </TouchableOpacity>
                )}
                horizontal
                data={productImages}
                renderItem={renderImages}
              />

              <View style={{ margin: 20 }}>
                <View style={styles.pickerOuterContainer}>
                  <Picker
                    style={styles.pickerContainer}
                    selectedValue={category}
                    onValueChange={(value) => setCategory(value)}
                  >
                    {productCategories.map((item, idx) => (
                      <Picker.Item
                        key={idx}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
                <Text style={{ color: 'red' }}>
                  {submitCount > 0 && category === '' && 'Required'}
                </Text>

                <View style={styles.pickerOuterContainer}>
                  <Picker
                    style={styles.pickerContainer}
                    selectedValue={sellType}
                    onValueChange={(value) => setSellType(value)}
                  >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Sell" value="Sell" />
                    <Picker.Item label="Donate" value="Donate" />
                  </Picker>
                </View>
                <Text style={{ color: 'red' }}>
                  {submitCount > 0 && sellType === '' && 'Required'}
                </Text>

                <View style={styles.textboxContainer}>
                  <TextInput
                    ref={fieldRefName}
                    placeholder="Enter product name..."
                    value={productName}
                    onChangeText={(text) => setProductName(text)}
                  />
                </View>
                <Text style={{ color: 'red' }}>
                  {submitCount > 0 && productName === '' && 'Required'}
                </Text>

                <View style={styles.textboxContainer}>
                  <TextInput
                    ref={fieldRefDescr}
                    multiline
                    numberOfLines={10}
                    placeholder="Enter decription..."
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                  />
                </View>
                <Text style={{ color: 'red' }}>
                  {submitCount > 0 && description === '' && 'Required'}
                </Text>

                {sellType === 'Sell' && (
                  <>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        ref={fieldRefPrice}
                        placeholder="Enter price..."
                        keyboardType="numeric"
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {submitCount > 0 &&
                        sellType === 'Sell' &&
                        price === '' &&
                        'Required'}
                    </Text>
                  </>
                )}

                <View style={styles.textboxContainer}>
                  <TextInput
                    ref={fieldRefMeetUpLocation}
                    placeholder="Enter meet up location..."
                    value={meetUpLocation}
                    onChangeText={(text) => setMeetUpLocation(text)}
                  />
                </View>
                <Text style={{ color: 'red' }}>
                  {submitCount > 0 && meetUpLocation === '' && 'Required'}
                </Text>
              </View>

              <View>
                <View style={styles.componentContainer}>
                  <TouchableOpacity
                    onPress={() => validatePost()}
                    style={styles.postBtn}
                  >
                    <Text style={styles.btnText}>
                      {productUid === '' ? 'Add' : 'Update'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

EditProduct.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
