import React, { useState, useEffect } from 'react';

interface TrendingItem {
  id: number;
  title: string;
  type: 'forum' | 'poll' | 'discussion';
  sport: string;
  engagement: number; // comments + votes
  emoji: string;
}

export const TrendingSection: React.FC = () => {
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching trending data
    const mockTrending: TrendingItem[] = [
      {
        id: 1,
        title: 'Super Bowl 2026 Predictions',
        type: 'poll',
        sport: 'football',
        engagement: 1250,
        emoji: '🏈',
      },
      {
        id: 2,
        title: 'Best Basketball Players This Season',
        type: 'discussion',
        sport: 'basketball',
        engagement: 890,
        emoji: '🏀',
      },
      {
        id: 3,
        title: 'World Cup 2026 Teams Discussion',
        type: 'forum',
        sport: 'soccer',
        engagement: 756,
        emoji: '⚽',
      },
      {
        id: 4,
        title: 'Tennis Grand Slam Rankings',
        type: 'discussion',
        sport: 'tennis',
        engagement: 543,
        emoji: '🎾',
      },
      {
        id: 5,
        title: 'Hockey Playoff Predictions',
        type: 'poll',
        sport: 'hockey',
        engagement: 432,
        emoji: '🏒',
      },
    ];
    
    setTrendingItems(mockTrending);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-cyan-400">Loading trending...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">🔥 Trending Now</h1>
        <p className="text-gray-400 text-lg">Hottest discussions and polls across all sports</p>
      </div>

      {/* Trending Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {trendingItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-6 border border-cyan-500 border-opacity-30 hover:border-cyan-400 transition duration-300 cursor-pointer transform hover:scale-105"
          >
            {/* Rank Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-black px-3 py-1 rounded-lg ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-600' :
                  'bg-slate-600'
                } text-white`}>
                  #{index + 1}
                </span>
                <span className="text-3xl">{item.emoji}</span>
              </div>
              <span className="text-sm bg-orange-500 bg-opacity-20 text-cyan-300 px-3 py-1 rounded-full font-semibold capitalize">
                {item.type}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
              <span className="capitalize font-semibold text-cyan-300">{item.sport}</span>
              <span>•</span>
              <span>🔥 {item.engagement.toLocaleString()} engagements</span>
            </div>

            {/* Engagement Bar */}
            <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${Math.min((item.engagement / 1250) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105">
          View All Trending →
        </button>
      </div>
    </div>
  );
};
