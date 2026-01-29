import { useState } from 'react';
import { toast } from 'react-toastify';
import { Lock, Mail, LogIn, Car } from 'lucide-react';

function Login({ setCurrentPage, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Check admin credentials
    if (email === 'admin@parking.com' && password === 'Admin@123') {
      const adminUser = {
        name: 'Admin',
        email: 'admin@parking.com',
        role: 'admin'
      };
      setUser(adminUser);
      toast.success('Welcome Admin!');
      setCurrentPage('admin-dashboard');
      return;
    }

    // Mock user login (in real app, would validate against stored users)
    const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const user = {
        name: foundUser.name,
        email: foundUser.email,
        role: 'user'
      };
      setUser(user);
      toast.success(`Welcome back, ${foundUser.name}!`);
      setCurrentPage('user-dashboard');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full" data-aos="fade-up">
        <div>
          <div className="flex justify-center">
            <div className="bg-[#4F46E5] rounded-full p-4">
              <Car className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
            Smart Parking System
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Login to manage your parking
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-xl p-8 space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-[#0F172A] dark:text-white transition-all`}
                  placeholder="user@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-[#0F172A] dark:text-white transition-all`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] transition-all font-medium"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </button>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage('register')}
                className="text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors"
              >
                Register here
              </button>
            </div>

            {/* Demo Credentials */}
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
