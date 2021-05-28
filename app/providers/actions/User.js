export const actions = {
  GET: {
    USER_DETAILS: 'GET_USER_DETAILS',
    DEFECT_DETAILS: 'GET_DEFECT_DETAILS',
    RUNNING_NUMBER: 'GET_RUNNING_NUMBER',
  },
  PUT: {
    USER_DETAILS: 'PUT_USER_DETAILS',
    DEFECT_DETAILS: 'PUT_DEFECT_DETAILS',
    REPORTED_DEFECT: 'PUT_REPORTED_DEFECT',
    RUNNING_NUMBER: 'PUT_RUNNING_NUMBER',
    LOADING_STATUS: 'PUT_LOADING_STATUS',
  },
  ADD: {
    REPORTED_DEFECT: 'ADD_REPORTED_DEFECT',
  },
  SYNC_USER: 'SYNC_USER',
};

export const syncUser = () => ({
  type: actions.SYNC_USER,
});

export const getRunningNumber = (onSuccess) => ({
  type: actions.GET.RUNNING_NUMBER,
  payload: onSuccess,
});

export const putRunningNumber = (number) => ({
  type: actions.PUT.USER_DETAILS,
  payload: number,
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

export const addreportedDefect = (values, onSuccess) => ({
  type: actions.ADD.REPORTED_DEFECT,
  payload: { values, onSuccess },
});

export const putReportedDefect = (values) => ({
  type: actions.PUT.REPORTED_DEFECT,
  payload: values,
});

export const putLoadingStatus = (isLoading) => ({
  type: actions.PUT.LOADING_STATUS,
  isLoading,
});
