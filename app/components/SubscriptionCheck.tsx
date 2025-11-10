'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkUserAccess } from '@/app/api/subscription'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface SubscriptionCheckProps {
  userId: string
  children: React.ReactNode
  onAccessDenied?: () => void
}

/**
 * Component to check if user has active subscription before rendering children
 * Wrap game components with this to enforce subscription access
 */
export default function SubscriptionCheck({
  userId,
  children,
  onAccessDenied
}: SubscriptionCheckProps) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    checkAccess()
  }, [userId])

  async function checkAccess() {
    try {
      setChecking(true)
      const accessData = await checkUserAccess(userId)

      if (accessData.canPlay) {
        setHasAccess(true)
      } else {
        setHasAccess(false)
        setMessage(accessData.message)

        if (onAccessDenied) {
          onAccessDenied()
        }
      }
    } catch (error) {
      console.error('Error checking subscription access:', error)
      setHasAccess(false)
      setMessage('Unable to verify subscription. Please try again.')
    } finally {
      setChecking(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gaming-cyan mx-auto mb-4"></div>
          <p className="text-white text-lg">Checking subscription status...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card-gaming text-center">
            <div className="mb-6">
              <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Subscription Required</h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                className="btn-primary w-full"
                onClick={() => router.push('/profile/subscription')}
              >
                View Subscription Plans
              </button>
              <button
                className="btn-secondary w-full"
                onClick={() => router.push('/')}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

/**
 * Hook to check subscription access
 */
export function useSubscriptionAccess(userId: string) {
  const [canPlay, setCanPlay] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAccess()
  }, [userId])

  async function checkAccess() {
    try {
      setLoading(true)
      const accessData = await checkUserAccess(userId)
      setCanPlay(accessData.canPlay)
      setSubscription(accessData.subscription)
    } catch (error) {
      console.error('Error checking subscription access:', error)
      setCanPlay(false)
      setSubscription(null)
    } finally {
      setLoading(false)
    }
  }

  return { canPlay, subscription, loading, refresh: checkAccess }
}
