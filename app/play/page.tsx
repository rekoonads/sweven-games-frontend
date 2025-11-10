'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { XMarkIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import StreamingDashboard from './components/StreamingDashboard'

const gameWallpapers: any = {
  '99': 'https://images.unsplash.com/photo-1511882150382-421056c481d6?w=1920&h=1080&fit=crop',
  '1': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop',
  '2': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop',
  '3': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
}

function PlayPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isSessionReady, setIsSessionReady] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [connectionState, setConnectionState] = useState('disconnected')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const sessionReadyTimerRef = useRef<NodeJS.Timeout | null>(null)
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const gameId = searchParams.get('gameId')
  const platform = searchParams.get('platform')
  const gameName = searchParams.get('gameName')
  // Use existing sessionId from URL params, or generate only once per game
  const sessionId = searchParams.get('sessionId') || (() => {
    // Generate a consistent session ID based on game info
    if (typeof window !== 'undefined') {
      const storedSessionId = sessionStorage.getItem(`game-session-${gameId}`);
      if (storedSessionId) {
        return storedSessionId;
      } else {
        // Create a more consistent session ID based on game ID and timestamp
        const timestamp = Date.now();
        const gameIdHash = gameId ? gameId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
        const randomSuffix = Math.random().toString(36).substr(2, 5);
        const newSessionId = `session-${gameIdHash}-${timestamp}-${randomSuffix}`;
        sessionStorage.setItem(`game-session-${gameId}`, newSessionId);
        return newSessionId;
      }
    }
    // Fallback for server-side rendering
    return `session-${Math.random().toString(36).substr(2, 9)}`;
  })()
  const wallpaper = gameWallpapers[gameId || '1'] || gameWallpapers['1']

  // Generate a consistent session ID based on game and timestamp
  function generateSessionId() {
    // Create a consistent session ID based on game info and current time
    const gameIdentifier = `${gameId || 'unknown'}-${Date.now()}`;
    return 'session-' + btoa(gameIdentifier).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Handle WebRTC connection state changes
  const handleConnectionStateChange = (state: string) => {
    setConnectionState(state)
    if (state === 'connected') {
      setIsStreaming(true)
    }
  }

  // Handle WebRTC errors
  const handleConnectionError = (error: string) => {
    console.error('WebRTC Connection Error:', error)
    // In a real implementation, you would show an error message to the user
  }

  // Simulate WebRTC connection
  useEffect(() => {
    if (!isLoading && !isSessionReady) {
      // Simulate backend signaling that session is ready
      sessionReadyTimerRef.current = setTimeout(() => {
        setIsSessionReady(true)
      }, 3000)
      
      return () => {
        if (sessionReadyTimerRef.current) {
          clearTimeout(sessionReadyTimerRef.current)
        }
      }
    }
  }, [isLoading, isSessionReady])

  useEffect(() => {
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current)
    }
    
    loadingIntervalRef.current = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          if (loadingIntervalRef.current) {
            clearInterval(loadingIntervalRef.current)
          }
          
          loadingTimeoutRef.current = setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
    
    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current)
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50" ref={containerRef}>
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-50">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${wallpaper})` }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <span className="text-5xl">🎮</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{gameName}</h1>
              <p className="text-lg md:text-xl text-gray-300">Initializing game stream...</p>
            </div>

            <div className="w-full max-w-md px-4">
              <div className="bg-gray-800/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-gaming-purple to-gaming-cyan transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-400">Loading assets...</span>
                <span className="text-gaming-cyan font-semibold">{loadingProgress}%</span>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Platform: {platform}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>WebRTC Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Session ID: {sessionId.substring(0, 8)}...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Ready Screen (Sweven Games branding) */}
      {!isLoading && isSessionReady && !isStreaming && (
        <div className="absolute inset-0 z-40">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${wallpaper})` }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center">
            <div className="text-center px-4">
              <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 animate-pulse">
                <span className="text-5xl md:text-6xl">🎮</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{gameName}</h1>
              <p className="text-xl md:text-2xl text-gaming-cyan mb-2">Session Ready</p>
              <p className="text-lg md:text-xl text-gray-300">Connecting to game stream...</p>
              
              <div className="mt-8 md:mt-12 flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-gaming-cyan rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gaming-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gaming-cyan rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              <div className="mt-8 text-gray-400 text-sm">
                <p>Session ID: {sessionId}</p>
                <p className="mt-1">Platform: {platform}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Stream Window with Advanced Dashboard */}
      <div className="w-full h-full relative bg-gray-900">
        {isSessionReady && (
          <StreamingDashboard 
            sessionId={sessionId}
            gameName={gameName || 'Unknown Game'}
            platform={platform || 'Unknown Platform'}
            onConnectionStateChange={handleConnectionStateChange}
            onError={handleConnectionError}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
        )}
      </div>

      {/* Simplified Control Bar for Basic Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3 md:p-4 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 md:p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-5 h-5 text-white" />
                  ) : (
                    <SpeakerWaveIcon className="w-5 h-5 text-white" />
                  )}
                </button>
                
                {/* Connection Status Indicator */}
                <div className="hidden md:flex items-center space-x-2 bg-black/30 px-3 py-1.5 rounded-full">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    connectionState === 'connected' ? 'bg-green-500 animate-pulse' : 
                    connectionState === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
                    'bg-red-500'
                  }`}></div>
                  <span className="text-white text-xs font-medium capitalize">
                    {connectionState.replace('connected', 'Live')}
                  </span>
                </div>
              </div>

              {/* Center Info - Only shown on mobile */}
              <div className="text-center md:hidden absolute left-1/2 transform -translate-x-1/2">
                <div className="text-white font-semibold truncate max-w-[120px] text-sm">{gameName}</div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  onClick={() => router.back()}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <XMarkIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Exit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Controls Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors z-10"
      >
        <span className="text-white text-sm">{showControls ? 'Hide' : 'Show'} Controls</span>
      </button>
    </div>
  )
}

export default function PlayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gaming-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gaming-cyan mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading game...</p>
        </div>
      </div>
    }>
      <PlayPageContent />
    </Suspense>
  )
}