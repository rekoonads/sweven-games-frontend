'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { 
  UserCircleIcon, 
  CogIcon, 
  TrophyIcon, 
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black flex items-center justify-center">
        <div className="text-white text-xl">Please sign in to view your profile</div>
      </div>
    )
  }

  const userStats = {
    joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A',
    subscription: "No Active Plan",
    level: 1,
    totalPlaytime: "0h",
    gamesOwned: 0,
    achievements: 0
  }

  const recentGames = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
      lastPlayed: "2 hours ago",
      playtime: "45h"
    },
    {
      id: 2,
      title: "Elden Ring",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
      lastPlayed: "1 day ago",
      playtime: "120h"
    },
    {
      id: 3,
      title: "Spider-Man Remastered",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      lastPlayed: "3 days ago",
      playtime: "25h"
    }
  ]

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first game",
      icon: "🎮",
      earned: true,
      date: "Jan 15, 2024"
    },
    {
      id: 2,
      title: "Speed Runner",
      description: "Complete a game in under 10 hours",
      icon: "⚡",
      earned: true,
      date: "Feb 3, 2024"
    },
    {
      id: 3,
      title: "Collector",
      description: "Own 25+ games",
      icon: "📚",
      earned: true,
      date: "Mar 10, 2024"
    },
    {
      id: 4,
      title: "Marathon Gamer",
      description: "Play for 100+ hours total",
      icon: "🏃",
      earned: false,
      date: null
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserCircleIcon },
    { id: 'games', name: 'Recent Games', icon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'achievements', name: 'Achievements', icon: TrophyIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="card-gaming mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={user.fullName || 'User'}
                className="w-24 h-24 rounded-full border-4 border-gaming-purple"
              />
              <div className="absolute -bottom-2 -right-2 bg-gaming-cyan text-white text-xs font-bold px-2 py-1 rounded-full">
                Lv.{userStats.level}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{user.fullName || user.firstName || 'Gaming User'}</h1>
              <p className="text-gaming-cyan mb-2">@{user.username || user.emailAddresses[0]?.emailAddress.split('@')[0]}</p>
              <p className="text-gray-400 mb-4">Member since {userStats.joinDate}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white px-4 py-2 rounded-lg font-semibold">
                  {userStats.subscription} Member
                </div>
                <Link href="/profile/subscription" className="btn-secondary">
                  Manage Subscription
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card-gaming text-center">
            <ClockIcon className="w-8 h-8 text-gaming-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{userStats.totalPlaytime}</div>
            <div className="text-gray-400 text-sm">Total Playtime</div>
          </div>
          <div className="card-gaming text-center">
            <svg className="w-8 h-8 text-gaming-purple mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-2xl font-bold text-white mb-1">{userStats.gamesOwned}</div>
            <div className="text-gray-400 text-sm">Games Owned</div>
          </div>
          <div className="card-gaming text-center">
            <TrophyIcon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{userStats.achievements}</div>
            <div className="text-gray-400 text-sm">Achievements</div>
          </div>
          <div className="card-gaming text-center">
            <StarIcon className="w-8 h-8 text-gaming-pink mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{userStats.level}</div>
            <div className="text-gray-400 text-sm">Player Level</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-700 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-gaming-cyan border-b-2 border-gaming-cyan'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card-gaming">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentGames.map((game) => (
                  <div key={game.id} className="flex items-center space-x-4">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium">{game.title}</div>
                      <div className="text-gray-400 text-sm">
                        Last played {game.lastPlayed} • {game.playtime} total
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-gaming">
              <h3 className="text-xl font-semibold text-white mb-4">Latest Achievements</h3>
              <div className="space-y-4">
                {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-lg flex items-center justify-center text-xl">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{achievement.title}</div>
                      <div className="text-gray-400 text-sm">{achievement.description}</div>
                      <div className="text-gaming-cyan text-xs">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="card-gaming">
            <h3 className="text-xl font-semibold text-white mb-6">Recently Played Games</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentGames.map((game) => (
                <div key={game.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-white font-medium mb-2">{game.title}</h4>
                  <div className="text-gray-400 text-sm">
                    <div>Last played: {game.lastPlayed}</div>
                    <div>Playtime: {game.playtime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="card-gaming">
            <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'border-gaming-purple bg-gaming-purple/10'
                      : 'border-gray-700 bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-gaming-purple to-gaming-cyan'
                        : 'bg-gray-700'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-1 ${
                        achievement.earned ? 'text-white' : 'text-gray-400'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <p className="text-gaming-cyan text-xs">Earned on {achievement.date}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card-gaming">
            <h3 className="text-xl font-semibold text-white mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue={user.fullName || ''}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gaming-purple"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.emailAddresses[0]?.emailAddress || ''}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gaming-purple"
                  disabled
                />
              </div>
              <div className="flex space-x-4">
                <button className="btn-primary">Save Changes</button>
                <SignOutButton>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}