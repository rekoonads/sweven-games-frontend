'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { CheckIcon, CreditCardIcon, CalendarIcon } from '@heroicons/react/24/outline'
import {
  getSubscriptionPlans,
  getUserSubscription,
  getUserBillingHistory,
  createSubscription,
  cancelSubscription,
  type SubscriptionPlan,
  type UserSubscription,
  type BillingRecord
} from '@/app/api/subscription'

// Default plans to show even when backend is unavailable
const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    planId: 'starter-trial',
    name: '⚡ Starter Trial',
    price: 299,
    hours: 5,
    validity: 3,
    timeWindow: '9 AM - 9 PM',
    description: 'Perfect for trying out',
    features: [
      '5 hours of gaming',
      '3 days validity',
      'Play games you own from library',
      '1080p streaming quality',
      'Email support'
    ],
    isActive: true
  },
  {
    planId: 'weekend-gamer',
    name: '🎮 Weekend Gamer',
    price: 799,
    hours: 20,
    validity: 7,
    timeWindow: 'Weekends Only',
    description: 'For weekend warriors',
    features: [
      '20 hours of gaming',
      '7 days validity',
      'Play games you own from library',
      'Weekend access',
      '1080p streaming quality',
      'Priority support'
    ],
    isActive: true
  },
  {
    planId: 'starter-plan',
    name: '🚀 Starter Plan',
    price: 1499,
    hours: 100,
    validity: 28,
    description: 'Most Popular Choice',
    features: [
      '100 hours of gaming',
      '28 days validity',
      'Play games you own from library',
      '24/7 access',
      '1080p streaming quality',
      'Priority support',
      'Cloud saves'
    ],
    isActive: true
  },
  {
    planId: 'arena-pass',
    name: '🏆 Arena Pass',
    price: 2499,
    hours: 100,
    validity: 28,
    description: 'Premium experience',
    features: [
      '100 hours of gaming',
      '28 days validity',
      'Play games you own from library',
      '24/7 access',
      '4K streaming quality',
      'Dedicated support',
      'Cloud saves',
      'Exclusive game access'
    ],
    isActive: true
  },
  {
    planId: 'pro-plus',
    name: '💎 Pro Plus',
    price: 3499,
    hours: 150,
    validity: 28,
    description: 'Ultimate gaming',
    features: [
      '150 hours of gaming',
      '28 days validity',
      'Play games you own from library',
      '24/7 access',
      '4K streaming quality',
      'VIP support',
      'Cloud saves',
      'Exclusive game access',
      'Ray tracing enabled'
    ],
    isActive: true
  }
]

