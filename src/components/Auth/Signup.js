import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFormData, submitSignup, setError } from '../../action/authActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify CSS
import './Auth.css'; // Ensure this import is correct

const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  // Add more country codes here
];

export default function Signup() {
  const dispatch = useDispatch();
  const { formData = {}, loading, error } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (error) {
      toast.error(error); // Show toast error message
      dispatch(setError('')); // Clear error from state
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData(name, value));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setFormData('image', reader.result)); // Save the Base64 string
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleImageClear = () => {
    dispatch(setFormData('image', '')); // Clear the image field
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

    // Combine country code and mobile number
    const fullMobileNumber = `${formData.countryCode || ''}${formData.mobileno || ''}`;

    // Dispatch the signup action with combined mobile number
    dispatch(submitSignup({ ...formData, mobileno: fullMobileNumber }));
  };

  return (
    <div>
      <div className='container-page'>
        <div className='container-Auth'>
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
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
                  className="Auth w-2/4 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
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
                  className="Auth w-2/4 ml-2 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Image
              </label>
              <div className="mt-2 relative"> {/* Make this container relative */}
                <input
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />
                {formData.image && (
                  <div className="mt-2 relative">
                    <img src={formData.image} alt="Preview" className="w-full h-auto rounded-md" />
                    <button 
                      type="button"
                      onClick={handleImageClear}
                      className="absolute top-2 right-2 p-1 bg-gray-300 rounded-full"
                    >
                      <span className="text-gray-700 text-lg">✕</span>
                    </button>
                  </div>
                )}
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

            {/* Link to Login Page */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
