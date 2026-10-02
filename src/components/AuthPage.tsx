import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import BackendService from '../lib/backend';

interface AuthPageProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export default function AuthPage({ onBack, onLoginSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const [authCopy, setAuthCopy] = useState({ login_title: 'Welcome Back', login_tagline: 'Sign in to your account', signup_title: 'Create Account', signup_tagline: 'Join REVIVAL OF V' });

  useEffect(() => {
    BackendService.getStoreSettings().then((settings) => {
      setAuthCopy((current) => ({ ...current, ...(settings.auth_copy || {}) }));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);

    if (isForgotPassword) {
      const result = await BackendService.requestPasswordReset(formData.email, `${window.location.origin}${window.location.pathname}?auth=reset-password`);
      if (result.success) setNotice('If an account exists for that email, a password reset link has been sent.');
      else setError(result.message);
    } else if (isLogin) {
      const result = await BackendService.loginUser(formData.email, formData.password);
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.message);
      }
    } else {
      const result = await BackendService.registerUser(formData);
      if (result.success) {
        if (result.session) {
          onLoginSuccess();
        } else {
          setNotice(result.message);
          setIsLogin(true);
        }
      } else {
        setError(result.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#111] mb-2">
              {isForgotPassword ? 'Reset your password' : isLogin ? authCopy.login_title : authCopy.signup_title}
            </h1>
            <p className="text-sm text-gray-600">
              {isForgotPassword ? 'Enter your email and we will send a secure reset link.' : isLogin ? authCopy.login_tagline : authCopy.signup_tagline}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {notice && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm text-green-700">{notice}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isForgotPassword && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#111] uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111] uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0313-1392018"
                      className="w-full pl-12 pr-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-[#111] uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
                  required
                />
              </div>
            </div>

            {!isForgotPassword && <div>
              <label className="block text-xs font-bold text-[#111] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
                  required
                  minLength={6}
                />
              </div>
            </div>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-full font-semibold text-sm tracking-wider hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : isForgotPassword ? 'SEND RESET LINK' : isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </motion.button>
          </form>

          {!isForgotPassword && <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setNotice('');
                }}
                className="text-black font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>}

          {isLogin && !isForgotPassword && (
            <div className="mt-4 text-center">
              <button type="button" onClick={() => { setIsForgotPassword(true); setError(''); setNotice(''); }} className="text-xs text-gray-500 hover:text-black transition-colors">
                Forgot password?
              </button>
            </div>
          )}
          {isForgotPassword && <div className="mt-4 text-center"><button type="button" onClick={() => { setIsForgotPassword(false); setError(''); setNotice(''); }} className="text-sm font-semibold text-black hover:underline">Back to sign in</button></div>}
        </motion.div>
      </div>
    </div>
  );
}
