import { actions } from '../actions/User';

const initialState = {
  name: '',
  location: null,
  email: '',
  mobile: '',
  age: '',
  uuid: '',
  //profilePicture: null,
  //token: '',
  userChats: [],
  allChats: null,
  isLoading: false,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.USER_PROFILE: {
      const {
        uuid,
        name,
        email,
        age,
        mobile,
        //profile_picture,
        //location,
        //token,
      } = action.payload;
      return {
        ...state,
        uuid,
        name,
        email,
        age,
        mobile,
        //location,
        //token,
      };
    }

    case actions.PUT.LOADING_STATUS:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
}
