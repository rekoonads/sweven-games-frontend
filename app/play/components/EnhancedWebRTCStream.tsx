'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  SignalIcon, 
  WifiIcon, 
  ArrowPathIcon,
  InformationCircleIcon,
  ChartBarIcon,
  CogIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';

interface StreamMetrics {
  fps: number;
  bitrate: number;
  latency: number;
  packetLoss: number;
  resolution: string;
}

interface EnhancedWebRTCStreamProps {
  sessionId: string;
  gameName: string;
  platform: string;
  onConnectionStateChange: (state: string) => void;
  onError: (error: string) => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const EnhancedWebRTCStream: React.FC<EnhancedWebRTCStreamProps> = ({
  sessionId,
  gameName,
  platform,
  onConnectionStateChange,
  onError,
  onToggleFullscreen,
  isFullscreen
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [connectionState, setConnectionState] = useState('disconnected');
  const [metrics, setMetrics] = useState<StreamMetrics>({
    fps: 0,
    bitrate: 0,
    latency: 0,
    packetLoss: 0,
    resolution: '0x0'
  });
  const [showMetrics, setShowMetrics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [isMuted, setIsMuted] = useState(false);

  // Simulate connection state changes
  useEffect(() => {
    if (!sessionId) return;

    setConnectionState('initializing');
    onConnectionStateChange('initializing');

    const initTimer = setTimeout(() => {
      setConnectionState('connecting');
      onConnectionStateChange('connecting');

      const connectTimer = setTimeout(() => {
        setConnectionState('connected');
        onConnectionStateChange('connected');
        
        // Start metrics simulation
        startMetricsSimulation();
      }, 2000);
      
      return () => clearTimeout(connectTimer);
    }, 1000);

    return () => clearTimeout(initTimer);
  }, [sessionId]);

  // Simulate metrics updates
  const startMetricsSimulation = () => {
    const interval = setInterval(() => {
      setMetrics({
        fps: Math.floor(Math.random() * 10) + 50, // 50-60 FPS
        bitrate: Math.floor(Math.random() * 5000) + 10000, // 10-15 Mbps
        latency: Math.floor(Math.random() * 20) + 10, // 10-30 ms
        packetLoss: Math.random() * 0.5, // 0-0.5%
        resolution: '1920x1080'
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const getConnectionStatusColor = () => {
    switch (connectionState) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionState) {
      case 'connected': return 'Live';
      case 'connecting': return 'Connecting';
      case 'initializing': return 'Initializing';
      case 'error': return 'Error';
      default: return 'Disconnected';
    }
  };

  const handleRetry = () => {
    setConnectionState('initializing');
    onConnectionStateChange('initializing');
    
    setTimeout(() => {
      setConnectionState('connecting');
      onConnectionStateChange('connecting');
      
      setTimeout(() => {
        setConnectionState('connected');
        onConnectionStateChange('connected');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="relative w-full h-full bg-gray-900">
      {/* Main Video Area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
          {connectionState === 'connected' ? (
            <>
              <div className="text-center text-white">
                <div className="text-6xl mb-6">🎮</div>
                <h2 className="text-3xl font-bold mb-2">Game Stream Active</h2>
                <p className="text-xl text-green-400">Connected to Session: {sessionId.substring(0, 8)}...</p>
                <div className="mt-4 flex justify-center space-x-6">
                  <div className="flex items-center">
                    <SignalIcon className="w-5 h-5 mr-1 text-green-400" />
                    <span>{metrics.fps} FPS</span>
                  </div>
                  <div className="flex items-center">
                    <WifiIcon className="w-5 h-5 mr-1 text-green-400" />
                    <span>{(metrics.bitrate / 1000).toFixed(1)} Mbps</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaming-cyan mb-4"></div>
              <p className="text-white text-lg">
                {connectionState === 'initializing' ? 'Initializing connection...' : 
                 connectionState === 'connecting' ? 'Connecting to game stream...' : 
                 'Disconnected'}
              </p>
              {connectionState === 'error' && (
                <button 
                  onClick={handleRetry}
                  className="mt-4 px-4 py-2 bg-gaming-cyan hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors flex items-center"
                >
                  <ArrowPathIcon className="w-4 h-4 mr-2" />
                  Retry Connection
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Top Overlay Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center ${getConnectionStatusColor()} px-2 py-1 rounded-full`}>
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              <span className="text-white text-xs font-medium">{getConnectionStatusText()}</span>
            </div>
            <div className="text-white text-sm">
              <span className="font-medium">{gameName}</span>
              <span className="mx-2">•</span>
              <span>{platform}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowMetrics(!showMetrics)}
              className="p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
              title="Toggle metrics"
            >
              <ChartBarIcon className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
              title="Settings"
            >
              <CogIcon className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={onToggleFullscreen}
              className="p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="w-5 h-5 text-white" />
              ) : (
                <ArrowsPointingOutIcon className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Panel */}
      {showMetrics && (
        <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 w-64 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium flex items-center">
              <InformationCircleIcon className="w-4 h-4 mr-2" />
              Stream Metrics
            </h3>
            <button 
              onClick={() => setShowMetrics(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">FPS</span>
                <span className="text-white font-medium">{metrics.fps}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-green-500 h-1.5 rounded-full" 
                  style={{ width: `${Math.min(100, metrics.fps / 60 * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Bitrate</span>
                <span className="text-white font-medium">{(metrics.bitrate / 1000).toFixed(1)} Mbps</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${Math.min(100, metrics.bitrate / 20000 * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Latency</span>
                <span className="text-white font-medium">{metrics.latency} ms</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-yellow-500 h-1.5 rounded-full" 
                  style={{ width: `${Math.min(100, metrics.latency / 50 * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Packet Loss</span>
                <span className="text-white font-medium">{metrics.packetLoss.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div 
                  className="bg-red-500 h-1.5 rounded-full" 
                  style={{ width: `${Math.min(100, metrics.packetLoss * 200)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Resolution</span>
              <span className="text-white font-medium">{metrics.resolution}</span>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 w-64 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium flex items-center">
              <CogIcon className="w-4 h-4 mr-2" />
              Stream Settings
            </h3>
            <button 
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Quality</label>
              <select 
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
              >
                <option value="auto">Auto</option>
                <option value="high">High (1080p)</option>
                <option value="medium">Medium (720p)</option>
                <option value="low">Low (480p)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Mute Audio</span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isMuted ? 'bg-gray-600' : 'bg-gaming-cyan'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isMuted ? 'translate-x-1' : 'translate-x-6'
                  }`}
                />
              </button>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <button 
                onClick={handleRetry}
                className="w-full flex items-center justify-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                <ArrowPathIcon className="w-4 h-4 mr-2" />
                Restart Stream
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connection Status Overlay */}
      {(connectionState === 'initializing' || connectionState === 'connecting') && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-center p-6 bg-gray-900/90 rounded-lg backdrop-blur-sm">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gaming-cyan mb-4"></div>
            <p className="text-white text-lg">
              {connectionState === 'initializing' ? 'Initializing connection...' : 'Connecting to game stream...'}
            </p>
            <p className="text-gray-400 text-sm mt-1">Session ID: {sessionId.substring(0, 8)}...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {connectionState === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <div className="text-center p-6 bg-gray-900/90 rounded-lg max-w-md backdrop-blur-sm">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-white text-xl font-bold mb-2">Connection Error</h3>
            <p className="text-gray-300 mb-4">Failed to connect to the game stream. Please try again.</p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-gaming-cyan hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors flex items-center mx-auto"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Retry Connection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedWebRTCStream;