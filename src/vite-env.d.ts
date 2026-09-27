// ============================================
// TYPESCRIPT ENVIRONMENT VARIABLE DEFINITIONS
// ============================================
// Type definitions for Vite environment variables
// This provides type safety for import.meta.env

/// <reference types="vite/client" />

// ============================================
// ENVIRONMENT VARIABLES INTERFACE
// ============================================

interface ImportMetaEnv {
  // ============================================
  // SUPABASE CONFIGURATION
  // ============================================

  /**
   * Supabase Project URL
   * Format: https://your-project-id.supabase.co
   * Get from: Supabase Dashboard → Settings → API
   */
  readonly VITE_SUPABASE_URL: string;

  /**
   * Supabase Anonymous Key (Public)
   * Safe to expose in frontend
   * Get from: Supabase Dashboard → Settings → API
   */
  readonly VITE_SUPABASE_ANON_KEY: string;

  // ============================================
  // CLOUDINARY CONFIGURATION
  // ============================================

  /**
   * Cloudinary Cloud Name
   * Get from: Cloudinary Dashboard → Account Details
   */
  readonly VITE_CLOUDINARY_CLOUD_NAME: string;

  /**
   * Cloudinary Upload Preset
   * Create from: Cloudinary Dashboard → Settings → Upload → Upload presets
   * Must be set to "Unsigned" for frontend uploads
   */
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string;

  // ============================================
  // OPTIONAL: ADDITIONAL ENVIRONMENT VARIABLES
  // ============================================

  /**
   * Application Environment
   * Values: 'development' | 'production' | 'test'
   */
  readonly VITE_APP_ENV?: string;

  /**
   * Application Version
   * Format: '1.0.0'
   */
  readonly VITE_APP_VERSION?: string;

  /**
   * Google Analytics Tracking ID
   * Format: 'G-XXXXXXXXXX'
   */
  readonly VITE_GA_TRACKING_ID?: string;

  /**
   * Sentry DSN for error tracking
   * Get from: Sentry Dashboard → Projects → Settings
   */
  readonly VITE_SENTRY_DSN?: string;
}

// ============================================
// IMPORT META INTERFACE
// ============================================

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Check if all required Supabase environment variables are set
 */
export const hasSupabaseConfig = (): boolean => {
  return !!(
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
};

/**
 * Check if all required Cloudinary environment variables are set
 */
export const hasCloudinaryConfig = (): boolean => {
  return !!(
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME &&
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
};

/**
 * Check if app is running in development mode
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

/**
 * Check if app is running in production mode
 */
export const isProduction = (): boolean => {
  return import.meta.env.PROD;
};

/**
 * Get current environment
 */
export const getEnvironment = (): string => {
  return import.meta.env.VITE_APP_ENV || (isDevelopment() ? 'development' : 'production');
};

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate all required environment variables
 * Call this in your main.tsx or App.tsx to ensure config is correct
 */
export const validateEnvironment = (): void => {
  const missing: string[] = [];

  // Check Supabase
  if (!import.meta.env.VITE_SUPABASE_URL) {
    missing.push('VITE_SUPABASE_URL');
  }
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    missing.push('VITE_SUPABASE_ANON_KEY');
  }

  // Check Cloudinary
  if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
    missing.push('VITE_CLOUDINARY_CLOUD_NAME');
  }
  if (!import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) {
    missing.push('VITE_CLOUDINARY_UPLOAD_PRESET');
  }

  // Log warnings
  if (missing.length > 0) {
    console.warn('⚠️ Missing environment variables:', missing);
    console.warn('Please check your .env file');
  } else {
    console.log('✅ All environment variables configured correctly');
  }

};

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// In your components:

// Access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Check environment
if (isDevelopment()) {
  console.log('Running in development mode');
}

// Validate on app start
import { validateEnvironment } from './vite-env';

function App() {
  useEffect(() => {
    validateEnvironment();
  }, []);

  return <YourApp />;
}

// Type-safe access
const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  },
};
*/