export default function SubscriptionPage() {
  const { user, isLoaded } = useUser()

  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [plans, setPlans] = useState<SubscriptionPlan[]>(DEFAULT_PLANS)
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null)
  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  // Use Clerk user data if available (for signed-in users)
  const userId = user?.id
  const userName = user?.fullName || user?.username || 'User'
  const userEmail = user?.primaryEmailAddress?.emailAddress || ''
  const userPhone = user?.primaryPhoneNumber?.phoneNumber || ''
  const isSignedIn = !!user

  // Load subscription data on mount
  useEffect(() => {
    loadSubscriptionData()
  }, [])

  async function loadSubscriptionData() {
    try {
      setLoading(true)

      // Try to load plans from backend, fallback to default if it fails
      try {
        const plansData = await getSubscriptionPlans()
        setPlans(plansData)
      } catch (planError) {
        console.log('Using default plans (backend unavailable)')
        // Keep the default plans that were set in state initialization
      }

      // Only load user-specific data if signed in
      if (isSignedIn && userId) {
        try {
          // Load user's current subscription
          const subscriptionData = await getUserSubscription(userId)
          setCurrentSubscription(subscriptionData)

          // Load billing history
          const billingData = await getUserBillingHistory(userId)
          setBillingHistory(billingData)
        } catch (userError) {
          console.log('Could not load user subscription data (backend unavailable)')
        }
      }
    } catch (error) {
      console.error('Error loading subscription data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectPlan(planId: string) {
    setSelectedPlan(planId)
  }

  async function handleSubscribe() {
    // Check if user is signed in
    if (!isSignedIn) {
      // Redirect to sign-in page
      window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`
      return
    }

    if (!selectedPlan) {
      alert('Please select a plan first')
      return
    }

    try {
      setProcessing(true)

      // Create subscription and get payment link
      const { subscription, payment } = await createSubscription(
        userId!,
        userName,
        userEmail,
        userPhone,
        selectedPlan
      )

      console.log('Subscription created:', subscription)
      console.log('Payment details:', payment)

      // Redirect to Cashfree payment page
      window.location.href = payment.paymentLink
    } catch (error: any) {
      console.error('Error creating subscription:', error)

      // Check if it's a connection error
      if (error.message?.includes('ERR_CONNECTION_REFUSED') || error.message?.includes('Failed to fetch') || error.message?.includes('Network request failed')) {
        alert('Payment system is currently unavailable. Please try again later or contact support.')
      } else {
        alert(error.message || 'Failed to create subscription. Please try again.')
      }
      setProcessing(false)
    }
  }

  async function handleCancelSubscription() {
    if (!currentSubscription || !userId) return

    const confirmed = confirm('Are you sure you want to cancel your subscription?')
    if (!confirmed) return

    try {
      setProcessing(true)

      await cancelSubscription(
        userId,
        currentSubscription.subscriptionId,
        'User requested cancellation'
      )

      alert('Subscription cancelled successfully')
      await loadSubscriptionData()
    } catch (error: any) {
      console.error('Error cancelling subscription:', error)

      // Check if it's a connection error
      if (error.message?.includes('ERR_CONNECTION_REFUSED') || error.message?.includes('Failed to fetch') || error.message?.includes('Network request failed')) {
        alert('Subscription management system is currently unavailable. Please contact support to cancel your subscription.')
      } else {
        alert(error.message || 'Failed to cancel subscription. Please try again.')
      }
    } finally {
      setProcessing(false)
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black py-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading subscription data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Subscription Management</h1>
          <p className="text-gray-400 text-lg">Manage your Sweven Games subscription</p>
        </div>

        {/* Current Subscription */}
        <div className="card-gaming mb-8">
          {!isSignedIn ? (
            // Show sign-in prompt for non-authenticated users
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-white mb-4">View Your Subscription Status</h2>
              <p className="text-gray-400 mb-6">Sign in to manage your subscriptions and view billing history</p>
              <a href="/sign-in" className="btn-primary inline-block">Sign In to Continue</a>
            </div>
          ) : (
            // Show subscription details for signed-in users
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Current Subscription</h2>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Plan:</span>
                    <span className="text-gaming-cyan">
                      {currentSubscription ? plans.find(p => p.planId === currentSubscription.planId)?.name : 'No Active Plan'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentSubscription?.status === 'active'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {currentSubscription?.status || 'Inactive'}
                    </span>
                  </div>
                  {currentSubscription && (
                  <>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Valid until: {formatDate(currentSubscription.endDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Hours remaining: {currentSubscription.hoursRemaining} / {currentSubscription.hoursTotal}</span>
                    </div>
                  </>
                )}
                </div>
              </div>
              <div className="mt-4 lg:mt-0 text-right">
                <div className="text-3xl font-bold text-gaming-cyan mb-2">
                  ₹{currentSubscription?.amountPaid || 0}
                </div>
                {currentSubscription?.status === 'active' && (
                  <button
                    className="text-red-400 hover:text-red-300 transition-colors"
                    onClick={handleCancelSubscription}
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : 'Cancel Subscription'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Subscription Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            {currentSubscription?.status === 'active' ? 'Upgrade Your Plan' : 'Choose Your Plan'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.planId}
                className={`relative rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  plan.planId === 'starter-plan'
                    ? 'border-gaming-purple bg-gradient-to-b from-gaming-purple/10 to-transparent'
                    : selectedPlan === plan.planId
                    ? 'border-gaming-cyan bg-gradient-to-b from-gaming-cyan/10 to-transparent'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}
                onClick={() => handleSelectPlan(plan.planId)}
              >
                {plan.planId === 'starter-plan' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">
                      ₹{plan.price}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-gaming-cyan font-semibold">{plan.hours} Hours</div>
                      <div className="text-gray-400 text-xs">Gaming Time</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-gaming-purple font-semibold">{plan.validity} Days</div>
                      <div className="text-gray-400 text-xs">Validity</div>
                    </div>
                  </div>
                  {plan.timeWindow && plan.timeWindow !== '—' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 mb-4">
                      <div className="text-yellow-400 text-xs font-medium">{plan.timeWindow}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    selectedPlan === plan.planId
                      ? 'bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white'
                      : plan.planId === 'starter-plan'
                      ? 'bg-gaming-purple text-white hover:bg-gaming-purple/80'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => handleSelectPlan(plan.planId)}
                  disabled={processing}
                >
                  {selectedPlan === plan.planId ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          {selectedPlan && (
            <div className="mt-8 text-center">
              <button
                className="btn-primary px-12 py-4 text-lg"
                onClick={handleSubscribe}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          )}
        </div>

        {/* Billing History */}
        <div className="card-gaming">
          <h2 className="text-2xl font-semibold text-white mb-6">Billing History</h2>
          <div className="overflow-x-auto">
            {billingHistory.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 font-medium py-3">Date</th>
                    <th className="text-left text-gray-400 font-medium py-3">Description</th>
                    <th className="text-left text-gray-400 font-medium py-3">Amount</th>
                    <th className="text-left text-gray-400 font-medium py-3">Status</th>
                    <th className="text-left text-gray-400 font-medium py-3">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((billing) => (
                    <tr key={billing.billingId} className="border-b border-gray-800">
                      <td className="py-4 text-gray-300">{formatDate(billing.billingDate)}</td>
                      <td className="py-4 text-gray-300">{billing.description}</td>
                      <td className="py-4 text-white font-medium">₹{billing.amount}</td>
                      <td className="py-4">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                          {billing.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-gaming-cyan hover:text-gaming-cyan/80 transition-colors">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No billing history available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
