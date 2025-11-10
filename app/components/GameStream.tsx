'use client'

import { useEffect, useRef } from 'react'

interface GameStreamProps {
  gameId: string
  platform: string
  onClose: () => void
}

export default function GameStream({ gameId, platform, onClose }: GameStreamProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Initialize WebRTC connection
    const initStream = () => {
      if (iframeRef.current) {
        iframeRef.current.src = `/webrtc?game=${gameId}&platform=${platform}`
      }
    }

    initStream()
  }, [gameId, platform])

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Exit Game
        </button>
      </div>
      
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Game Stream"
        allow="camera; microphone; gamepad"
      />
    </div>
  )
}