export const actions = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  LOGIN: {
    REQUEST: 'LOGIN_REQUEST',
  },
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  SYNC_USER: 'SYNC_USER',
  LOGOUT: {
    REQUEST: 'LOGOUT_REQUEST',
  },
  PUT: {
    USER_PROFILE: 'PUT_USER_PROFILE',
    LOADING_STATUS: 'PUT_LOADING_STATUS',
  },
  UPDATE: {
    USER_LOCATION: 'UPDATE_USER_LOCATION',
  },
};

export const updateUserProfile = (
  username,
  mobile,
  location,
  profilePicture,
  onSuccess
) => ({
  type: actions.UPDATE.USER_PROFILE,
  payload: { username, mobile, location, profilePicture, onSuccess },
});

export const syncUser = () => ({
  type: actions.SYNC_USER,
});

export const register = (username, email, password, age, mobile) => ({
  type: actions.REGISTER_REQUEST,
  payload: { username, email, password, age, mobile },
});

export const login = ({ email, password }) => ({
  type: actions.LOGIN.REQUEST,
  email,
  password,
});

export const logout = () => ({
  type: actions.LOGOUT.REQUEST,
});

export const updateUserLocation = (location) => ({
  type: actions.UPDATE.USER_LOCATION,
  payload: location,
});

export const putUserProfile = (profile) => ({
  type: actions.PUT.USER_PROFILE,
  payload: profile,
});

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  isLoading,
});
