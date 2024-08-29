import { 
  SET_FORM_DATA, 
  SET_LOADING, 
  SET_ERROR, 
  LOGIN_SUCCESS, 
  SIGNUP_SUCCESS, 
  SET_EMAIL ,
  SET_USER_DATA

} from '../action/authActions.js';

const initialState = {
  formData: {
    username: '',
    email: '',
    password: '',
    image: null,
  },
  loading: false,
  error: '',
  userData: null,
  email: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value instanceof File
            ? new File([action.payload.value], action.payload.value.name, { type: action.payload.value.type })
            : action.payload.value,
        },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: '',
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: '',
        
      };
      case SET_USER_DATA:
        return {
          ...state,
          userData: action.payload,
        };
    default:
      return state;
  }
};

export default authReducer;
