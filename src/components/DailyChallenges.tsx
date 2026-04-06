import React, { useState, useEffect } from 'react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  type: 'prediction' | 'quiz' | 'guess';
  options: string[];
  correctAnswer?: string;
  points: number;
  completed: boolean;
  sport: string;
  emoji: string;
}

export const DailyChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    // Generate daily challenges (reset daily)
    const mockChallenges: Challenge[] = [
      {
        id: 1,
        title: '🏈 Super Bowl Outcome',
        description: 'Predict which team will win the Super Bowl',
        type: 'prediction',
        options: ['Team A', 'Team B', 'Team C'],
        correctAnswer: 'Team A',
        points: 50,
        completed: false,
        sport: 'football',
        emoji: '🏈',
      },
      {
        id: 2,
        title: '🏀 Basketball Stats',
        description: 'Will LeBron score over 25 points?',
        type: 'quiz',
        options: ['Yes', 'No'],
        correctAnswer: 'Yes',
        points: 30,
        completed: false,
        sport: 'basketball',
        emoji: '🏀',
      },
      {
        id: 3,
        title: '⚽ Soccer Goals',
        description: 'How many goals will be scored in the match?',
        type: 'guess',
        options: ['1-2', '3-4', '5+'],
        correctAnswer: '3-4',
        points: 40,
        completed: false,
        sport: 'soccer',
        emoji: '⚽',
      },
      {
        id: 4,
        title: '🎾 Tennis Ace',
        description: 'Which player will win the Grand Slam?',
        type: 'prediction',
        options: ['Djokovic', 'Nadal', 'Other'],
        correctAnswer: 'Nadal',
        points: 50,
        completed: false,
        sport: 'tennis',
        emoji: '🎾',
      },
    ];

    setChallenges(mockChallenges);
  }, []);

  const handleChallengeAnswer = (challengeId: number, answer: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (challenge && !challenge.completed) {
      const isCorrect = answer === challenge.correctAnswer;
      const points = isCorrect ? challenge.points : 0;

      setUserPoints(prev => prev + points);
      setCompletedToday(prev => prev + 1);

      setChallenges(challenges.map(c =>
        c.id === challengeId
          ? { ...c, completed: true }
          : c
      ));

      if (isCorrect) {
        alert(`🎉 Correct! +${points} points!`);
      } else {
        alert(`❌ Not quite. The answer was: ${challenge.correctAnswer}`);
      }
    }
  };

  const streakBonus = completedToday === challenges.length ? 100 : 0;

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl border border-cyan-500 border-opacity-20 p-6 overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white mb-4">🎯 Daily Challenges</h2>
        
        {/* Points & Streak */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-cyan-900 to-blue-900 rounded-lg p-4 border border-cyan-500 border-opacity-30">
            <p className="text-xs text-cyan-300 font-semibold">TODAY'S POINTS</p>
            <p className="text-2xl font-black text-cyan-400 mt-2">{userPoints + streakBonus}</p>
            {streakBonus > 0 && <p className="text-xs text-green-400 mt-1">+{streakBonus} Streak Bonus! 🔥</p>}
          </div>
          
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-4 border border-cyan-500 border-opacity-30">
            <p className="text-xs text-cyan-300 font-semibold">COMPLETED</p>
            <p className="text-2xl font-black text-blue-400 mt-2">{completedToday}/{challenges.length}</p>
            <p className="text-xs text-gray-400 mt-1">challenges done</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg p-4 border border-cyan-500 border-opacity-30">
            <p className="text-xs text-cyan-300 font-semibold">RANK</p>
            <p className="text-2xl font-black text-pink-400 mt-2">#{Math.floor(userPoints / 100) + 1}</p>
            <p className="text-xs text-gray-400 mt-1">global rank</p>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="space-y-4">
        {challenges.map(challenge => (
          <div
            key={challenge.id}
            className={`rounded-lg p-5 border border-cyan-400 border-opacity-40 transition ${
              challenge.completed
                ? 'bg-gray-700 opacity-60'
                : 'bg-gradient-to-r from-blue-900 to-slate-700 hover:border-cyan-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-white">{challenge.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{challenge.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl">{challenge.emoji}</span>
                <p className="text-xs text-cyan-300 font-semibold mt-1">{challenge.points} pts</p>
              </div>
            </div>

            {!challenge.completed ? (
              <div className="space-y-2">
                {challenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChallengeAnswer(challenge.id, option)}
                    className="w-full p-3 text-left bg-slate-600 hover:bg-cyan-600 border border-cyan-400 border-opacity-30 hover:border-cyan-400 rounded-lg text-white font-semibold transition transform hover:scale-102"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-green-900 bg-opacity-30 rounded-lg border border-green-500 border-opacity-30">
                <p className="text-green-400 font-semibold">✅ Completed!</p>
                <p className="text-sm text-green-300 mt-1">Answer: {challenge.correctAnswer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {completedToday === challenges.length && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900 to-orange-900 rounded-lg border border-yellow-500 border-opacity-30 text-center">
          <p className="text-yellow-300 font-black text-lg">🎊 All challenges completed!</p>
          <p className="text-yellow-200 text-sm mt-2">Come back tomorrow for new challenges and earn more points!</p>
        </div>
      )}
    </div>
  );
};
