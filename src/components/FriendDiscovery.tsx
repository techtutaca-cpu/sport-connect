import React, { useState, useMemo } from 'react';

interface UserProfile {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  interests: string[];
  forumsMember: string[];
  points: number;
  isFollowing: boolean;
}

// Mock user database
const allUsers: UserProfile[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: '👨‍🦱',
    bio: 'Football fanatic | Stats geek | Always predicting the next big upset',
    interests: ['Football', 'Analysis', 'Predictions'],
    forumsMember: ['Football', 'Sports Analysis'],
    points: 2450,
    isFollowing: false,
  },
  {
    id: 2,
    name: 'Maria Garcia',
    avatar: '👩‍🦰',
    bio: 'Soccer is life! ⚽ Love discussing tactics and player performances',
    interests: ['Soccer', 'Tactics', 'International Matches'],
    forumsMember: ['Soccer', 'World Cup Discussion'],
    points: 1820,
    isFollowing: false,
  },
  {
    id: 3,
    name: 'Chris Lee',
    avatar: '👨‍🦲',
    bio: 'Basketball enthusiast | NBA expert | Always up for friendly debates',
    interests: ['Basketball', 'NBA', 'Debates'],
    forumsMember: ['Basketball', 'NBA Analysis'],
    points: 3100,
    isFollowing: false,
  },
  {
    id: 4,
    name: 'Sarah Smith',
    avatar: '👩‍🦱',
    bio: 'Multi-sport fan | Love connecting with sports community members',
    interests: ['Football', 'Basketball', 'Tennis'],
    forumsMember: ['Football', 'Basketball', 'Tennis Discussions'],
    points: 2650,
    isFollowing: false,
  },
  {
    id: 5,
    name: 'Mike Wilson',
    avatar: '👨',
    bio: 'Sports prediction wizard 🔮 | Always making bold predictions',
    interests: ['Predictions', 'Analytics', 'Sports Science'],
    forumsMember: ['Predictions Forum', 'Sports Analytics'],
    points: 2890,
    isFollowing: false,
  },
  {
    id: 6,
    name: 'Emma Davis',
    avatar: '👩‍🦲',
    bio: 'Tennis & Badminton enthusiast | Court is my second home',
    interests: ['Tennis', 'Badminton', 'Training Tips'],
    forumsMember: ['Tennis', 'Badminton Community'],
    points: 1550,
    isFollowing: false,
  },
  {
    id: 7,
    name: 'James Brown',
    avatar: '👨‍🦱',
    bio: 'Historic sports moments collector | Love sports history discussions',
    interests: ['Sports History', 'Archives', 'Legacy'],
    forumsMember: ['Sports History Forum', 'Legends Discussion'],
    points: 2200,
    isFollowing: false,
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    avatar: '👩‍🦰',
    bio: 'Fitness & sports training advocate | Wellness enthusiast',
    interests: ['Training', 'Fitness', 'Wellness'],
    forumsMember: ['Training Forum', 'Fitness Discussion'],
    points: 1900,
    isFollowing: false,
  },
];

export const FriendDiscovery: React.FC<{ currentUser: string }> = ({ currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UserProfile[]>(allUsers);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.forumsMember.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, users]);

  const handleAddFriend = (userId: number) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-black text-white mb-2">🔍 Find Friends</h1>
        <p className="text-gray-400 text-lg mb-8">Discover and connect with sports fans who share your interests</p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, interests, or forums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 bg-slate-800 border-2 border-cyan-500 border-opacity-50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 text-lg"
            />
            <span className="absolute right-4 top-4 text-2xl">🔍</span>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-cyan-300 font-semibold">
          Found {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-xl shadow-2xl border border-cyan-500 border-opacity-30 p-6 hover:border-cyan-400 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{user.avatar}</span>
                  <div>
                    <h3 className="text-white font-bold text-lg">{user.name}</h3>
                    <p className="text-cyan-300 text-sm font-semibold">⭐ {user.points} pts</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{user.bio}</p>

              {/* Interests */}
              <div className="mb-4">
                <p className="text-cyan-300 font-semibold text-xs mb-2">INTERESTS</p>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-cyan-500 bg-opacity-20 text-cyan-300 rounded-full text-xs font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Forums */}
              <div className="mb-6">
                <p className="text-cyan-300 font-semibold text-xs mb-2">MEMBER OF</p>
                <div className="flex flex-wrap gap-2">
                  {user.forumsMember.map((forum, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-300 rounded-full text-xs border border-blue-400 border-opacity-40"
                    >
                      {forum}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add Friend Button */}
              <button
                onClick={() => handleAddFriend(user.id)}
                className={`w-full py-3 rounded-lg font-bold transition duration-300 ${
                  user.isFollowing
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 text-white'
                }`}
              >
                {user.isFollowing ? '✓ Following' : '+ Add Friend'}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-400 text-lg">No users found matching your search</p>
            <p className="text-gray-500 text-sm mt-2">Try searching for different interests or forum names</p>
          </div>
        )}
      </div>
    </div>
  );
};
