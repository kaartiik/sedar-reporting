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
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { navigate, reset, goBack } from '../services/NavigatorService';
import rsf, { auth, database } from '../../providers/config';
import {
  actions,
  putLoadingStatus,
  putReportedDefect,
  putRunningNumber,
} from '../actions/User';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// const getUuidFromState = (state) => state.userReducer.uuid;
const getUserFromState = (state) => state.userReducer.userDetails;

function* syncUserSaga() {
  yield put(putLoadingStatus(true));

  setTimeout(() => {
    reset('AppStack');
  }, 100);

  yield put(putLoadingStatus(false));
}
function* getRunningNumberAndNavSaga({ payload }) {
  const onSuccess = payload;
  try {
    yield put(putLoadingStatus(true));

    const data = yield call(rsf.database.read, `reportedDefects`);

    const exists = data !== null && data !== undefined;

    if (exists) {
      const reportArr = Object.values(data);
      yield put(putRunningNumber(reportArr.length + 1));
    } else {
      yield put(putRunningNumber(1));
    }

    onSuccess();
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

function* addReportedDefect({ payload }) {
  const { values, onSuccess } = payload;
  const { picture, location, itemDefect, defectDetail, comment } = values;
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
      uploadedImages,
    };

    yield call(rsf.database.update, `reportedDefects/${uniqueId}`, reportObj);

    console.log(Object.values(uploadedImages)[0]);

    yield put(putReportedDefect(reportObj));

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
    takeLatest(actions.ADD.REPORTED_DEFECT, addReportedDefect),
    takeLatest(actions.GET.RUNNING_NUMBER, getRunningNumberAndNavSaga),
  ]);
}
