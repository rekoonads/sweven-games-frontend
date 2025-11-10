'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { PlayIcon, HeartIcon, ShareIcon, ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const platforms = [
  { id: 'browser', name: 'Browser (Free)', icon: '🌐', color: 'from-green-500 to-emerald-600' },
  { id: 'steam', name: 'Steam', icon: '🎮', color: 'from-blue-600 to-blue-800' },
  { id: 'epic', name: 'Epic Games', icon: '⚡', color: 'from-gray-700 to-gray-900' },
  { id: 'rockstar', name: 'Rockstar', icon: '⭐', color: 'from-yellow-600 to-orange-600' },
  { id: 'ea', name: 'EA Games', icon: '🎯', color: 'from-red-600 to-red-800' },
  { id: 'ubisoft', name: 'Ubisoft', icon: '🔷', color: 'from-blue-500 to-indigo-600' }
]

const gameData: any = {
  '99': {
    id: 99,
    title: "🎮 Demo: Retro Racer",
    image: "https://images.unsplash.com/photo-1511882150382-421056c481d6?w=1200&h=600&fit=crop",
    genre: "Racing",
    rating: 4.0,
    playtime: "0h",
    description: "Experience the thrill of retro racing! No subscription required - this is a free demo game. Test drive our cloud gaming platform with this exciting arcade-style racer. Race through neon-lit tracks and compete for the best lap times!",
    platforms: ['browser'],
    isFreeDemo: true,
    requirements: {
      os: 'Any (Browser-based)',
      processor: 'Any modern CPU',
      memory: '2 GB RAM',
      graphics: 'Integrated graphics'
    }
  },
  '1': {
    id: 1,
    title: "Cyberpunk 2077",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    genre: "RPG",
    rating: 4.5,
    playtime: "45h",
    description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    platforms: ['steam', 'epic'],
    requirements: {
      os: 'Windows 10',
      processor: 'Intel Core i7-4790',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060'
    }
  },
  '2': {
    id: 2,
    title: "Elden Ring",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop",
    genre: "Action RPG",
    rating: 4.8,
    playtime: "120h",
    description: "A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R.R. Martin.",
    platforms: ['steam'],
    requirements: {
      os: 'Windows 10',
      processor: 'Intel Core i5-8400',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060'
    }
  },
  '3': {
    id: 3,
    title: "Spider-Man Remastered",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
    genre: "Action",
    rating: 4.7,
    playtime: "25h",
    description: "Experience the rise of Miles Morales as the new hero masters incredible powers to become his own Spider-Man.",
    platforms: ['steam', 'epic'],
    requirements: {
      os: 'Windows 10',
      processor: 'Intel Core i5-4670',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 950'
    }
  },
  '4': {
    id: 4,
    title: "FIFA 24",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop",
    genre: "Sports",
    rating: 4.2,
    playtime: "80h",
    description: "The world's game with over 19,000 players across 700+ teams in the most authentic football experience.",
    platforms: ['ea', 'steam'],
    requirements: {
      os: 'Windows 10',
      processor: 'Intel Core i5-6600K',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1050 Ti'
    }
  },
  '7': {
    id: 7,
    title: "GTA V",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=600&fit=crop",
    genre: "Action",
    rating: 4.9,
    playtime: "150h",
    description: "Experience the sprawling city of Los Santos and Blaine County in the ultimate Grand Theft Auto experience.",
    platforms: ['rockstar', 'steam', 'epic'],
    requirements: {
      os: 'Windows 10',
      processor: 'Intel Core i5-3470',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 660'
    }
  },
  '8': {
    id: 8,
    title: "Assassin's Creed Valhalla",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=600&fit=crop",
    genre: "Action",
    rating: 4.3,
    playtime: "90h",
    description: "Become Eivor, a legendary Viking warrior on a quest for glory in the brutal Dark Ages of England.",
    platforms: ['ubisoft', 'epic'],
    requirements: {
      os: 'Windows 10',
      processor: 'Intel Core i5-4460',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GeForce GTX 960'
    }
  }
}

export default function GameDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useUser()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)

  const game = gameData[params.id as string] || gameData['1']
  const hasActiveSubscription = user?.publicMetadata?.subscription === 'active' || false

  const handlePlayGame = () => {
    setIsLaunching(true)

    // Use the default platform for the game
    const defaultPlatform = game.platforms[0]

    // Navigate to play page which embeds the WebRTC client
    const playUrl = `/play?gameId=${game.id}&platform=${defaultPlatform}&gameName=${encodeURIComponent(game.title)}`

    window.location.href = playUrl

    setIsLaunching(false)
  }

  return (
    <div className="min-h-screen bg-gaming-dark">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-gaming-dark/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <button onClick={() => router.back()} className="flex items-center text-white mb-6 hover:text-gaming-cyan transition-colors">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Library
            </button>
            
            <h1 className="text-6xl font-bold text-white mb-4">{game.title}</h1>
            <div className="flex items-center space-x-6">
              <span className="px-4 py-2 bg-gaming-purple rounded-full text-white font-medium">{game.genre}</span>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="text-white text-xl font-semibold">{game.rating}</span>
              </div>
              <span className="text-gray-300">{game.playtime} played</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">About This Game</h2>
              <p className="text-gray-300 leading-relaxed">{game.description}</p>
            </div>

            {/* System Requirements */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">System Requirements</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gaming-cyan font-semibold mb-1">OS</div>
                  <div className="text-gray-300">{game.requirements.os}</div>
                </div>
                <div>
                  <div className="text-gaming-cyan font-semibold mb-1">Processor</div>
                  <div className="text-gray-300">{game.requirements.processor}</div>
                </div>
                <div>
                  <div className="text-gaming-cyan font-semibold mb-1">Memory</div>
                  <div className="text-gray-300">{game.requirements.memory}</div>
                </div>
                <div>
                  <div className="text-gaming-cyan font-semibold mb-1">Graphics</div>
                  <div className="text-gray-300">{game.requirements.graphics}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
              {game.isFreeDemo ? (
                user ? (
                  <button
                    onClick={handlePlayGame}
                    disabled={isLaunching}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
                      !isLaunching
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <PlayIcon className="w-6 h-6" />
                    <span>{isLaunching ? 'Launching...' : 'Play Free Demo'}</span>
                  </button>
                ) : (
                  <Link href="/sign-in" className="block w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg text-center hover:opacity-90 transition-all">
                    Sign In to Play Free Demo
                  </Link>
                )
              ) : hasActiveSubscription ? (
                <button
                  onClick={handlePlayGame}
                  disabled={isLaunching}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
                    !isLaunching
                      ? 'bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white hover:opacity-90'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <PlayIcon className="w-6 h-6" />
                  <span>{isLaunching ? 'Launching...' : 'Play Now'}</span>
                </button>
              ) : (
                <Link href="/profile/subscription" className="block w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-bold text-lg text-center hover:opacity-90 transition-all">
                  Subscribe to Play
                </Link>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-white" />
                  )}
                  <span className="text-white font-medium">Favorite</span>
                </button>
                <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center space-x-2">
                  <ShareIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Share</span>
                </button>
              </div>
            </div>

            {/* Available Platforms */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Available On</h3>
              <div className="flex flex-wrap gap-2">
                {platforms.filter(p => game.platforms.includes(p.id)).map((platform) => (
                  <span key={platform.id} className={`px-3 py-1 bg-gradient-to-r ${platform.color} text-white text-sm rounded-full font-medium`}>
                    {platform.icon} {platform.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}