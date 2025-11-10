'use client'

import Link from 'next/link'
import { PlayIcon, CloudIcon, DevicePhoneMobileIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { SignUpButton } from '@clerk/nextjs'

export default function HomePage() {
  const featuredGames = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
      genre: "RPG",
      rating: 4.5
    },
    {
      id: 2,
      title: "Elden Ring",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
      genre: "Action RPG",
      rating: 4.8
    },
    {
      id: 3,
      title: "Spider-Man Remastered",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      genre: "Action",
      rating: 4.7
    }
  ]

  const features = [
    {
      icon: CloudIcon,
      title: "Cloud Gaming",
      description: "Play AAA games instantly without downloads or installations"
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Cross-Platform",
      description: "Play on any device - PC, mobile, tablet, or smart TV"
    },
    {
      icon: GlobeAltIcon,
      title: "Global Access",
      description: "Access your games anywhere with low-latency streaming"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gaming-dark via-gray-900 to-black py-20 overflow-hidden">

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gaming-purple via-gaming-cyan to-gaming-pink bg-clip-text text-transparent">
                Game Without
              </span>
              <br />
              <span className="text-white">Limits</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of gaming with Sweven Games. Stream AAA titles instantly on any device with zero downloads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/games" className="btn-primary inline-flex items-center">
                <PlayIcon className="w-5 h-5 mr-2" />
                My Games Library
              </Link>
              <Link href="/store" className="btn-secondary">
                Browse Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Games</h2>
            <p className="text-gray-400 text-lg">Play the latest and greatest games instantly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <Link key={game.id} href={`/games/${game.id}`} className="card-gaming group cursor-pointer block">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="btn-primary inline-flex items-center">
                      <PlayIcon className="w-5 h-5 mr-2" />
                      Play Now
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{game.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gaming-cyan text-sm">{game.genre}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-gray-300 text-sm">{game.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gaming-purple/10 to-gaming-cyan/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-400">AAA Games</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent mb-2">10M+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent mb-2">4K</div>
              <div className="text-gray-400">HDR Streaming</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-gaming-purple to-gaming-cyan bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Sweven Games?</h2>
            <p className="text-gray-400 text-lg">The ultimate cloud gaming experience powered by cutting-edge technology</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-gaming-purple/50 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Play Your Favorite Games</h2>
            <p className="text-gray-400 text-lg">Connect with all major gaming platforms</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🎮</div>
              <div className="text-white font-semibold">Steam</div>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-700/20 to-gray-900/20 rounded-xl p-6 border border-gray-500/30 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">⚡</div>
              <div className="text-white font-semibold">Epic Games</div>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-yellow-500/30 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">⭐</div>
              <div className="text-white font-semibold">Rockstar</div>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-xl p-6 border border-red-500/30 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🎯</div>
              <div className="text-white font-semibold">EA Games</div>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl p-6 border border-blue-400/30 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🔷</div>
              <div className="text-white font-semibold">Ubisoft</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Start gaming in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                <h3 className="text-2xl font-bold text-white mb-4 mt-4">Sign Up</h3>
                <p className="text-gray-400">Create your account in seconds and choose a subscription plan that fits your gaming needs</p>
              </div>
            </div>
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                <h3 className="text-2xl font-bold text-white mb-4 mt-4">Choose Game</h3>
                <p className="text-gray-400">Browse our library of 500+ games and select your gaming platform account</p>
              </div>
            </div>
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
                <h3 className="text-2xl font-bold text-white mb-4 mt-4">Start Playing</h3>
                <p className="text-gray-400">Click play and enjoy instant gaming with 4K HDR streaming on any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Flexible Pricing Plans</h2>
            <p className="text-gray-400 text-lg">Choose the perfect plan for your gaming lifestyle</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-gaming-cyan/50 transition-all">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">🧭 Starter Trial</div>
                <div className="text-4xl font-bold text-gaming-cyan mb-4">₹299</div>
                <div className="text-gray-400 mb-6">5 Hours • 3 Days</div>
                <Link href="/profile/subscription" className="block w-full py-3 bg-gaming-cyan/20 hover:bg-gaming-cyan/30 text-gaming-cyan rounded-lg font-semibold transition-colors">
                  View Plans
                </Link>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-gaming-purple/20 to-gaming-cyan/20 rounded-2xl p-8 border-2 border-gaming-purple transform scale-105">
              <div className="text-center">
                <div className="bg-gaming-purple text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">POPULAR</div>
                <div className="text-2xl font-bold text-white mb-2">⚡ Starter Plan</div>
                <div className="text-4xl font-bold text-white mb-4">₹1,499</div>
                <div className="text-gray-300 mb-6">100 Hours • 30 Days</div>
                <Link href="/profile/subscription" className="block w-full py-3 bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-gaming-purple/50 transition-all">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">💎 Pro+ Plan</div>
                <div className="text-4xl font-bold text-gaming-purple mb-4">₹3,499</div>
                <div className="text-gray-400 mb-6">150 Hours • 30 Days</div>
                <Link href="/profile/subscription" className="block w-full py-3 bg-gaming-purple/20 hover:bg-gaming-purple/30 text-gaming-purple rounded-lg font-semibold transition-colors">
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Gamers Say</h2>
            <p className="text-gray-400 text-lg">Trusted by millions of players worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-300 mb-4">"Amazing experience! No lag, crystal clear graphics. Finally I can play AAA games on my laptop."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gaming-purple rounded-full flex items-center justify-center text-white font-bold mr-3">R</div>
                <div>
                  <div className="text-white font-semibold">Rahul Kumar</div>
                  <div className="text-gray-400 text-sm">Pro+ Member</div>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-300 mb-4">"Best cloud gaming platform in India. Great pricing and excellent game library. Highly recommended!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gaming-cyan rounded-full flex items-center justify-center text-white font-bold mr-3">P</div>
                <div>
                  <div className="text-white font-semibold">Priya Sharma</div>
                  <div className="text-gray-400 text-sm">Starter Member</div>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-300 mb-4">"Game changer for competitive gaming. Low latency and 4K streaming makes all the difference."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gaming-pink rounded-full flex items-center justify-center text-white font-bold mr-3">A</div>
                <div>
                  <div className="text-white font-semibold">Arjun Patel</div>
                  <div className="text-gray-400 text-sm">Arena Pass Member</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gaming-purple via-gaming-cyan to-gaming-pink relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Gaming?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join millions of gamers and experience the future of gaming today. No downloads, no waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <button className="bg-white text-gaming-purple px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
                Get Started Free
              </button>
            </SignUpButton>
            <Link href="/games" className="bg-black/30 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black/50 transition-all transform hover:scale-105 border-2 border-white/30">
              Browse Games
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}