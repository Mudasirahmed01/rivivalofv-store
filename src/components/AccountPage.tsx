import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Lock, Eye, EyeOff, ArrowLeft, 
  Package, Heart, MapPin, Settings, LogOut, ChevronRight 
} from "lucide-react";

interface AccountPageProps {
  onBack: () => void;
}

export default function AccountPage({ onBack }: AccountPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses" | "settings">("orders");

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@revivalof5.com",
    memberSince: "January 2026",
    orders: 3,
    wishlistItems: 5,
  };

  const mockOrders = [
    { id: "RO5-001", date: "Feb 20, 2026", status: "Delivered", total: 285, items: 2 },
    { id: "RO5-002", date: "Feb 15, 2026", status: "Shipped", total: 140, items: 1 },
    { id: "RO5-003", date: "Feb 10, 2026", status: "Processing", total: 195, items: 2 },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[#6E6E73] hover:text-[#111] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Store
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User size={28} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#111] mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-sm text-[#6E6E73]">
                {isSignUp ? "Join the Revival of 5 community" : "Sign in to your account"}
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/5">
              <div className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="text-xs font-semibold text-[#111] uppercase tracking-wider mb-2 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73]" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-[#111] uppercase tracking-wider mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73]" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#111] uppercase tracking-wider mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3.5 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#111]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {!isSignUp && (
                  <div className="flex justify-end">
                    <a href="#" className="text-xs text-[#6E6E73] hover:text-[#111] transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full py-4 bg-black text-white rounded-xl font-semibold text-sm tracking-wider hover:bg-black/90 transition-colors mt-2"
                >
                  {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
                </motion.button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-black/5" />
                <span className="text-xs text-[#6E6E73]">or</span>
                <div className="flex-1 h-px bg-black/5" />
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button className="w-full py-3.5 border border-black/10 rounded-xl text-sm font-medium text-[#111] hover:bg-black/5 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>
            </div>

            {/* Switch Form */}
            <p className="text-center text-sm text-[#6E6E73] mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#111] font-semibold hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Logged In Dashboard
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 md:pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#6E6E73] hover:text-[#111] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Store
        </button>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/5 mb-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-[#111]">{user.name}</h1>
              <p className="text-sm text-[#6E6E73]">{user.email}</p>
              <p className="text-xs text-[#6E6E73] mt-1">Member since {user.memberSince}</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#6E6E73] hover:text-red-500 border border-black/10 rounded-xl hover:border-red-200 transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-black/5">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#111]">{user.orders}</p>
              <p className="text-xs text-[#6E6E73]">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#111]">{user.wishlistItems}</p>
              <p className="text-xs text-[#6E6E73]">Wishlist</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#111]">2</p>
              <p className="text-xs text-[#6E6E73]">Addresses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#111]">$620</p>
              <p className="text-xs text-[#6E6E73]">Total Spent</p>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-black/5 mb-6 overflow-x-auto">
          {[
            { id: "orders" as const, label: "Orders", icon: Package },
            { id: "wishlist" as const, label: "Wishlist", icon: Heart },
            { id: "addresses" as const, label: "Addresses", icon: MapPin },
            { id: "settings" as const, label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "text-[#6E6E73] hover:text-[#111] hover:bg-black/5"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "orders" && (
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl p-4 md:p-5 border border-black/5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-[#111]">Order #{order.id}</p>
                        <p className="text-xs text-[#6E6E73] mt-0.5">{order.date} • {order.items} items</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered" ? "bg-green-50 text-green-700" :
                          order.status === "Shipped" ? "bg-blue-50 text-blue-700" :
                          "bg-amber-50 text-amber-700"
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-sm font-bold text-[#111]">${order.total}</span>
                        <ChevronRight size={16} className="text-[#6E6E73]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-xl p-8 border border-black/5 text-center">
                <Heart size={40} className="text-[#6E6E73] mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#111] mb-1">Your wishlist is empty</p>
                <p className="text-xs text-[#6E6E73]">Save items you love for later</p>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-5 border border-black/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-bold text-[#111]">Home</p>
                        <span className="px-2 py-0.5 bg-black text-white text-[10px] rounded-full">Default</span>
                      </div>
                      <p className="text-xs text-[#6E6E73] leading-relaxed">
                        123 Fashion Street, Apt 4B<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                    <button className="text-xs text-[#6E6E73] hover:text-[#111]">Edit</button>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-dashed border-black/10 rounded-xl text-sm text-[#6E6E73] hover:border-black/30 hover:text-[#111] transition-colors">
                  + Add New Address
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-xl p-5 md:p-6 border border-black/5 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-black/5">
                  <div>
                    <p className="text-sm font-semibold text-[#111]">Email Notifications</p>
                    <p className="text-xs text-[#6E6E73]">Receive updates about orders and promotions</p>
                  </div>
                  <div className="w-10 h-6 bg-black rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-black/5">
                  <div>
                    <p className="text-sm font-semibold text-[#111]">Marketing Emails</p>
                    <p className="text-xs text-[#6E6E73]">New drops, exclusive offers, and style tips</p>
                  </div>
                  <div className="w-10 h-6 bg-black/20 rounded-full relative cursor-pointer">
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#111]">Two-Factor Auth</p>
                    <p className="text-xs text-[#6E6E73]">Extra security for your account</p>
                  </div>
                  <button className="px-3 py-1.5 bg-black/5 rounded-lg text-xs font-medium text-[#111] hover:bg-black/10 transition-colors">
                    Enable
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
