'use client'

import { useState } from 'react'
import { CheckIcon, XMarkIcon, CreditCardIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium')

  const plans = [
    {
      id: 'starter-trial',
      name: '🧭 Starter Trial',
      price: 299,
      hours: '5 Hours',
      validity: '3 Days',
      timeWindow: '—',
      description: 'Try SWEVEN GAMES with limited hours — ideal for new users before subscribing',
      features: [
        '5 hours of gaming',
        'Valid for 3 days',
        'Full game library access',
        'HD streaming quality'
      ],
      popular: false
    },
    {
      id: 'weekend-gamer',
      name: '🌙 Weekend Gamer',
      price: 799,
      hours: '20 Hours',
      validity: '7 Days',
      timeWindow: 'Fri–Sun, 9PM–4AM',
      description: 'Designed for weekend players and night sessions',
      features: [
        '20 hours of gaming',
        'Valid for 7 days',
        'Weekend access (Fri-Sun)',
        'Night sessions (9PM-4AM)',
        'Full HD streaming'
      ],
      popular: false
    },
    {
      id: 'starter-plan',
      name: '⚡ Starter Plan',
      price: 1499,
      hours: '100 Hours',
      validity: '30 Days',
      timeWindow: '—',
      description: 'Perfect monthly plan for consistent gamers',
      features: [
        '100 hours of gaming',
        'Valid for 30 days',
        'Anytime access',
        'Full game library',
        '4K streaming quality',
        'Priority support'
      ],
      popular: true
    },
    {
      id: 'arena-pass',
      name: '🏆 Arena Pass',
      price: 2499,
      hours: '100 Hours',
      validity: '30 Days',
      timeWindow: '—',
      description: 'Competitive-tier plan with extended features & active player support',
      features: [
        '100 hours of gaming',
        'Valid for 30 days',
        'Competitive tier features',
        'Ray tracing support',
        '4K HDR streaming',
        'Active player support',
        'Priority queue'
      ],
      popular: false
    },
    {
      id: 'pro-plus',
      name: '💎 Pro+ Plan',
      price: 3499,
      hours: '150 Hours',
      validity: '30 Days',
      timeWindow: '—',
      description: 'Premium plan for streamers, heavy users & top-tier performance',
      features: [
        '150 hours of gaming',
        'Valid for 30 days',
        'Top-tier performance',
        'Streaming optimization',
        '4K HDR + Ray tracing',
        'VIP support',
        'Custom gaming rigs',
        'Game saves backup'
      ],
      popular: false
    }
  ]

  const currentSubscription = {
    plan: 'No Active Plan',
    status: 'Inactive',
    nextBilling: '-',
    amount: '₹0',
    paymentMethod: 'No payment method'
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Current Subscription</h2>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Plan:</span>
                  <span className="text-gaming-cyan">{currentSubscription.plan}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentSubscription.status === 'Active' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {currentSubscription.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Next billing: {currentSubscription.nextBilling}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCardIcon className="w-4 h-4" />
                  <span>Payment method: {currentSubscription.paymentMethod}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 text-right">
              <div className="text-3xl font-bold text-gaming-cyan mb-2">
                {currentSubscription.amount}/month
              </div>
              <button className="btn-secondary mr-2">Update Payment</button>
              <button className="text-red-400 hover:text-red-300 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'border-gaming-purple bg-gradient-to-b from-gaming-purple/10 to-transparent'
                    : selectedPlan === plan.id
                    ? 'border-gaming-cyan bg-gradient-to-b from-gaming-cyan/10 to-transparent'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
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
                      <div className="text-gaming-cyan font-semibold">{plan.hours}</div>
                      <div className="text-gray-400 text-xs">Gaming Time</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-gaming-purple font-semibold">{plan.validity}</div>
                      <div className="text-gray-400 text-xs">Validity</div>
                    </div>
                  </div>
                  {plan.timeWindow !== '—' && (
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
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white'
                      : plan.popular
                      ? 'bg-gaming-purple text-white hover:bg-gaming-purple/80'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div className="card-gaming">
          <h2 className="text-2xl font-semibold text-white mb-6">Billing History</h2>
          <div className="overflow-x-auto">
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
                <tr className="border-b border-gray-800">
                  <td className="py-4 text-gray-300">Mar 15, 2024</td>
                  <td className="py-4 text-gray-300">Premium Monthly Subscription</td>
                  <td className="py-4 text-white font-medium">$14.99</td>
                  <td className="py-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-gaming-cyan hover:text-gaming-cyan/80 transition-colors">
                      Download
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 text-gray-300">Feb 15, 2024</td>
                  <td className="py-4 text-gray-300">Premium Monthly Subscription</td>
                  <td className="py-4 text-white font-medium">$14.99</td>
                  <td className="py-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-gaming-cyan hover:text-gaming-cyan/80 transition-colors">
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 text-gray-300">Jan 15, 2024</td>
                  <td className="py-4 text-gray-300">Premium Monthly Subscription</td>
                  <td className="py-4 text-white font-medium">$14.99</td>
                  <td className="py-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Paid
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-gaming-cyan hover:text-gaming-cyan/80 transition-colors">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}