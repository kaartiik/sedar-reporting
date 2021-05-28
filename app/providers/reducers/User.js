import { actions } from '../actions/User';

const initialState = {
  userDetails: null,
  defectDetails: null,
  isLoading: false,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case actions.PUT.DEFECT_DETAILS:
      return {
        ...state,
        defectDetails: action.payload,
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
