
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; 
import { setFormData, submitSignup, setError } from '../../action/authActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Auth.css'; 


const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  // Add more country codes here
];

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData = {}, loading, error, success } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (error) {
      toast.error(error); 
      dispatch(setError('')); 
    }
  }, [error, dispatch]);

  React.useEffect(() => {
    if (success) {
      toast.success('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); 
        dispatch({ type: 'RESET_SUCCESS' });  // Reset success state after redirection
      }, 2000); 
    }
  }, [success, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData(name, value));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setFormData('image', reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClear = () => {
    dispatch(setFormData('image', ''));
  };

  const handleCountryCodeChange = (e) => {
    dispatch(setFormData('countryCode', e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.mobileno) {
        dispatch(setError('Please fill all required fields'));
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        dispatch(setError('Please enter a valid email address'));
        return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        dispatch(setError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number.'));
        return;
    }

    const fullMobileNumber = `${formData.countryCode || ''}${formData.mobileno || ''}`;

    dispatch(submitSignup({ ...formData, mobileno: fullMobileNumber }));
  };

  return (
    <div>
      <div className='container-page'>
        <div className='container-Auth'>
        <h1>Signup</h1>

          <form onSubmit={handleSubmit} className="space-y-7 Auth">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username || ''}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password || ''}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
                />
              </div>
            </div>

            {/* Country Code and Mobile Number Input */}
            <div>
              <label htmlFor="mobileno" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile no.
              </label>
              <div className="mt-2 flex">
                <select
                  name="countryCode"
                  value={formData.countryCode || ''}
                  onChange={handleCountryCodeChange}
                  className="w-2/4 block rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
                  required
                >
                  <option value="" disabled>Select Country Code</option>
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </option>
                  ))}
                </select>
                <input
                  id="mobileno"
                  name="mobileno"
                  type="text"
                  value={formData.mobileno || ''}
                  onChange={handleChange}
                  required
                  autoComplete="current-mobileno"
                  className="ml-2 w-2/4 block rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
                />
              </div>
            </div>

            {/* Image Input */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Profile Image
              </label>
              <div className="mt-2">
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={handleImageClear}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className='button'>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
