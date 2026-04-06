import React from 'react';

interface ProfileProps {
  userName: string;
  userEmail?: string;
  interests: string[];
  onGoHome: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ 
  userName, 
  userEmail, 
  interests,
  onGoHome 
}) => {
  const sportEmojis: { [key: string]: string } = {
    'football': '🏈',
    'basketball': '🏀',
    'soccer': '⚽',
    'baseball': '⚾',
    'tennis': '🎾',
    'hockey': '🏒',
    'volleyball': '🏐',
    'cricket': '🏏',
    'rugby': '🏉',
    'golf': '⛳',
    'swimming': '🏊',
    'cycling': '🚴',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-8 border border-cyan-500 border-opacity-30 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-6xl mb-4">👤</div>
              <h1 className="text-4xl font-black text-white mb-2">{userName}</h1>
              <p className="text-gray-400 text-lg">{userEmail || 'your@email.com'}</p>
            </div>
            <button
              onClick={onGoHome}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300"
            >
              Explore Platforms
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-600">
            <div className="text-center">
              <p className="text-cyan-400 text-3xl font-black">{interests.length}</p>
              <p className="text-gray-400 text-sm mt-1">Sports Interested</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-400 text-3xl font-black">0</p>
              <p className="text-gray-400 text-sm mt-1">Forums Joined</p>
            </div>
            <div className="text-center">
              <p className="text-pink-400 text-3xl font-black">0</p>
              <p className="text-gray-400 text-sm mt-1">Comments Posted</p>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-8 border border-cyan-500 border-opacity-30 mb-8">
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
            <span>🎯</span> Your Sports Interests
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {interests.length > 0 ? (
              interests.map((sport) => (
                <div
                  key={sport}
                  className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg border border-cyan-400 border-opacity-50 text-center hover:shadow-lg hover:shadow-cyan-500/50 transition"
                >
                  <span className="text-3xl block mb-2">
                    {sportEmojis[sport] || '⚽'}
                  </span>
                  <p className="text-white font-semibold capitalize">
                    {sport.charAt(0).toUpperCase() + sport.slice(1)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full">No interests selected</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Browse Forums */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-6 border border-cyan-500 border-opacity-30 hover:border-cyan-500 transition">
            <span className="text-4xl mb-3 block">💬</span>
            <h3 className="text-xl font-black text-white mb-2">Browse Forums</h3>
            <p className="text-gray-400 text-sm mb-4">
              Join discussions about your favorite sports
            </p>
            <button
              onClick={onGoHome}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Explore →
            </button>
          </div>

          {/* View Polls */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-6 border border-cyan-500 border-opacity-30 hover:border-cyan-500 transition">
            <span className="text-4xl mb-3 block">🗳️</span>
            <h3 className="text-xl font-black text-white mb-2">View Polls</h3>
            <p className="text-gray-400 text-sm mb-4">
              Vote on predictions and predictions
            </p>
            <button
              onClick={onGoHome}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Explore →
            </button>
          </div>

          {/* Connect with Fans */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-6 border border-pink-500 border-opacity-30 hover:border-pink-500 transition">
            <span className="text-4xl mb-3 block">👥</span>
            <h3 className="text-xl font-black text-white mb-2">Connect Fans</h3>
            <p className="text-gray-400 text-sm mb-4">
              Find and connect with other sports fans
            </p>
            <button
              onClick={onGoHome}
              className="text-pink-400 hover:text-pink-300 font-semibold transition"
            >
              Explore →
            </button>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl shadow-2xl p-8 border border-yellow-500 border-opacity-30">
          <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
            <span>🏆</span> Welcome Badge
          </h3>
          <p className="text-gray-300 mb-4">
            Welcome to SportsConnect, {userName}! You've officially joined our sports community. Start exploring forums, voting on polls, and connecting with other fans!
          </p>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl">
              🎖️
            </div>
            <div>
              <p className="text-yellow-300 font-bold">New Member</p>
              <p className="text-gray-400 text-sm">Earned on signup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
