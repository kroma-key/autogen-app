/**
 * Authentication helper functions for Supabase
 */

/**
 * Get the appropriate redirect URL for authentication
 * Uses localhost:3000 for local development, otherwise uses the current origin
 */
export function getAuthRedirectUrl(): string {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/auth/callback'
  }
  
  // For production, use the current origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback`
  }
  
  // Fallback for server-side rendering
  return '/auth/callback'
}

/**
 * Get the site URL for Supabase configuration
 * Uses localhost:3000 for local development
 */
export function getSiteUrl(): string {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  
  // For production, you should set this via environment variable
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}
