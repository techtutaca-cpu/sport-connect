import React, { useState, useEffect } from 'react';

interface FeedItem {
  id: number;
  title: string;
  type: 'forum' | 'poll' | 'discussion';
  sport: string;
  description: string;
  engagement: number;
  emoji: string;
}

interface PersonalizedFeedProps {
  userInterests: string[];
}

export const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({ userInterests }) => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Simulate fetching personalized feed based on interests
    const mockFeed: FeedItem[] = [
      {
        id: 1,
        title: 'Latest News & Updates',
        type: 'forum',
        sport: userInterests[0] || 'soccer',
        description: 'The most recent discussions about your favorite sport',
        engagement: 342,
        emoji: sportEmojis[userInterests[0] || 'soccer'] || '⚽',
      },
      {
        id: 2,
        title: 'This Week\'s Highlights',
        type: 'discussion',
        sport: userInterests[1] || 'basketball',
        description: 'Best moments and plays from this week',
        engagement: 287,
        emoji: sportEmojis[userInterests[1] || 'basketball'] || '🏀',
      },
      {
        id: 3,
        title: 'Upcoming Match Predictions',
        type: 'poll',
        sport: userInterests[2] || 'football',
        description: 'Vote on your predictions for upcoming games',
        engagement: 156,
        emoji: sportEmojis[userInterests[2] || 'football'] || '🏈',
      },
      {
        id: 4,
        title: 'Player Performance Analysis',
        type: 'forum',
        sport: userInterests[0] || 'soccer',
        description: 'Discuss player statistics and performance metrics',
        engagement: 234,
        emoji: sportEmojis[userInterests[0] || 'soccer'] || '⚽',
      },
      {
        id: 5,
        title: 'Team Rankings & Standings',
        type: 'discussion',
        sport: userInterests[1] || 'basketball',
        description: 'Current standings and ranking discussions',
        engagement: 198,
        emoji: sportEmojis[userInterests[1] || 'basketball'] || '🏀',
      },
    ];

    setFeedItems(mockFeed);
    setLoading(false);
  }, [userInterests]);

  if (loading) {
    return <div className="text-center py-12 text-cyan-400">Loading your feed...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">📱 Your Personalized Feed</h1>
        <p className="text-gray-400 text-lg">
          Curated content based on your interests: <span className="text-cyan-300 font-semibold">
            {userInterests.slice(0, 3).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
            {userInterests.length > 3 && ` + ${userInterests.length - 3} more`}
          </span>
        </p>
      </div>

      {/* Feed Items */}
      <div className="space-y-5">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl shadow-2xl p-6 border border-cyan-500 border-opacity-30 hover:border-cyan-400 transition duration-300 cursor-pointer transform hover:translate-x-2"
          >
            <div className="flex items-start gap-4">
              {/* Emoji */}
              <div className="text-4xl mt-1">{item.emoji}</div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <span className="text-xs bg-purple-500 bg-opacity-20 text-cyan-300 px-3 py-1 rounded-full font-semibold capitalize">
                    {item.type}
                  </span>
                </div>

                <p className="text-gray-400 mb-3">{item.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-semibold text-cyan-300 capitalize">{item.sport}</span>
                  <span>•</span>
                  <span>💬 {item.engagement} comments & votes</span>
                  <span>•</span>
                  <button className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
                    Read More →
                  </button>
                </div>
              </div>

              {/* Engagement Badge */}
              <div className="text-right">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-white">{item.engagement}</p>
                  <p className="text-xs text-purple-200">engagements</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Message */}
      {userInterests.length === 0 && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-12 border border-yellow-500 border-opacity-30 text-center">
          <span className="text-5xl block mb-4">⚽</span>
          <h2 className="text-2xl font-black text-white mb-3">Your Feed Will Appear Here</h2>
          <p className="text-gray-400 mb-4">Update your sports interests to see personalized content</p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition">
            Update Interests
          </button>
        </div>
      )}
    </div>
  );
};
