'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { getPaymentStatus } from '@/app/api/subscription'

function PaymentReturnContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [message, setMessage] = useState('')
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    checkPaymentStatus()
  }, [])

  async function checkPaymentStatus() {
    try {
      // Get order ID from URL params
      const orderIdParam = searchParams.get('order_id')
      if (!orderIdParam) {
        setStatus('failed')
        setMessage('Order ID not found')
        return
      }

      setOrderId(orderIdParam)

      // Wait a bit for webhook to process
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Check payment status
      const paymentData = await getPaymentStatus(orderIdParam)

      if (paymentData.transaction.status === 'success') {
        setStatus('success')
        setMessage('Payment successful! Your subscription is now active.')
      } else if (paymentData.transaction.status === 'failed') {
        setStatus('failed')
        setMessage('Payment failed. Please try again.')
      } else {
        setStatus('loading')
        setMessage('Payment is being processed...')

        // Keep checking status
        setTimeout(checkPaymentStatus, 3000)
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
      setStatus('failed')
      setMessage('Unable to verify payment status. Please contact support.')
    }
  }

  function handleContinue() {
    if (status === 'success') {
      router.push('/profile/subscription')
    } else {
      router.push('/profile/subscription')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="card-gaming text-center">
          {status === 'loading' && (
            <>
              <div className="mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gaming-cyan mx-auto"></div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Processing Payment</h1>
              <p className="text-gray-400 mb-6">
                Please wait while we confirm your payment...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-6">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Payment Successful!</h1>
              <p className="text-gray-400 mb-6">{message}</p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-400 text-sm">
                  Order ID: {orderId}
                </p>
              </div>
              <button
                className="btn-primary w-full"
                onClick={handleContinue}
              >
                View Subscription
              </button>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="mb-6">
                <XCircleIcon className="h-16 w-16 text-red-500 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Payment Failed</h1>
              <p className="text-gray-400 mb-6">{message}</p>
              {orderId && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">
                    Order ID: {orderId}
                  </p>
                </div>
              )}
              <div className="space-y-3">
                <button
                  className="btn-primary w-full"
                  onClick={() => router.push('/profile/subscription')}
                >
                  Try Again
                </button>
                <button
                  className="btn-secondary w-full"
                  onClick={() => router.push('/support')}
                >
                  Contact Support
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/profile/subscription"
            className="text-gaming-cyan hover:text-gaming-cyan/80 transition-colors"
          >
            ← Back to Subscriptions
          </a>
        </div>
      </div>
    </div>
  )
}

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gaming-cyan mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    }>
      <PaymentReturnContent />
    </Suspense>
  )
}
