// Action Types
export const SET_FORM_DATA = 'SET_FORM_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_USER_DATA = 'SET_USER_DATA';

const Api = "http://localhost:4000";
// const Api = "https://imdb-netflix-backend.onrender.com";

// Action Creators
export const setFormData = (field, value) => ({
  type: SET_FORM_DATA,
  payload: { field, value },
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,

});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});


export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const submitLogin = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`${Api}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(loginSuccess(data));
    } else {
      dispatch(setError(data.message || 'Failed to log in'));
    }
  } catch (error) {
    dispatch(setError('Failed to log in'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const submitSignup = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`${Api}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      dispatch(signupSuccess());
      dispatch(setEmail(formData.email)); // Set the email after successful signup if needed
    } else {
      const data = await response.json();
      dispatch(setError(data.message || 'Failed to sign up'));
    }
  } catch (error) {
    console.error('Signup error:', error); // Log the error for debugging
    dispatch(setError('Failed to sign up'));
  } finally {
    dispatch(setLoading(false));
  }
};

