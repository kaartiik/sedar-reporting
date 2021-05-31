/* eslint-disable no-console */
import { Platform } from 'react-native';
import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  select,
  take,
  fork,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { navigate, reset, goBack } from '../services/NavigatorService';
import rsf, { auth, database } from '../../providers/config';
import {
  actions,
  putLoadingStatus,
  putReportedDefect,
  putRunningNumber,
  putSessionID,
  putAllSessionDefects,
} from '../actions/User';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const getSessionIDFromState = (state) => state.userReducer.sessionID;
const getUserFromState = (state) => state.userReducer.userDetails;

const setToken = async (token) => AsyncStorage.setItem('token', token);

const resetToken = async () => AsyncStorage.removeItem('token');

const getToken = async () => AsyncStorage.getItem('token');

function* syncUserSaga() {
  yield put(putLoadingStatus(true));

  const sessionID = yield call(getToken);

  if (sessionID !== '' && sessionID !== null && sessionID !== undefined) {
    yield put(putSessionID(sessionID));
  } else {
    const newSessionID = uuid.v4();
    yield put(putSessionID(newSessionID));
    yield call(setToken, newSessionID);
  }

  setTimeout(() => {
    reset('AppStack');
  }, 100);

  yield put(putLoadingStatus(false));
}

function* getRunningNumberAndNavSaga({ payload }) {
  const onSuccess = payload;
  try {
    const sessionID = yield select(getSessionIDFromState);
    yield put(putLoadingStatus(true));

    const data = yield call(rsf.database.read, `reportedDefects/${sessionID}`);

    const exists = data !== null && data !== undefined;

    if (exists) {
      const reportArr = Object.values(data);

      yield put(putRunningNumber(reportArr.length + 1));
    } else {
      yield put(putRunningNumber(1));
    }

    onSuccess();
    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(error);
  }
}

function* uploadImages(images, key) {
  try {
    const finalImages = {};

    yield all(
      images.map(function* (image) {
        const id = new Date().getTime();
        const response = yield fetch(image.encodedImage);
        const blob = yield response.blob();
        const filePath = `reports/${key}/${id}_${image.fileName}`;

        const task = rsf.storage.uploadFile(filePath, blob);

        task.on('state_changed', (snapshot) => {
          const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
        });

        // Wait for upload to complete
        yield task;

        const imageUrl = yield call(rsf.storage.getDownloadURL, filePath);

        finalImages[id] = {
          image_name: `${id}_${image.fileName}`,
          image_url: imageUrl,
        };
      })
    );

    return finalImages;
  } catch (error) {
    alert(`Failed to upload images. ${error}`);
  }
}

function* addReportedDefectSaga({ payload }) {
  const { values, onSuccess } = payload;
  const {
    picture,
    location,
    itemDefect,
    defectDetail,
    comment,
    runningNumber,
  } = values;
  const sessionID = yield select(getSessionIDFromState);
  const userDetails = yield select(getUserFromState);
  const uniqueId = new Date().getTime();

  try {
    yield put(putLoadingStatus(true));

    const uploadedImages = yield call(uploadImages, picture, uniqueId);

    const reportObj = {
      ...userDetails,
      location,
      itemDefect,
      defectDetail,
      comment,
      runningNumber,
      uploadedImages,
    };

    yield call(
      rsf.database.update,
      `reportedDefects/${sessionID}/${uniqueId}`,
      reportObj
    );

    yield put(putReportedDefect(reportObj));

    onSuccess();

    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(error);
  }
}

function* addReportedDefectFinalSaga({ payload }) {
  const { values, onSuccess } = payload;
  const {
    picture,
    location,
    itemDefect,
    defectDetail,
    comment,
    runningNumber,
  } = values;
  const sessionID = yield select(getSessionIDFromState);
  const userDetails = yield select(getUserFromState);
  const uniqueId = new Date().getTime();

  try {
    yield put(putLoadingStatus(true));

    const uploadedImages = yield call(uploadImages, picture, uniqueId);

    const reportObj = {
      ...userDetails,
      location,
      itemDefect,
      defectDetail,
      comment,
      runningNumber,
      uploadedImages,
    };

    yield call(
      rsf.database.update,
      `reportedDefects/${sessionID}/${uniqueId}`,
      reportObj
    );

    yield put(putReportedDefect(reportObj));

    const allDefectsObj = yield call(
      rsf.database.read,
      `reportedDefects/${sessionID}`
    );

    const allDefectsArr = Object.values(allDefectsObj);
    yield put(putAllSessionDefects(allDefectsArr));

    const newSessionID = uuid.v4();
    yield put(putSessionID(newSessionID));
    yield call(setToken, newSessionID);

    onSuccess();

    yield put(putLoadingStatus(false));
  } catch (error) {
    yield put(putLoadingStatus(false));
    alert(error);
  }
}

export default function* User() {
  yield all([
    takeEvery(actions.SYNC_USER, syncUserSaga),
    takeLatest(actions.ADD.REPORTED_DEFECT, addReportedDefectSaga),
    takeLatest(actions.ADD.REPORTED_DEFECT_FINAL, addReportedDefectFinalSaga),
    takeLatest(actions.GET.RUNNING_NUMBER, getRunningNumberAndNavSaga),
  ]);
}
