export const actions = {
  GET: {
    USER_DETAILS: 'GET_USER_DETAILS',
    DEFECT_DETAILS: 'GET_DEFECT_DETAILS',
  },
  PUT: {
    USER_DETAILS: 'PUT_USER_DETAILS',
    DEFECT_DETAILS: 'PUT_DEFECT_DETAILS',
  },
  SYNC_USER: 'SYNC_USER',
};

export const syncUser = () => ({
  type: actions.SYNC_USER,
});

export const getUserDetails = () => ({
  type: actions.GET.USER_DETAILS,
});

export const getDefectDetails = () => ({
  type: actions.GET.DEFECT_DETAILS,
});

export const putUserDetails = (values) => ({
  type: actions.PUT.USER_DETAILS,
  payload: values,
});

export const putDefectDetails = (values) => ({
  type: actions.PUT.DEFECT_DETAILS,
  payload: values,
});

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  isLoading,
});
