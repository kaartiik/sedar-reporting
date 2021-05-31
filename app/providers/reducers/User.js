import { actions } from '../actions/User';

const initialState = {
  userDetails: null,
  defectDetails: null,
  reportedDefect: null,
  runningNumber: 0,
  sessionID: '',
  defects: [],
  isLoading: false,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.RUNNING_NUMBER:
      return {
        ...state,
        runningNumber: action.payload,
      };
    case actions.PUT.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case actions.PUT.SESSION_ID:
      return {
        ...state,
        sessionID: action.payload,
      };

    case actions.PUT.ALL_SESSION_DEFECTS:
      return {
        ...state,
        defects: action.payload,
      };

    case actions.PUT.DEFECT_DETAILS:
      return {
        ...state,
        defectDetails: action.payload,
      };

    case actions.PUT.REPORTED_DEFECT:
      return {
        ...state,
        reportedDefect: action.payload,
      };

    case actions.PUT.LOADING_STATUS:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
}
