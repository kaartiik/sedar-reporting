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
import { actions, putLoadingStatus } from '../actions/User';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// const getUuidFromState = (state) => state.userReducer.uuid;
// const getNameFromState = (state) => state.userReducer.name;

function* syncUserSaga() {
  yield put(putLoadingStatus(true));
  // const user = yield call(onAuthStateChanged);

  // if (user) {
  //   const { dbUser } = yield call(getUserProfile, user.uid);

  //   console.log(dbUser);

  //   if (dbUser !== null && dbUser !== undefined) {
  //     yield put(putUserProfile(dbUser));

  //     yield put(putLoadingStatus(false));

  //     setTimeout(() => {
  //       reset('AppStack');
  //     }, 100);
  //   }
  // } else {
  //   yield put(putLoadingStatus(false));

  //   setTimeout(() => {
  //     reset('AuthStack');
  //   }, 100);
  // }

  setTimeout(() => {
    reset('AppStack');
  }, 100);

  yield put(putLoadingStatus(false));
}

export default function* User() {
  yield all([takeEvery(actions.SYNC_USER, syncUserSaga)]);
}
