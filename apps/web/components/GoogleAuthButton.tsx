import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface GoogleAuthButtonProps {
  mode: 'login' | 'signup'
  onSuccess: () => void
}

export default function GoogleAuthButton({ mode, onSuccess }: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setLoading(true)

    try {
      if (!isSupabaseConfigured()) {
        toast.error('Authentication is not configured. Please set up Supabase credentials.')
        return
      }

      if (!supabase) {
        toast.error('Authentication service is not available.')
        return
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        toast.error(error.message)
        return
      }

      if (data) {
        toast.success('Redirecting to Google...')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error('Google auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={loading}
      className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-casablanca-blue disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="loading-spinner h-5 w-5" />
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </>
      )}
    </button>
  )
} 