'use client'

import { useState } from 'react'
import { ShoppingCartIcon, StarIcon, TagIcon, FireIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState<number[]>([])

  const categories = [
    { id: 'all', name: 'All Games', icon: '🎮' },
    { id: 'new', name: 'New Releases', icon: '🆕' },
    { id: 'popular', name: 'Popular', icon: '🔥' },
    { id: 'sale', name: 'On Sale', icon: '💰' },
    { id: 'action', name: 'Action', icon: '⚔️' },
    { id: 'rpg', name: 'RPG', icon: '🧙' },
    { id: 'strategy', name: 'Strategy', icon: '🧠' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ]

  const games = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
      category: "rpg",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.5,
      reviews: 1250,
      tags: ['new', 'popular'],
      description: "An open-world, action-adventure story set in Night City"
    },
    {
      id: 2,
      title: "Elden Ring",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
      category: "rpg",
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 2100,
      tags: ['popular', 'sale'],
      description: "A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki"
    },
    {
      id: 3,
      title: "Spider-Man Remastered",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      category: "action",
      price: 39.99,
      originalPrice: 49.99,
      rating: 4.7,
      reviews: 890,
      tags: ['popular', 'sale'],
      description: "Experience the rise of Miles Morales as the new hero masters incredible powers"
    },
    {
      id: 4,
      title: "FIFA 24",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop",
      category: "sports",
      price: 69.99,
      originalPrice: 69.99,
      rating: 4.2,
      reviews: 1500,
      tags: ['new'],
      description: "The world's game with over 19,000 players across 700+ teams"
    },
    {
      id: 5,
      title: "Forza Horizon 5",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=600&fit=crop",
      category: "racing",
      price: 29.99,
      originalPrice: 59.99,
      rating: 4.6,
      reviews: 750,
      tags: ['sale', 'popular'],
      description: "Your greatest Horizon Adventure awaits in vibrant and ever-evolving Mexico"
    },
    {
      id: 6,
      title: "Civilization VI",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
      category: "strategy",
      price: 19.99,
      originalPrice: 39.99,
      rating: 4.4,
      reviews: 980,
      tags: ['sale'],
      description: "Build an empire to stand the test of time in this turn-based strategy game"
    }
  ]

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => 
        game.category === selectedCategory || game.tags.includes(selectedCategory)
      )

  const addToCart = (gameId: number) => {
    if (!cart.includes(gameId)) {
      setCart(prev => [...prev, gameId])
    }
  }

  const removeFromCart = (gameId: number) => {
    setCart(prev => prev.filter(id => id !== gameId))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      i < Math.floor(rating) ? (
        <StarSolidIcon key={i} className="w-4 h-4 text-yellow-400" />
      ) : (
        <StarIcon key={i} className="w-4 h-4 text-gray-400" />
      )
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Game Store</h1>
            <p className="text-gray-400 text-lg">Discover and purchase the latest games</p>
          </div>
          
          {/* Cart */}
          <div className="relative">
            <button className="flex items-center space-x-2 bg-gaming-purple hover:bg-gaming-purple/80 text-white px-4 py-2 rounded-lg transition-colors">
              <ShoppingCartIcon className="w-5 h-5" />
              <span>Cart ({cart.length})</span>
            </button>
          </div>
        </div>

        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-xl p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <FireIcon className="w-6 h-6 mr-2" />
            <span className="font-semibold">Weekend Sale</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Up to 75% Off</h2>
          <p className="text-white/90 mb-4">Limited time offers on popular games</p>
          <button className="bg-white text-gaming-purple px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gaming-purple text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <div key={game.id} className="card-gaming group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Sale Badge */}
                {game.originalPrice > game.price && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)}%
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="absolute top-3 right-3 flex flex-col space-y-1">
                  {game.tags.includes('new') && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      NEW
                    </span>
                  )}
                  {game.tags.includes('popular') && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      HOT
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white group-hover:text-gaming-cyan transition-colors">
                  {game.title}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-2">
                  {game.description}
                </p>
                
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(game.rating)}
                  </div>
                  <span className="text-gray-400 text-sm">({game.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gaming-cyan">
                      ${game.price}
                    </span>
                    {game.originalPrice > game.price && (
                      <span className="text-gray-400 line-through text-sm">
                        ${game.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {cart.includes(game.id) ? (
                    <button
                      onClick={() => removeFromCart(game.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(game.id)}
                      className="btn-primary"
                    >
                      Add to Cart
                    </button>
                  )}
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