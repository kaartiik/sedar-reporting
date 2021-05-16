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
import { actions, putUserProfile, putLoadingStatus } from '../actions/User';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const getUuidFromState = (state) => state.userReducer.uuid;
const getNameFromState = (state) => state.userReducer.name;

const loginRequest = ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

const logoutRequest = () => auth.signOut();

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

const getUserProfile = (uid) =>
  database
    .ref('users')
    .child(uid)
    .once('value')
    .then((snapshot) => ({ dbUser: snapshot.val() }))
    .catch((error) => ({ error }));

function* syncUserSaga() {
  yield put(putLoadingStatus(true));
  const user = yield call(onAuthStateChanged);

  if (user) {
    const { dbUser } = yield call(getUserProfile, user.uid);

    console.log(dbUser);

    if (dbUser !== null && dbUser !== undefined) {
      yield put(putUserProfile(dbUser));

      yield put(putLoadingStatus(false));

      setTimeout(() => {
        reset('AppStack');
      }, 100);
    }
  } else {
    yield put(putLoadingStatus(false));

    setTimeout(() => {
      reset('AuthStack');
    }, 100);
  }
}

function* loginSaga({ email, password }) {
  try {
    yield put(putLoadingStatus(true));
    yield call(loginRequest, { email, password });
    yield put(putLoadingStatus(false));

    yield call(syncUserSaga);
  } catch (error) {
    alert(error);
    return;
  }
}

function* updateUserLocationSaga({ payload }) {
  try {
    const location = payload;
    const uuid = yield select(getUuidFromState);
    yield call(rsf.database.update, `users/${uuid}/location`, {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  } catch (error) {
    alert(error);
    return;
  }
}

function* registerSaga({ payload }) {
  yield put(putLoadingStatus(true));
  const { username, email, password, age, mobile } = payload;
  try {
    const { user } = yield call(
      rsf.auth.createUserWithEmailAndPassword,
      email,
      password
    );

    yield call(rsf.database.update, `users/${user.uid}`, {
      name: username,
      email,
      age,
      mobile,
      uuid: user.uid,
    });

    yield put(putLoadingStatus(false));

    yield call(syncUserSaga);
  } catch (error) {
    alert(`Failed to register ${error}`);
    return;
  }
}

function* logoutSaga() {
  try {
    yield call(logoutRequest);
  } catch (error) {
    alert('Error!');
    return;
  }
  yield call(syncUserSaga);
}

export default function* User() {
  yield all([
    takeLatest(actions.REGISTER_REQUEST, registerSaga),
    takeLatest(actions.LOGIN.REQUEST, loginSaga),
    takeLatest(actions.LOGOUT.REQUEST, logoutSaga),
    takeEvery(actions.SYNC_USER, syncUserSaga),
    takeEvery(actions.UPDATE.USER_LOCATION, updateUserLocationSaga),
  ]);
}
