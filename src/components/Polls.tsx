import React, { useEffect, useState } from 'react';

interface Poll {
  id: number;
  title: string;
  options: string[];
  votes: number[];
}

export const Polls: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPollTitle, setNewPollTitle] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);

  // Fetch polls
  useEffect(() => {
    fetch('http://localhost:3001/api/polls')
      .then(res => res.json())
      .then(data => {
        setPolls(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching polls:', err);
        setPolls([]);
        setLoading(false);
      });
  }, []);

  const handleVote = async (pollId: number, optionIndex: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex })
      });

      if (response.ok) {
        const updatedPoll = await response.json();
        setPolls(polls.map(p => p.id === pollId ? updatedPoll : p));
      }
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  const handleCreatePoll = async () => {
    if (!newPollTitle.trim() || newPollOptions.some(o => !o.trim())) {
      alert('Fill in all poll fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPollTitle,
          options: newPollOptions.filter(o => o.trim())
        })
      });

      if (response.ok) {
        const newPoll = await response.json();
        setPolls([...polls, newPoll]);
        setNewPollTitle('');
        setNewPollOptions(['', '']);
      }
    } catch (err) {
      console.error('Error creating poll:', err);
    }
  };

  const getTotalVotes = (poll: Poll) => poll.votes.reduce((a, b) => a + b, 0);
  const getPercentage = (votes: number, total: number) => total === 0 ? 0 : Math.round((votes / total) * 100);

  if (loading) return <div className="text-center py-8 text-cyan-400">Loading polls...</div>;

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl border border-cyan-500 border-opacity-20 p-6 mt-6 overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-black text-white">🗳️ Polls & Predictions</h2>
      </div>

      {/* Create Poll Form */}
      <div className="mb-6 p-5 bg-gradient-to-br from-blue-900 to-slate-700 rounded-lg border border-cyan-400 border-opacity-40">
        <h3 className="font-bold text-lg text-cyan-300 mb-4">✨ Create New Poll</h3>
        <input
          type="text"
          placeholder="What's your poll question?"
          value={newPollTitle}
          onChange={(e) => setNewPollTitle(e.target.value)}
          className="w-full p-3 border border-cyan-400 border-opacity-50 rounded-lg mb-4 bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        />
        <div className="space-y-3 mb-4">
           {newPollOptions.map((option, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}...`}
              value={option}
              onChange={(e) => {
                const updated = [...newPollOptions];
                updated[idx] = e.target.value;
                setNewPollOptions(updated);
              }}
              className="w-full p-3 border border-cyan-400 border-opacity-50 rounded-lg bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            />
          ))}
        </div>
        <button
          onClick={handleCreatePoll}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105"
        >
          🎯 Create Poll
        </button>
      </div>

      {/* Polls Display */}
      <div className="space-y-4">
        {polls.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No polls yet. Create one to get started!</p>
        ) : (
          polls.map(poll => {
            const totalVotes = getTotalVotes(poll);
            return (
              <div key={poll.id} className="border border-cyan-400 border-opacity-40 rounded-lg p-5 bg-gradient-to-r from-blue-900 to-slate-700">
                <h3 className="font-bold text-lg mb-4 text-white">{poll.title}</h3>
                <div className="space-y-3">
                  {poll.options.map((option, idx) => {
                    const percentage = getPercentage(poll.votes[idx], totalVotes);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleVote(poll.id, idx)}
                        className="w-full text-left group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white group-hover:text-cyan-300 transition">{option}</span>
                          <span className="text-sm text-cyan-300 font-bold">{poll.votes[idx]} votes ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3 mt-1 overflow-hidden border border-cyan-400 border-opacity-30">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-slate-500">Total votes: <span className="text-cyan-300 font-bold">{totalVotes}</span></p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
