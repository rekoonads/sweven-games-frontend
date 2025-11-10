'use client';

import React, { useEffect, useRef, useState } from 'react';

interface WebRTCStreamProps {
  sessionId: string;
  onConnectionStateChange: (state: string) => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    OneplayApp: any;
  }
}

const WebRTCStream: React.FC<WebRTCStreamProps> = ({ 
  sessionId, 
  onConnectionStateChange,
  onError
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const streamRef = useRef<any>(null);
  const [connectionState, setConnectionState] = useState('disconnected');

  // Initialize WebRTC connection
  useEffect(() => {
    if (!sessionId || !videoRef.current || !audioRef.current) return;

    onConnectionStateChange('initializing');
    setConnectionState('initializing');

    try {
      // In a real implementation, we would initialize the OnePlay WebRTC client here
      // This is a placeholder for the actual implementation
      initializeWebRTC();
    } catch (error: any) {
      console.error('Failed to initialize WebRTC:', error);
      onError(`Connection failed: ${error.message || error}`);
      onConnectionStateChange('error');
      setConnectionState('error');
    }

    return () => {
      cleanupWebRTC();
    };
  }, [sessionId]);

  const initializeWebRTC = () => {
    // This would be the actual implementation using the OnePlay WebRTC library
    // For now, we'll simulate the connection process
    
    setConnectionState('connecting');
    onConnectionStateChange('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setConnectionState('connected');
      onConnectionStateChange('connected');
      
      // Simulate a video stream for demonstration
      if (videoRef.current) {
        videoRef.current.style.backgroundColor = 'rgba(30, 41, 59, 1)'; // slate-800
        videoRef.current.innerHTML = `
          <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div class="text-6xl mb-6">🎮</div>
            <h2 class="text-3xl font-bold mb-2">Game Stream Active</h2>
            <p class="text-xl text-green-400">Connected to Session: ${sessionId.substring(0, 8)}...</p>
            <div class="mt-8 flex items-center space-x-4">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live - 60 FPS</span>
            </div>
          </div>
        `;
      }
    }, 2000);
  };

  const cleanupWebRTC = () => {
    if (streamRef.current) {
      // In a real implementation, we would clean up the OnePlay WebRTC client here
      streamRef.current = null;
    }
    setConnectionState('disconnected');
    onConnectionStateChange('disconnected');
  };

  return (
    <div className="relative w-full h-full bg-gray-900">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-contain"
      />
      <audio
        ref={audioRef}
        autoPlay
        playsInline
        className="hidden"
      />
      
      {(connectionState === 'initializing' || connectionState === 'connecting') && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaming-cyan mb-4"></div>
            <p className="text-white text-lg">
              {connectionState === 'initializing' ? 'Initializing connection...' : 'Connecting to game stream...'}
            </p>
            <p className="text-gray-400 text-sm mt-2">Session ID: {sessionId.substring(0, 8)}...</p>
          </div>
        </div>
      )}
      
      {connectionState === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
          <div className="text-center p-6 bg-gray-900/80 rounded-lg max-w-md">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-white text-xl font-bold mb-2">Connection Error</h3>
            <p className="text-gray-300 mb-4">Failed to connect to the game stream. Please try again.</p>
            <button 
              onClick={initializeWebRTC}
              className="px-4 py-2 bg-gaming-cyan hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebRTCStream;