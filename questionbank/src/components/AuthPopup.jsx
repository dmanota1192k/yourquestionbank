import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, X, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const AuthPopup = ({ isOpen, onClose, initialMode = 'login', onAuthenticated }) => {
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
    verificationCode: '',
  });
  
  // Add loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add success message
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Add email verification state
  const [verificationState, setVerificationState] = useState({
    isVerifying: false,
    verificationCode: '',
    verificationSent: false,
    verificationComplete: false,
    remainingAttempts: 3,
    resendDisabled: false,
    resendCountdown: 0,
  });
  
  // Reference to the modal for handling outside clicks
  const modalRef = useRef(null);
  
  // Reference to focus the first field on open
  const firstInputRef = useRef(null);
  
  // Reference for verification code input
  const verificationCodeRef = useRef(null);

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
  
  // Focus verification code input when verification mode is activated
  useEffect(() => {
    if (verificationState.isVerifying && verificationCodeRef.current) {
      setTimeout(() => verificationCodeRef.current.focus(), 100);
    }
  }, [verificationState.isVerifying]);
  
// Countdown timer for resend code button
useEffect(() => {
  let timer;
  if (verificationState.resendCountdown > 0) {
    timer = setTimeout(() => {
      setVerificationState(prev => ({
        ...prev,
        resendCountdown: prev.resendCountdown - 1,
        resendDisabled: prev.resendCountdown > 1
      }));
    }, 1000);
  } else if (verificationState.resendDisabled) {
    setVerificationState(prev => ({ ...prev, resendDisabled: false }));
  }
  
  return () => clearTimeout(timer);
}, [verificationState.resendCountdown, verificationState.resendDisabled]);
  
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
      verificationCode: '',
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSubmitSuccess(false);
    setVerificationState({
      isVerifying: false,
      verificationCode: '',
      verificationSent: false,
      verificationComplete: false,
      remainingAttempts: 3,
      resendDisabled: false,
      resendCountdown: 0,
    });
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
    
    // Handle verification code separately
    if (name === 'verificationCode') {
      // Only allow numbers and limit to 6 digits
      const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 6);
      setVerificationState(prev => ({ 
        ...prev, 
        verificationCode: sanitizedValue,
      }));
      
      // Clear verification code error if user is typing
      if (errors.verificationCode) {
        setErrors(prev => ({ ...prev, verificationCode: '' }));
      }
      return;
    }
    
    // Handle other form fields
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
    const newErrors = { email: '', password: '', confirmPassword: '', verificationCode: '' };
    
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

  // Validate verification code
  const validateVerificationCode = () => {
    if (!verificationState.verificationCode || verificationState.verificationCode.length !== 6) {
      setErrors(prev => ({ ...prev, verificationCode: 'Please enter the 6-digit verification code' }));
      return false;
    }
    return true;
  };

  // Handle form submission with verification flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If in verification mode, verify the code
    if (verificationState.isVerifying) {
      await handleVerifyCode();
      return;
    }
    
    // Otherwise proceed with normal form validation
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate sending verification code
      await sendVerificationCode();
      
      // Switch to verification mode
      setVerificationState(prev => ({
        ...prev,
        isVerifying: true,
        verificationSent: true
      }));
      
    } catch (error) {
      console.error('Error initiating authentication:', error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send verification code to email
  const sendVerificationCode = async () => {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would send an actual email with a verification code
    console.log(`Verification code sent to ${formData.email}`);
    
    // Set resend timer
    setVerificationState(prev => ({
      ...prev,
      resendDisabled: true,
      resendCountdown: 30
    }));
    
    // For demo purposes, log the "code" to console
    console.log("Demo verification code: 123456");
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (verificationState.resendDisabled) return;
    
    setIsSubmitting(true);
    try {
      await sendVerificationCode();
    } catch (error) {
      console.error('Error resending verification code:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verify the submitted code
  const handleVerifyCode = async () => {
    if (!validateVerificationCode()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate against a real code
      // For demo purposes, any 6-digit code works except "000000"
      const isValid = verificationState.verificationCode !== "000000";
      
      if (isValid) {
        // Success case - code is valid
        setVerificationState(prev => ({
          ...prev,
          verificationComplete: true
        }));
        
        setSubmitSuccess(true);
        
        // Simulate successful authentication and redirect
        setTimeout(() => {
          // Call the onAuthenticated callback to redirect to the application
          if (onAuthenticated) {
            onAuthenticated({
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              // In a real app, you would receive a token and user info from your API
              token: "sample-auth-token",
              userId: "user-123456"
            });
          }
          
          onClose();
          resetForm();
        }, 1500);
        
      } else {
        // Error case - invalid code
        setErrors(prev => ({ ...prev, verificationCode: 'Invalid verification code' }));
        
        // Decrement remaining attempts
        setVerificationState(prev => {
          const remainingAttempts = prev.remainingAttempts - 1;
          
          // If no attempts left, go back to form
          if (remainingAttempts <= 0) {
            return {
              ...prev,
              isVerifying: false,
              remainingAttempts: 3
            };
          }
          
          return {
            ...prev,
            remainingAttempts
          };
        });
      }
      
    } catch (error) {
      console.error('Error verifying code:', error);
      setErrors(prev => ({ ...prev, verificationCode: 'Error verifying code. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Go back to form from verification screen
  const handleBackToForm = () => {
    setVerificationState(prev => ({
      ...prev,
      isVerifying: false,
      verificationCode: ''
    }));
    setErrors(prev => ({ ...prev, verificationCode: '' }));
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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity overflow-y-auto"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-fadeIn my-4 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - moved outside of scrollable content to always be visible */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-1 z-10 bg-white bg-opacity-75"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 pt-8">
          {/* Header - made more compact */}
          <div className="text-center mb-3">
            <h2 id="auth-modal-title" className="text-xl font-bold text-gray-800">
              {verificationState.isVerifying 
                ? 'Verify Your Email' 
                : mode === 'login' 
                  ? 'Welcome Back!' 
                  : 'Create an Account'}
            </h2>
            <p className="text-sm text-gray-600">
              {verificationState.isVerifying 
                ? `We sent a code to ${formData.email}` 
                : mode === 'login' 
                  ? 'Sign in to access your account' 
                  : 'Join thousands of students preparing for exams'}
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-3 py-2 px-3 bg-green-100 text-green-800 rounded-lg flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {verificationState.verificationComplete 
                  ? 'Email verified! Redirecting you to the application...' 
                  : mode === 'login' 
                    ? 'Successfully signed in!' 
                    : 'Account created successfully!'}
              </span>
            </div>
          )}

          {/* Form - with reduced spacing */}
          <form onSubmit={handleSubmit} noValidate>
            {verificationState.isVerifying ? (
              /* Verification Code Form */
              <div>
                <div className="mb-4">
                  <label htmlFor="verificationCode" className="block text-gray-700 text-sm font-medium mb-1">
                    Verification Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="verificationCode"
                      name="verificationCode"
                      value={verificationState.verificationCode}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-center text-lg tracking-widest font-medium border ${errors.verificationCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${errors.verificationCode ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500`}
                      placeholder="123456"
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="one-time-code"
                      ref={verificationCodeRef}
                      aria-invalid={errors.verificationCode ? "true" : "false"}
                      aria-describedby={errors.verificationCode ? "verification-code-error" : undefined}
                    />
                    {errors.verificationCode && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.verificationCode && (
                    <p id="verification-code-error" className="mt-1 text-xs text-red-600">
                      {errors.verificationCode}
                    </p>
                  )}
                  
                  <div className="mt-2 flex flex-col space-y-2">
                    <p className="text-xs text-gray-500 text-center">
                      {verificationState.remainingAttempts < 3 && (
                        <span className="block mb-1 text-amber-600">
                          {verificationState.remainingAttempts} {verificationState.remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining
                        </span>
                      )}
                      Didn't receive a code?{' '}
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={verificationState.resendDisabled}
                        className={`text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline ${verificationState.resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {verificationState.resendDisabled 
                          ? `Resend in ${verificationState.resendCountdown}s` 
                          : 'Resend code'}
                      </button>
                    </p>
                    <button
                      type="button"
                      onClick={handleBackToForm}
                      className="text-gray-600 hover:text-gray-800 text-xs font-medium focus:outline-none hover:underline"
                    >
                      Use a different email address
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : 'Verify Code'}
                </button>
              </div>
            ) : (
              /* Regular Login/Signup Form */
              <>
                {/* Name fields - only for signup */}
                {mode === 'signup' && (
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                    <div className="flex space-x-2">
                      {/* First Name */}
                      <div className="flex-1">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <div className="mb-3">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 text-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500`}
                      placeholder="Enter your email"
                      required
                      ref={mode === 'login' ? firstInputRef : null}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password field */}
                <div className="mb-3">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 text-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500`}
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
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {errors.password ? (
                    <p id="password-error" className="mt-1 text-xs text-red-600">{errors.password}</p>
                  ) : mode === 'signup' && (
                    <p id="password-hint" className="mt-1 text-xs text-gray-500">
                      Must have 8+ chars with uppercase, lowercase, number, and special char
                    </p>
                  )}
                </div>

                {/* Confirm Password field - only for signup */}
                {mode === 'signup' && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2 text-sm border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-blue-500`}
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
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirm-password-error" className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Forgot password - Only for login */}
                {mode === 'login' && (
                  <div className="mb-3 text-right">
                    <a 
                      href="#" 
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium focus:outline-none focus:underline"
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
                  className="w-full py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </span>
                  ) : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </>
            )}
          </form>

          {/* Divider with "or" text */}
          {!verificationState.isVerifying && (
            <div className="my-3 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-xs text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          )}

          {/* Social login buttons - only show if not in verification mode */}
          {!verificationState.isVerifying && (
            <div className="flex flex-col space-y-2">
              <button 
                type="button" 
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
              
              <button 
                type="button" 
                className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.991,3.657,9.128,8.438,9.878v-6.987h-2.54V12h2.54V9.797c0-2.506,1.492-3.89,3.777-3.89c1.094,0,2.238,0.195,2.238,0.195v2.46h-1.26c-1.243,0-1.63,0.771-1.63,1.562V12h2.773l-0.443,2.89h-2.33v6.988C18.343,21.128,22,16.991,22,12z" />
                </svg>
                Continue with Facebook
              </button>
            </div>
          )}

          {/* Toggle between login and signup - only show if not in verification mode */}
          {!verificationState.isVerifying && (
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          )}

          {/* Disclaimer text */}
          {!verificationState.isVerifying && mode === 'signup' && (
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 focus:outline-none focus:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 focus:outline-none focus:underline">Privacy Policy</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;