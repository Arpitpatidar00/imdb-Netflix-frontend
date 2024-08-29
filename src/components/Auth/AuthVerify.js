import Cookies from 'js-cookie';

export const AuthVerify = () => {
  const token = Cookies.get('accessToken'); // Get the token from cookies

  if (token) {
    // If the token exists, the user is authenticated
    return true;
  } else {
    // If the token does not exist, the user is not authenticated
    return false;
  }
};