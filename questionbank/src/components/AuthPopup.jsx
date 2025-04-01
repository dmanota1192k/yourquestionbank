import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, X, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

const AuthPopup = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Add more comprehensive form validation
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Add loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add success message
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Reference to the modal for handling outside clicks
  const modalRef = useRef(null);
  
  // Reference to focus the first field on open
  const firstInputRef = useRef(null);

  // Reset form when popup is closed or mode changes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);
  
  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => firstInputRef.current.focus(), 100);
    }
  }, [isOpen, mode]);
  
  // Reset form and errors
  const resetForm = () => {
    setFormData({ 
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '', 
      confirmPassword: '' 
    });
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSubmitSuccess(false);
  };

  // Function to validate password strength
  const validatePasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const isLongEnough = password.length >= 8;
    
    const issues = [];
    if (!hasUpperCase) issues.push("uppercase letter");
    if (!hasLowerCase) issues.push("lowercase letter");
    if (!hasNumber) issues.push("number");
    if (!hasSpecial) issues.push("special character");
    if (!isLongEnough) issues.push("8+ characters");
    
    return {
      isValid: hasUpperCase && hasLowerCase && hasNumber && hasSpecial && isLongEnough,
      issues
    };
  };

  // Handle form input changes with input validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing in a field with an error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Validate password match in real-time
    if (name === 'confirmPassword' && formData.password !== value) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else if (name === 'confirmPassword' && formData.password === value) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
    
    // Validate password as user types (if it's not empty)
    if (name === 'password' && value) {
      const { isValid, issues } = validatePasswordStrength(value);
      if (!isValid) {
        setErrors(prev => ({ 
          ...prev, 
          password: `Password must include ${issues.join(', ')}` 
        }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
      
      // Also update confirmPassword error if it exists
      if (formData.confirmPassword && formData.confirmPassword !== value) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (formData.confirmPassword && formData.confirmPassword === value) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate form before submission
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { email: '', password: '', confirmPassword: '' };
    
    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      formIsValid = false;
    }
    
    // Validate password
    const { isValid, issues } = validatePasswordStrength(formData.password);
    if (!isValid) {
      newErrors.password = `Password must include ${issues.join(', ')}`;
      formIsValid = false;
    }
    
    // Validate password confirmation (for signup mode)
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      formIsValid = false;
    }
    
    setErrors(newErrors);
    return formIsValid;
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', mode, formData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Close after a delay (in a real app, you'd redirect or show a success state)
      setTimeout(() => {
        onClose();
        resetForm();
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle between login and signup modes
  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    resetForm();
  };
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  // Close on outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-fadeIn overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-1"
          aria-label="Close"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="p-4 sm:p-8">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <h2 id="auth-modal-title" className="text-xl sm:text-2xl font-bold text-gray-800">
              {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {mode === 'login' 
                ? 'Sign in to access your account' 
                : 'Join thousands of students preparing for exams'}
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-4 sm:mb-6 py-2 px-4 bg-green-100 text-green-800 rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base">
                {mode === 'login' ? 'Successfully signed in!' : 'Account created successfully!'}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Name fields - only for signup */}
            {mode === 'signup' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm sm:text-base font-medium mb-2">Full Name</label>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  {/* First Name */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="First name"
                        required
                        ref={firstInputRef}
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  {/* Last Name */}
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Last name"
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm sm:text-base font-medium mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 text-sm sm:text-base border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500`}
                  placeholder="Enter your email"
                  required
                  ref={mode === 'login' ? firstInputRef : null}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm sm:text-base font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2 text-sm sm:text-base border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500`}
                  placeholder={mode === 'login' ? "Enter your password" : "Create a password"}
                  required
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : "password-hint"}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>
                </div>
              </div>
              {errors.password ? (
                <p id="password-error" className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>
              ) : mode === 'signup' && (
                <p id="password-hint" className="mt-1 text-xs sm:text-sm text-gray-500">
                  Password must have at least 8 characters and include uppercase, lowercase, number, and special character
                </p>
              )}
            </div>

            {/* Confirm Password field - only for signup */}
            {mode === 'signup' && (
              <div className="mb-4 sm:mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm sm:text-base font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 text-sm sm:text-base border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500`}
                    placeholder="Confirm your password"
                    required
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-500"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p id="confirm-password-error" className="mt-1 text-xs sm:text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Forgot password - Only for login */}
            {mode === 'login' && (
              <div className="mb-4 sm:mb-6 text-right">
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium focus:outline-none focus:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset functionality would go here');
                  }}
                >
                  Forgot your password?
                </a>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </span>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>

            {/* Mode toggle */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-gray-600 text-xs sm:text-sm">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-1 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Divider and social logins */}
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <div className="text-center text-gray-500 text-xs sm:text-sm mb-4">Or continue with</div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button 
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium text-xs sm:text-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => alert('Google login would be implemented here')}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" 
                  fill="#4285F4" fillRule="evenodd" />
              </svg>
              Google
            </button>
            <button 
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium text-xs sm:text-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => alert('Facebook login would be implemented here')}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" 
                  fill="#1877F2" />
              </svg>
              Facebook
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;