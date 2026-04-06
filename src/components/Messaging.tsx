import React, { useState, useEffect } from 'react';
import { FriendDiscovery } from './FriendDiscovery';

interface Friend {
  id: number;
  name: string;
  status: 'online' | 'offline';
  lastMessage?: string;
  lastMessageTime?: string;
  avatar: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  image?: string;
  timestamp: string;
  type: 'text' | 'image';
}

export const Messaging: React.FC<{ currentUser: string }> = ({ currentUser }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'messages' | 'discover'>('messages');

  useEffect(() => {
    // Mock friends list
    const mockFriends: Friend[] = [
      {
        id: 1,
        name: 'Alex Johnson',
        status: 'online',
        lastMessage: 'That goal was insane!',
        lastMessageTime: '2 min ago',
        avatar: '👨‍🦱',
      },
      {
        id: 2,
        name: 'Maria Garcia',
        status: 'online',
        lastMessage: 'Did you watch the game?',
        lastMessageTime: '5 min ago',
        avatar: '👩‍🦰',
      },
      {
        id: 3,
        name: 'Chris Lee',
        status: 'offline',
        lastMessage: 'See you at the match!',
        lastMessageTime: '1 hour ago',
        avatar: '👨‍🦲',
      },
      {
        id: 4,
        name: 'Sarah Smith',
        status: 'online',
        lastMessage: 'Amazing performance!',
        lastMessageTime: '30 min ago',
        avatar: '👩‍🦱',
      },
      {
        id: 5,
        name: 'Mike Wilson',
        status: 'online',
        lastMessage: 'Predictions for next week?',
        lastMessageTime: '45 min ago',
        avatar: '👨',
      },
    ];

    setFriends(mockFriends);
  }, []);

  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriend(friend);
    // Load mock messages for this friend
    const mockMessages: Message[] = [
      {
        id: 1,
        sender: friend.name,
        content: `Hey ${currentUser}! How are you?`,
        timestamp: '10:30 AM',
        type: 'text',
      },
      {
        id: 2,
        sender: currentUser,
        content: 'Great! Did you watch the game last night?',
        timestamp: '10:35 AM',
        type: 'text',
      },
      {
        id: 3,
        sender: friend.name,
        content: 'Yes! That was incredible!',
        timestamp: '10:36 AM',
        type: 'text',
      },
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!selectedFriend || (!newMessage.trim() && !imagePreview)) {
      alert('Please type a message or select an image');
      return;
    }

    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: currentUser,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        type: 'text',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }

    if (imagePreview) {
      const message: Message = {
        id: messages.length + 1,
        sender: currentUser,
        content: 'Sent an image',
        image: imagePreview,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        type: 'image',
      };
      setMessages([...messages, message]);
      setImagePreview(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (activeTab === 'discover') {
    return (
      <div>
        <div className="sticky top-20 z-40 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-4 pb-4 border-b border-cyan-500 border-opacity-30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setActiveTab('messages')}
                className="px-6 py-2 rounded-lg font-bold text-gray-400 hover:text-white transition"
              >
                💬 Messages
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className="px-6 py-2 rounded-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              >
                🔍 Find Friends
              </button>
            </div>
          </div>
        </div>
        <FriendDiscovery currentUser={currentUser} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('messages')}
            className="px-6 py-2 rounded-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
          >
            💬 Messages
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-6 py-2 rounded-lg font-bold text-gray-400 hover:text-white transition"
          >
            🔍 Find Friends
          </button>
        </div>

        <h1 className="text-4xl font-black text-white mb-2">💬 Messages & Friends</h1>
        <p className="text-gray-400 text-lg mb-8">Connect with your sports community</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Friends List */}
          <div className="bg-slate-800 rounded-xl shadow-2xl border border-cyan-500 border-opacity-20 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
              <h2 className="text-xl font-black text-white">👥 Friends ({friends.length})</h2>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {friends.map(friend => (
                <button
                  key={friend.id}
                  onClick={() => handleSelectFriend(friend)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedFriend?.id === friend.id
                      ? 'bg-cyan-600 border border-cyan-400'
                      : 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{friend.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm">{friend.name}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                          }`}
                        />
                        <p className="text-xs text-gray-400">{friend.status}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl shadow-2xl border border-cyan-500 border-opacity-20 overflow-hidden flex flex-col">
            {selectedFriend ? (
              <>
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 border-b border-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedFriend.avatar}</span>
                    <div>
                      <h3 className="text-white font-bold">{selectedFriend.name}</h3>
                      <p className="text-xs text-cyan-300">
                        {selectedFriend.status === 'online' ? '🟢 Online' : '⚫ Offline'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-96">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg p-3 ${
                          msg.sender === currentUser
                            ? 'bg-cyan-600 text-white'
                            : 'bg-slate-700 text-gray-200'
                        }`}
                      >
                        {msg.type === 'text' ? (
                          <p className="break-words">{msg.content}</p>
                        ) : (
                          <div>
                            <img
                              src={msg.image}
                              alt="sent"
                              className="max-w-xs rounded-lg mb-2"
                            />
                            <p className="text-sm text-gray-200">{msg.content}</p>
                          </div>
                        )}
                        <p className="text-xs mt-2 opacity-70">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="px-4 py-2 border-t border-slate-600">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="max-h-32 rounded-lg"
                      />
                      <button
                        onClick={() => setImagePreview(null)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t border-slate-600 p-4 space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 p-3 bg-slate-700 border border-cyan-400 border-opacity-50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                    />
                    <label className="p-3 bg-slate-700 border border-cyan-400 border-opacity-50 rounded-lg cursor-pointer hover:bg-slate-600 transition">
                      📷
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl mb-4">💬</p>
                  <p className="text-gray-400 text-lg">Select a friend to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
