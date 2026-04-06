import React, { useState } from 'react';

interface SurveyProps {
  userName: string;
  onComplete: (interests: string[]) => void;
}

export const Survey: React.FC<SurveyProps> = ({ userName, onComplete }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    { id: 'football', label: '🏈 Football', emoji: '🏈' },
    { id: 'basketball', label: '🏀 Basketball', emoji: '🏀' },
    { id: 'soccer', label: '⚽ Soccer', emoji: '⚽' },
    { id: 'baseball', label: '⚾ Baseball', emoji: '⚾' },
    { id: 'tennis', label: '🎾 Tennis', emoji: '🎾' },
    { id: 'hockey', label: '🏒 Hockey', emoji: '🏒' },
    { id: 'volleyball', label: '🏐 Volleyball', emoji: '🏐' },
    { id: 'cricket', label: '🏏 Cricket', emoji: '🏏' },
    { id: 'rugby', label: '🏉 Rugby', emoji: '🏉' },
    { id: 'golf', label: '⛳ Golf', emoji: '⛳' },
    { id: 'swimming', label: '🏊 Swimming', emoji: '🏊' },
    { id: 'cycling', label: '🚴 Cycling', emoji: '🚴' },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one sport!');
      return;
    }
    onComplete(selectedInterests);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl p-8 border border-cyan-500 border-opacity-30">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-5xl">🎯</span>
            <h2 className="text-3xl font-black text-white mt-4">
              Welcome, {userName}!
            </h2>
            <p className="text-gray-300 mt-2">
              Let us know what sports you're interested in
            </p>
          </div>

          {/* Instructions */}
          <p className="text-gray-400 text-center mb-6">
            Select all the sports you enjoy watching, playing, or discussing:
          </p>

          {/* Sports Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {interests.map((sport) => (
              <button
                key={sport.id}
                onClick={() => toggleInterest(sport.id)}
                className={`p-4 rounded-lg border-2 transition duration-300 transform ${
                  selectedInterests.includes(sport.id)
                    ? 'border-cyan-500 bg-purple-500 bg-opacity-20 shadow-lg shadow-purple-500/50 scale-105'
                    : 'border-cyan-400 border-opacity-40 bg-slate-600 hover:border-cyan-400'
                }`}
              >
                <span className="text-3xl block mb-2">{sport.emoji}</span>
                <span
                  className={`font-semibold ${
                    selectedInterests.includes(sport.id)
                      ? 'text-cyan-300'
                      : 'text-white'
                  }`}
                >
                  {sport.id.charAt(0).toUpperCase() + sport.id.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Count */}
          {selectedInterests.length > 0 && (
            <p className="text-center text-cyan-300 mb-6 font-semibold">
              {selectedInterests.length} sport{selectedInterests.length !== 1 ? 's' : ''} selected
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105 text-lg"
          >
            🎉 Complete Setup & Start Exploring
          </button>

          {/* Skip Option */}
          <button
            onClick={() => onComplete(selectedInterests.length > 0 ? selectedInterests : [])}
            className="w-full mt-4 text-gray-400 hover:text-gray-300 py-2 transition"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};
