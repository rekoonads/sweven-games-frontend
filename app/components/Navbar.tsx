'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { MagnifyingGlassIcon, UserCircleIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/nextjs'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Games', href: '/games' },
    { name: 'Store', href: '/store' },
  ]

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent">
              Sweven Games
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gaming-purple focus:ring-1 focus:ring-gaming-purple"
              />
            </div>
          </div>

          {/* Authentication & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-300 hover:text-white transition-colors font-medium">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
              >
                <UserCircleIcon className="h-8 w-8" />
              </button>
              
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="py-2">
                    <SignedOut>
                      <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Account
                      </div>
                      <SignInButton mode="modal">
                        <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                          <UserCircleIcon className="h-4 w-4 mr-3" />
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                          <UserCircleIcon className="h-4 w-4 mr-3" />
                          Sign Up
                        </button>
                      </SignUpButton>
                      <hr className="border-gray-700 my-2" />
                      <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Plans
                      </div>
                      <Link href="/profile/subscription" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Subscription Plans
                      </Link>
                    </SignedOut>
                    
                    <SignedIn>
                      <div className="px-4 py-3 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={user?.imageUrl} 
                            alt={user?.fullName || 'User'} 
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium text-white">
                              {user?.fullName || user?.firstName || 'User'}
                            </div>
                            <div className="text-xs text-gray-400">
                              {user?.emailAddresses[0]?.emailAddress}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        My Account
                      </div>
                      <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <UserCircleIcon className="h-4 w-4 mr-3" />
                        My Profile
                      </Link>
                      <Link href="/profile/subscription" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Subscription
                      </Link>
                      <hr className="border-gray-700 my-2" />
                      <button
                        onClick={() => signOut()}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </SignedIn>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? 'text-gaming-cyan bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gaming-purple"
                />
              </div>
              <div className="px-3 py-2 space-y-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full btn-primary">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">
                    My Profile
                  </Link>
                  <Link href="/profile/subscription" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">
                    Subscription
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-800"
                  >
                    Sign Out
                  </button>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}