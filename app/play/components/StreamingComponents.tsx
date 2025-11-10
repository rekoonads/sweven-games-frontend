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
  XMarkIcon
} from '@heroicons/react/24/outline';

// Performance Metrics Component
interface PerformanceMetricsProps {
  fps: number;
  bitrate: number;
  latency: number;
  packetLoss: number;
  resolution: string;
  onToggle: () => void;
  isVisible: boolean;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  fps,
  bitrate,
  latency,
  packetLoss,
  resolution,
  onToggle,
  isVisible
}) => {
  if (!isVisible) return null;

  const getQualityColor = (value: number, good: number, warn: number) => {
    if (value <= good) return 'text-green-500';
    if (value <= warn) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityBg = (value: number, good: number, warn: number) => {
    if (value <= good) return 'bg-green-500';
    if (value <= warn) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="absolute top-20 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 w-72 border border-gray-700 z-20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium flex items-center">
          <ChartBarIcon className="w-4 h-4 mr-2" />
          Performance Metrics
        </h3>
        <button 
          onClick={onToggle}
          className="text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400 flex items-center">
              <SignalIcon className="w-4 h-4 mr-1" />
              FPS
            </span>
            <span className={`font-medium ${getQualityColor(60 - fps, 5, 10)}`}>{fps}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getQualityBg(60 - fps, 5, 10)}`} 
              style={{ width: `${Math.min(100, fps / 60 * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400 flex items-center">
              <WifiIcon className="w-4 h-4 mr-1" />
              Bitrate
            </span>
            <span className="text-white font-medium">{(bitrate / 1000).toFixed(1)} Mbps</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${Math.min(100, bitrate / 20000 * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Latency</span>
            <span className={`font-medium ${getQualityColor(latency, 20, 40)}`}>{latency} ms</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getQualityBg(latency, 20, 40)}`} 
              style={{ width: `${Math.min(100, latency / 50 * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Packet Loss</span>
            <span className={`font-medium ${getQualityColor(packetLoss, 0.1, 0.5)}`}>{packetLoss.toFixed(2)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getQualityBg(packetLoss, 0.1, 0.5)}`} 
              style={{ width: `${Math.min(100, packetLoss * 200)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm pt-2 border-t border-gray-700">
          <span className="text-gray-400">Resolution</span>
          <span className="text-white font-medium">{resolution}</span>
        </div>
      </div>
    </div>
  );
};

// Settings Panel Component
interface SettingsPanelProps {
  quality: string;
  isMuted: boolean;
  onQualityChange: (quality: string) => void;
  onMuteToggle: () => void;
  onRestartStream: () => void;
  onToggle: () => void;
  isVisible: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  quality,
  isMuted,
  onQualityChange,
  onMuteToggle,
  onRestartStream,
  onToggle,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-20 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 w-72 border border-gray-700 z-20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium flex items-center">
          <CogIcon className="w-4 h-4 mr-2" />
          Stream Settings
        </h3>
        <button 
          onClick={onToggle}
          className="text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Quality</label>
          <select 
            value={quality}
            onChange={(e) => onQualityChange(e.target.value)}
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
            onClick={onMuteToggle}
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
            onClick={onRestartStream}
            className="w-full flex items-center justify-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Restart Stream
          </button>
        </div>
      </div>
    </div>
  );
};

// Connection Status Component
interface ConnectionStatusProps {
  state: string;
  sessionId: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  state,
  sessionId
}) => {
  const getStatusColor = () => {
    switch (state) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (state) {
      case 'connected': return 'Live';
      case 'connecting': return 'Connecting';
      case 'initializing': return 'Initializing';
      case 'error': return 'Error';
      default: return 'Disconnected';
    }
  };

  return (
    <div className={`flex items-center ${getStatusColor()} px-2 py-1 rounded-full`}>
      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
      <span className="text-white text-xs font-medium">{getStatusText()}</span>
    </div>
  );
};

// Notification System Component
interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onDismiss
}) => {
  if (notifications.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
      case 'success': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'warning': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'error': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default: return <InformationCircleIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-900/90';
      case 'success': return 'bg-green-900/90';
      case 'warning': return 'bg-yellow-900/90';
      case 'error': return 'bg-red-900/90';
      default: return 'bg-gray-900/90';
    }
  };

  return (
    <div className="absolute top-4 right-4 space-y-2 z-30">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={`${getBgColor(notification.type)} backdrop-blur-sm rounded-lg p-3 border border-gray-700 flex items-start max-w-md`}
        >
          <div className="mr-2 mt-0.5">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <p className="text-white text-sm">{notification.message}</p>
            <p className="text-gray-400 text-xs mt-1">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <button 
            onClick={() => onDismiss(notification.id)}
            className="text-gray-400 hover:text-white ml-2"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

// Chat Component
interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: number;
}

interface ChatComponentProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({
  messages,
  onSendMessage,
  isVisible,
  onToggle
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-20 right-4 bg-black/80 backdrop-blur-sm rounded-lg w-80 h-96 border border-gray-700 flex flex-col z-20">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h3 className="text-white font-medium flex items-center">
          <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
          Chat
        </h3>
        <button 
          onClick={onToggle}
          className="text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500 text-sm">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <div className="flex items-baseline">
                  <span className="font-medium text-gaming-cyan mr-2">{msg.user}</span>
                  <span className="text-gray-500 text-xs">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-white mt-1">{msg.message}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-l px-3 py-2 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gaming-cyan hover:bg-cyan-500 text-white px-3 py-2 rounded-r text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

// Tips Panel Component
interface TipsPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const TipsPanel: React.FC<TipsPanelProps> = ({
  isVisible,
  onToggle
}) => {
  if (!isVisible) return null;

  const tips = [
    "Press F11 for fullscreen mode",
    "Adjust quality settings for better performance",
    "Use keyboard shortcuts for quick actions",
    "Check metrics panel for stream quality",
    "Enable chat to communicate with others"
  ];

  return (
    <div className="absolute bottom-20 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 w-72 border border-gray-700 z-20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium flex items-center">
          <LightBulbIcon className="w-4 h-4 mr-2 text-yellow-500" />
          Pro Tips
        </h3>
        <button 
          onClick={onToggle}
          className="text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
      
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="text-sm text-gray-300 flex items-start">
            <span className="text-gaming-cyan mr-2">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};