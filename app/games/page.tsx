'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { PlayIcon, HeartIcon, ShareIcon, FunnelIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState<number[]>([])
  const { user } = useUser()
  
  // Check if user has active subscription - replace with actual API call
  const hasActiveSubscription = user?.publicMetadata?.subscription === 'active' || false

  const categories = [
    { id: 'all', name: 'All Games' },
    { id: 'action', name: 'Action' },
    { id: 'rpg', name: 'RPG' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'sports', name: 'Sports' },
    { id: 'racing', name: 'Racing' }
  ]

  const games = [
    {
      id: 99,
      title: "🎮 Demo: Retro Racer",
      image: "https://images.unsplash.com/photo-1511882150382-421056c481d6?w=400&h=600&fit=crop",
      category: "racing",
      rating: 4.0,
      playtime: "0h",
      status: "free-demo",
      platforms: ['browser'],
      isFreeDemo: true
    },
    {
      id: 1,
      title: "Cyberpunk 2077",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
      category: "rpg",
      rating: 4.5,
      playtime: "45h",
      status: "installed",
      platforms: ['steam', 'epic']
    },
    {
      id: 2,
      title: "Elden Ring",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
      category: "rpg",
      rating: 4.8,
      playtime: "120h",
      status: "installed",
      platforms: ['steam']
    },
    {
      id: 3,
      title: "Spider-Man Remastered",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      category: "action",
      rating: 4.7,
      playtime: "25h",
      status: "installed",
      platforms: ['steam', 'epic']
    },
    {
      id: 4,
      title: "FIFA 24",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop",
      category: "sports",
      rating: 4.2,
      playtime: "80h",
      status: "available",
      platforms: ['ea', 'steam']
    },
    {
      id: 5,
      title: "Forza Horizon 5",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=600&fit=crop",
      category: "racing",
      rating: 4.6,
      playtime: "35h",
      status: "available",
      platforms: ['steam']
    },
    {
      id: 6,
      title: "Civilization VI",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
      category: "strategy",
      rating: 4.4,
      playtime: "200h",
      status: "installed",
      platforms: ['steam', 'epic']
    },
    {
      id: 7,
      title: "GTA V",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
      category: "action",
      rating: 4.9,
      playtime: "150h",
      status: "installed",
      platforms: ['rockstar', 'steam', 'epic']
    },
    {
      id: 8,
      title: "Assassin's Creed Valhalla",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=600&fit=crop",
      category: "action",
      rating: 4.3,
      playtime: "90h",
      status: "available",
      platforms: ['ubisoft', 'epic']
    }
  ]

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory)

  const toggleFavorite = (gameId: number) => {
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    )
  }

  return (
    <div className="min-h-screen bg-gaming-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gaming-purple/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-gaming-cyan/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Glassmorphism */}
        <div className="mb-8 backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gaming-purple via-gaming-cyan to-gaming-pink bg-clip-text text-transparent mb-2">
                My Games Library
              </h1>
              <p className="text-gray-400 text-lg">Your collection of cloud games ready to play instantly</p>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <div className="text-4xl font-bold text-white">{games.length}</div>
                <div className="text-gaming-cyan text-sm">Total Games</div>
              </div>
            </div>
          </div>
          
          {!hasActiveSubscription && (
            <div className="relative overflow-hidden bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-6 mt-4">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LockClosedIcon className="w-12 h-12 text-white" />
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">Unlock Your Gaming Potential</h3>
                    <p className="text-white/90">Subscribe to a plan to start playing your games instantly</p>
                  </div>
                </div>
                <Link href="/profile/subscription" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
                  View Plans
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Stats with Modern Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="backdrop-blur-xl bg-gradient-to-br from-gaming-cyan/20 to-gaming-cyan/5 rounded-xl p-6 border border-gaming-cyan/30 hover:border-gaming-cyan transition-all">
            <div className="text-4xl font-bold text-gaming-cyan mb-2">{games.filter(g => g.status === 'installed').length}</div>
            <div className="text-gray-300 text-sm">Ready to Play</div>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-br from-gaming-pink/20 to-gaming-pink/5 rounded-xl p-6 border border-gaming-pink/30 hover:border-gaming-pink transition-all">
            <div className="text-4xl font-bold text-gaming-pink mb-2">
              {games.reduce((acc, game) => acc + parseInt(game.playtime), 0)}h
            </div>
            <div className="text-gray-300 text-sm">Total Playtime</div>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl p-6 border border-yellow-500/30 hover:border-yellow-500 transition-all">
            <div className="text-4xl font-bold text-yellow-400 mb-2">{favorites.length}</div>
            <div className="text-gray-300 text-sm">Favorites</div>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-br from-gaming-purple/20 to-gaming-purple/5 rounded-xl p-6 border border-gaming-purple/30 hover:border-gaming-purple transition-all">
            <div className="text-4xl font-bold text-gaming-purple mb-2">{games.filter(g => g.status === 'available').length}</div>
            <div className="text-gray-300 text-sm">Available</div>
          </div>
        </div>

        {/* Filters with Pills */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FunnelIcon className="w-6 h-6 text-gaming-cyan" />
            <span className="font-semibold text-white text-lg">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white shadow-lg shadow-gaming-purple/50'
                    : 'backdrop-blur-xl bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div key={game.id} onClick={() => window.location.href = `/games/${game.id}`} className="group relative backdrop-blur-xl bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-gaming-purple/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gaming-purple/20 hover:-translate-y-2 cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${
                    game.status === 'free-demo'
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white animate-pulse'
                      : game.status === 'installed'
                      ? 'bg-green-500/90 text-white'
                      : 'bg-yellow-500/90 text-black'
                  }`}>
                    {game.status === 'free-demo' ? '🎁 FREE DEMO' : game.status === 'installed' ? '✓ Ready' : 'Available'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => toggleFavorite(game.id)}
                    className="p-2.5 backdrop-blur-md bg-black/30 rounded-full hover:bg-black/60 transition-all transform hover:scale-110"
                  >
                    {favorites.includes(game.id) ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <button className="p-2.5 backdrop-blur-md bg-black/30 rounded-full hover:bg-black/60 transition-all transform hover:scale-110">
                    <ShareIcon className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center" onClick={(e) => e.preventDefault()}>
                  {game.isFreeDemo ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/games/${game.id}`
                      }}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all shadow-2xl flex items-center space-x-2"
                    >
                      <PlayIcon className="w-6 h-6" />
                      <span>Play Free Demo</span>
                    </button>
                  ) : hasActiveSubscription ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/games/${game.id}`
                      }}
                      className="bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all shadow-2xl flex items-center space-x-2"
                    >
                      <PlayIcon className="w-6 h-6" />
                      <span>{game.status === 'installed' ? 'Play Now' : 'Install & Play'}</span>
                    </button>
                  ) : (
                    <Link href="/profile/subscription" className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all shadow-2xl flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <LockClosedIcon className="w-6 h-6" />
                      <span>Subscribe to Play</span>
                    </Link>
                  )}
                </div>
                
                {/* Game Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gaming-cyan transition-colors">
                    {game.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-gaming-purple/80 backdrop-blur-md text-white text-xs font-medium rounded-full capitalize">
                        {game.category}
                      </span>
                      <span className="text-gray-300 text-sm">{game.playtime}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="text-white text-sm font-medium">{game.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg">No games found in this category</div>
          </div>
        )}
      </div>
    </div>
  )
}