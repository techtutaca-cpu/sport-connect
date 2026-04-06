import React, { useEffect, useState } from 'react';

interface Forum {
  id: number;
  title: string;
  sport: string;
  description: string;
}

export const ForumsList: React.FC<{ onSelectForum: (forum: Forum) => void }> = ({ onSelectForum }) => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newForum, setNewForum] = useState({
    title: '',
    sport: 'football',
    description: '',
  });

  useEffect(() => {
    // Fetch forums from backend
    fetch('http://localhost:3001/api/forums')
      .then(res => res.json())
      .then(data => {
        setForums(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching forums:', err);
        // Fallback data if backend is down
        setForums([
          { id: 1, title: 'Football', sport: 'football', description: 'Discuss all things football' },
          { id: 2, title: 'Basketball', sport: 'basketball', description: 'NBA and basketball discussions' }
        ]);
        setLoading(false);
      });
  }, []);

  const handleCreateForum = async () => {
    if (!newForum.title.trim() || !newForum.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/forums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newForum)
      });

      if (response.ok) {
        const createdForum = await response.json();
        setForums([...forums, createdForum]);
        setNewForum({ title: '', sport: 'football', description: '' });
        setShowCreateForm(false);
        alert('✅ Forum created successfully!');
      }
    } catch (err) {
      console.error('Error creating forum:', err);
      alert('Failed to create forum');
    }
  };

  if (loading) return <div className="text-center py-12 text-cyan-400 text-lg">Loading forums...</div>;

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl border border-cyan-500 border-opacity-20 overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 flex items-center justify-between">
        <h2 className="text-3xl font-black text-white">🏅 Sports Forums</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 transition"
        >
          + Create Forum
        </button>
      </div>
      <div className="p-6">
        {/* Create Forum Form */}
        {showCreateForm && (
          <div className="mb-6 p-5 bg-gradient-to-br from-blue-900 to-slate-700 rounded-lg border border-cyan-400 border-opacity-40">
            <h3 className="font-bold text-lg text-cyan-300 mb-4">✨ Create New Forum</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Forum name (e.g., Basketball, Soccer)"
                value={newForum.title}
                onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
                className="w-full p-3 bg-slate-600 border border-cyan-400 border-opacity-50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
              />
              <textarea
                placeholder="Forum description..."
                value={newForum.description}
                onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
                className="w-full p-3 bg-slate-600 border border-cyan-400 border-opacity-50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                rows={3}
              />
              <select
                value={newForum.sport}
                onChange={(e) => setNewForum({ ...newForum, sport: e.target.value })}
                className="w-full p-3 bg-slate-600 border border-cyan-400 border-opacity-50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
              >
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="soccer">Soccer</option>
                <option value="tennis">Tennis</option>
                <option value="baseball">Baseball</option>
                <option value="hockey">Hockey</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleCreateForum}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition"
                >
                  Create Forum
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-slate-600 text-gray-300 px-4 py-3 rounded-lg font-bold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
           {forums.map(forum => (
            <button
              key={forum.id}
              onClick={() => onSelectForum(forum)}
              className="w-full text-left p-5 bg-gradient-to-r from-blue-900 to-slate-700 border-2 border-cyan-400 border-opacity-40 rounded-lg hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20 transition duration-300 transform hover:scale-105"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-white">{forum.title}</h3>
                  <p className="text-gray-300 mt-2">{forum.description}</p>
                  <span className="text-sm text-cyan-300 mt-3 inline-block font-semibold">Sport: {forum.sport}</span>
                </div>
                <span className="text-3xl ml-4">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
