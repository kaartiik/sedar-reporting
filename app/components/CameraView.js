/* eslint-disable no-alert */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import ExpoConstants from 'expo-constants';
import { useSafeArea } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import colours from '../providers/constants/colours';

const RATIO_STRING = '4:3';
const RATIO = 4 / 3;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = SCREEN_WIDTH * RATIO;
const ICON_SIZE = 24;

const FOOTER_MAIN_BUTTON_HEIGHT = 60;
const FOOTER_VERTICAL_PADDING = 28;

const FLASH_MODES = [
  Camera.Constants.FlashMode.off,
  Camera.Constants.FlashMode.on,
  Camera.Constants.FlashMode.auto,
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: colours.black,
    paddingTop: ExpoConstants.statusBarHeight,
  },
  header: {
    flexDirection: 'row',
    height: 50,
  },
  headerButton: {
    height: 48,
    width: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222',
  },
  footerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colours.white,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
  },
  descriptionWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    margin: 15,
    color: colours.white,
    fontFamily: 'SF-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
});

const CameraView = ({ route }) => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const inset = useSafeArea();

  const cameraRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);
  // const [isLoading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(FLASH_MODES[0]);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [snappedPicture, setSnappedPicture] = useState(null);

  const { callback } = route.params;

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setHasPermission(status === 'granted');
      } catch (err) {
        alert(
          'Failed to get camera permission. Allow camera permissions through Settings.'
        );
      }
    })();
  }, []);

  useEffect(() => {
    const estFooterHeight =
      FOOTER_MAIN_BUTTON_HEIGHT + FOOTER_VERTICAL_PADDING * 2 + inset.bottom;

    const absoluteFooterHeight =
      Dimensions.get('window').height -
      ExpoConstants.statusBarHeight -
      50 -
      SCREEN_HEIGHT;

    const height =
      absoluteFooterHeight < estFooterHeight
        ? absoluteFooterHeight
        : estFooterHeight;

    setFooterHeight(height);
  }, []);

  const takePicture = async () => {
    try {
      // setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
      });
      setSnappedPicture(photo);

      // setLoading(false);
    } catch (err) {
      // setLoading(false);
    }
  };

  const switchCameraFlashMode = () => {
    const index = FLASH_MODES.indexOf(flash);
    let newIndex = index + 1;
    if (index === FLASH_MODES.length - 1) {
      newIndex = 0;
    }

    setFlash(FLASH_MODES[newIndex]);
  };

  const switchCameraView = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onPressDismissScreen = () => {
    goBack();
  };

  const onPressBackButton = () => {
    setSnappedPicture(null);
  };

  const onPressDoneButton = () => {
    goBack();
    setTimeout(() => {
      if (callback && callback.onTakenPictureFromCamera) {
        callback.onTakenPictureFromCamera(snappedPicture);
      }
    }, 200);
  };

  const renderFlashIcon = () => {
    switch (flash) {
      case Camera.Constants.FlashMode.off:
        return (
          <MaterialIcons name="flash-off" size={ICON_SIZE} color="white" />
        );

      case Camera.Constants.FlashMode.on:
        return <MaterialIcons name="flash-on" size={ICON_SIZE} color="white" />;

      case Camera.Constants.FlashMode.auto:
        return (
          <MaterialIcons name="flash-auto" size={ICON_SIZE} color="white" />
        );

      default:
        return <View />;
    }
  };

  const renderHeaderButton = () => {
    if (snappedPicture) {
      return (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onPressBackButton}
        >
          <Feather name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onPressDismissScreen}
      >
        <Feather name="x" size={18} color="white" />
      </TouchableOpacity>
    );
  };

  const renderCameraPreview = () => {
    if (snappedPicture) {
      return (
        <Image
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
          source={{ uri: snappedPicture.uri }}
        />
      );
    }

    return (
      <Camera
        ref={cameraRef}
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
        type={type}
        ratio={RATIO_STRING}
        autoFocus={Camera.Constants.AutoFocus.on}
        flashMode={flash}
      />
    );
  };

  const renderFooterButtons = () => {
    if (snappedPicture) {
      return (
        <View style={styles.footerItem}>
          <TouchableOpacity onPress={onPressDoneButton}>
            <Feather name="check" size={ICON_SIZE} color="white" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        <View style={styles.footerItem}>
          <TouchableOpacity onPress={switchCameraFlashMode}>
            {renderFlashIcon()}
          </TouchableOpacity>
        </View>
        <View style={styles.footerItem}>
          <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
            <Feather name="camera" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.footerItem}>
          <TouchableOpacity onPress={switchCameraView}>
            <Ionicons
              name="ios-reverse-camera"
              size={ICON_SIZE}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>{renderHeaderButton()}</View>
      {hasPermission === false && (
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            No access to camera. Please grant this app access to your camera
          </Text>
        </View>
      )}
      {hasPermission && (
        <View style={styles.preview}>
          <View style={{ flexGrow: 1, flexShrink: 1 }} />
          {renderCameraPreview()}
          <View style={{ flexGrow: 5, flexShrink: 1 }} />
        </View>
      )}
      {hasPermission && (
        <TouchableOpacity
          style={[{ height: footerHeight }, styles.footer]}
          disabled={!snappedPicture}
          onPress={onPressDoneButton}
        >
          {renderFooterButtons()}
        </TouchableOpacity>
      )}
    </View>
  );
};

CameraView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default CameraView;
