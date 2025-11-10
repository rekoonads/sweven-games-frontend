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
  ArrowsPointingOutIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  Bars3Icon,
  PresentationChartLineIcon,
  UserGroupIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { 
  PerformanceMetrics, 
  SettingsPanel, 
  ConnectionStatus, 
  NotificationSystem, 
  ChatComponent, 
  TipsPanel 
} from './StreamingComponents';

// Types
interface StreamMetrics {
  fps: number;
  bitrate: number;
  latency: number;
  packetLoss: number;
  resolution: string;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: number;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: number;
}

interface StreamingDashboardProps {
  sessionId: string;
  gameName: string;
  platform: string;
  onConnectionStateChange: (state: string) => void;
  onError: (error: string) => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const StreamingDashboard: React.FC<StreamingDashboardProps> = ({
  sessionId,
  gameName,
  platform,
  onConnectionStateChange,
  onError,
  onToggleFullscreen,
  isFullscreen
}) => {
  // State management
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
  const [showChat, setShowChat] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [isMuted, setIsMuted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Refs
  const streamRef = useRef<any>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initTimerRef = useRef<NodeJS.Timeout | null>(null);
  const connectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const metricsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Store session info in sessionStorage to prevent duplicate sessions
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionId) {
      try {
        // Store session info
        const sessionInfo = {
          sessionId,
          gameName,
          platform,
          timestamp: Date.now()
        };
        sessionStorage.setItem(`current-session-${sessionId}`, JSON.stringify(sessionInfo));
      } catch (e) {
        console.warn('Could not store session info in sessionStorage', e);
      }
    }
    
    return () => {
      // Clean up session info when component unmounts
      if (typeof window !== 'undefined' && sessionId) {
        try {
          sessionStorage.removeItem(`current-session-${sessionId}`);
        } catch (e) {
          console.warn('Could not remove session info from sessionStorage', e);
        }
      }
    };
  }, [sessionId, gameName, platform]);

  // Simulate connection state changes
  useEffect(() => {
    if (!sessionId) return;

    setConnectionState('initializing');
    onConnectionStateChange('initializing');
    addNotification('info', 'Initializing connection...');

    initTimerRef.current = setTimeout(() => {
      setConnectionState('connecting');
      onConnectionStateChange('connecting');
      addNotification('info', 'Connecting to game server...');

      connectTimerRef.current = setTimeout(() => {
        setConnectionState('connected');
        onConnectionStateChange('connected');
        addNotification('success', 'Successfully connected to game session');
        
        // Start metrics simulation
        startMetricsSimulation();
      }, 2000);
    }, 1000);

    // Cleanup function
    return () => {
      if (initTimerRef.current) {
        clearTimeout(initTimerRef.current);
      }
      if (connectTimerRef.current) {
        clearTimeout(connectTimerRef.current);
      }
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [sessionId]);

  // Simulate metrics updates
  const startMetricsSimulation = () => {
    if (metricsIntervalRef.current) {
      clearInterval(metricsIntervalRef.current);
    }
    
    metricsIntervalRef.current = setInterval(() => {
      setMetrics({
        fps: Math.floor(Math.random() * 10) + 50, // 50-60 FPS
        bitrate: Math.floor(Math.random() * 5000) + 10000, // 10-15 Mbps
        latency: Math.floor(Math.random() * 20) + 10, // 10-30 ms
        packetLoss: Math.random() * 0.5, // 0-0.5%
        resolution: '1920x1080'
      });
    }, 1000);
  };

  // Notification system
  const addNotification = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      id,
      type,
      message,
      timestamp: Date.now()
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-dismiss info notifications after 5 seconds
    if (type === 'info') {
      notificationTimeoutRef.current = setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Chat functionality
  const sendChatMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      user: 'You',
      message,
      timestamp: Date.now()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate response
    setTimeout(() => {
      const responses = [
        "Thanks for the message!",
        "Good luck with your game!",
        "Have fun streaming!",
        "Nice play!",
        "Welcome to the session!"
      ];
      
      const responseMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        user: "System",
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: Date.now()
      };
      
      setChatMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  // Stream control functions
  const handleRetry = () => {
    // Clear any existing timers first
    if (initTimerRef.current) {
      clearTimeout(initTimerRef.current);
    }
    if (connectTimerRef.current) {
      clearTimeout(connectTimerRef.current);
    }
    
    setConnectionState('initializing');
    onConnectionStateChange('initializing');
    addNotification('info', 'Restarting connection...');
    
    initTimerRef.current = setTimeout(() => {
      setConnectionState('connecting');
      onConnectionStateChange('connecting');
      addNotification('info', 'Reconnecting to game server...');
      
      connectTimerRef.current = setTimeout(() => {
        setConnectionState('connected');
        onConnectionStateChange('connected');
        addNotification('success', 'Reconnected successfully');
      }, 2000);
    }, 1000);
  };

  const handleRestartStream = () => {
    addNotification('info', 'Restarting stream...');
    handleRetry();
  };

  // Toggle functions
  const toggleMetrics = () => {
    setShowMetrics(!showMetrics);
    if (!showMetrics) {
      addNotification('info', 'Performance metrics panel opened');
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (!showSettings) {
      addNotification('info', 'Settings panel opened');
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      addNotification('info', 'Chat panel opened');
    }
  };

  const toggleTips = () => {
    setShowTips(!showTips);
    if (!showTips) {
      addNotification('info', 'Pro tips panel opened');
    }
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
                  <div className="flex items-center">
                    <PresentationChartLineIcon className="w-5 h-5 mr-1 text-green-400" />
                    <span>{metrics.latency} ms</span>
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

      {/* Top Control Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
            >
              <Bars3Icon className="w-5 h-5 text-white" />
            </button>
            
            <ConnectionStatus state={connectionState} sessionId={sessionId} />
            
            <div className="text-white text-sm hidden md:block">
              <span className="font-medium">{gameName}</span>
              <span className="mx-2">•</span>
              <span>{platform}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleMetrics}
              className={`p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors ${showMetrics ? 'ring-2 ring-gaming-cyan' : ''}`}
              title="Toggle metrics"
            >
              <ChartBarIcon className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={toggleSettings}
              className={`p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors ${showSettings ? 'ring-2 ring-gaming-cyan' : ''}`}
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

      {/* Side Navigation Panel */}
      {sidebarOpen && (
        <div className="absolute top-16 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 w-64 border border-gray-700 z-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Stream Controls</h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={toggleChat}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                showChat ? 'bg-gaming-cyan/20 text-gaming-cyan' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-3" />
              Chat
            </button>
            
            <button
              onClick={toggleTips}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                showTips ? 'bg-gaming-cyan/20 text-gaming-cyan' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <LightBulbIcon className="w-5 h-5 mr-3" />
              Pro Tips
            </button>
            
            <button
              onClick={handleRestartStream}
              className="w-full flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5 mr-3" />
              Restart Stream
            </button>
            
            <div className="pt-2 mt-2 border-t border-gray-700">
              <div className="text-xs text-gray-500 px-3 py-1">
                Session ID: {sessionId.substring(0, 8)}...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Metrics Panel */}
      <PerformanceMetrics
        fps={metrics.fps}
        bitrate={metrics.bitrate}
        latency={metrics.latency}
        packetLoss={metrics.packetLoss}
        resolution={metrics.resolution}
        isVisible={showMetrics}
        onToggle={toggleMetrics}
      />

      {/* Settings Panel */}
      <SettingsPanel
        quality={quality}
        isMuted={isMuted}
        onQualityChange={setQuality}
        onMuteToggle={() => setIsMuted(!isMuted)}
        onRestartStream={handleRestartStream}
        isVisible={showSettings}
        onToggle={toggleSettings}
      />

      {/* Chat Component */}
      <ChatComponent
        messages={chatMessages}
        onSendMessage={sendChatMessage}
        isVisible={showChat}
        onToggle={toggleChat}
      />

      {/* Tips Panel */}
      <TipsPanel
        isVisible={showTips}
        onToggle={toggleTips}
      />

      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onDismiss={dismissNotification}
      />

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

export default StreamingDashboard;