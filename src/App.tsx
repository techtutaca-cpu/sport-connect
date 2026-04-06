import React, { useState } from 'react';
import './App.css';
import { ForumsList } from './components/ForumsList';
import { Comments } from './components/Comments';
import { Polls } from './components/Polls';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Auth } from './components/Auth';
import { Survey } from './components/Survey';
import { Profile } from './components/Profile';
import { PersonalizedFeed } from './components/PersonalizedFeed';
import { TrendingSection } from './components/TrendingSection';
import { NewsSection } from './components/NewsSection';
import { DailyChallenges } from './components/DailyChallenges';
import { Messaging } from './components/Messaging';

interface Forum {
  id: number;
  title: string;
  sport: string;
  description: string;
}

function App() {
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyUserName, setSurveyUserName] = useState('');
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  // Load user from localStorage on app start
  React.useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedInterests = localStorage.getItem('userInterests');
    
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsLoggedIn(true);
      setSurveyUserName(savedUser);
      
      if (savedInterests) {
        setUserInterests(JSON.parse(savedInterests));
      }
    }
  }, []);

  // Save user to localStorage whenever login state changes
  React.useEffect(() => {
    if (isLoggedIn && currentUser) {
      localStorage.setItem('currentUser', currentUser);
      localStorage.setItem('userInterests', JSON.stringify(userInterests));
    }
  }, [isLoggedIn, currentUser, userInterests]);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setSelectedForum(null);
  };

  const handleSignupComplete = (userName: string) => {
    setSurveyUserName(userName);
    setCurrentUser(userName);
    setIsLoggedIn(true);
    setShowSurvey(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setSurveyUserName('');
    setUserInterests([]);
    setShowProfile(false);
    setCurrentPage('home');
    
    // Clear localStorage on logout
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userInterests');
  };

  const handleSurveyComplete = (interests: string[]) => {
    setUserInterests(interests);
    setShowSurvey(false);
    setShowProfile(true);
    
    // Auto-close profile after 2 seconds
    setTimeout(() => {
      setShowProfile(false);
      setCurrentPage('home');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <Navigation 
        onNavClick={handleNavClick} 
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="min-h-screen">
        {showSurvey && (
          <Survey userName={surveyUserName} onComplete={handleSurveyComplete} />
        )}

        {showProfile && (
          <Profile 
            userName={surveyUserName} 
            interests={userInterests}
            onGoHome={() => {
              setShowProfile(false);
              setCurrentPage('home');
            }}
          />
        )}

        {!showSurvey && !showProfile && currentPage === 'home' && (
          <>
            <Hero />
            <div className="max-w-6xl mx-auto px-4 py-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ForumsList onSelectForum={setSelectedForum} />
                  <div className="mt-8">
                    <DailyChallenges />
                  </div>
                </div>
                <div className="lg:sticky lg:top-6 lg:h-fit">
                  <Polls />
                </div>
              </div>
            </div>
          </>
        )}

        {!showSurvey && !showProfile && currentPage === 'news' && (
          <NewsSection />
        )}

        {!showSurvey && !showProfile && currentPage === 'feed' && (
          <PersonalizedFeed userInterests={userInterests} />
        )}

        {!showSurvey && !showProfile && currentPage === 'trending' && (
          <TrendingSection />
        )}

        {currentPage === 'forums' && selectedForum === null && (
          <div className="max-w-6xl mx-auto px-4 py-10">
            <ForumsList onSelectForum={setSelectedForum} />
          </div>
        )}

        {selectedForum !== null && (
          <div className="max-w-6xl mx-auto px-4 py-10">
            <button
              onClick={() => {
                setSelectedForum(null);
                setCurrentPage('forums');
              }}
              className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold text-lg transition flex items-center gap-2"
            >
              ← Back to Forums
            </button>

            <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl shadow-2xl p-8 mb-8 border border-cyan-500 border-opacity-30">
              <h2 className="text-4xl font-black text-white">{selectedForum.title}</h2>
              <p className="text-gray-300 mt-4 text-lg">{selectedForum.description}</p>
              <div className="mt-6 flex items-center gap-2">
                <span className="text-3xl">🏆</span>
                <p className="text-gray-400">
                  Category: <span className="font-bold text-cyan-400 capitalize">{selectedForum.sport}</span>
                </p>
              </div>
            </div>

            <Comments forumId={selectedForum.id} />

            <div className="mt-8">
              <Polls />
            </div>
          </div>
        )}

        {!showSurvey && !showProfile && currentPage === 'social' && (
          <Messaging currentUser={currentUser} />
        )}

        {!showSurvey && (currentPage === 'login' || currentPage === 'signup') && (
          <Auth mode={currentPage} onSignupComplete={handleSignupComplete} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-8 mt-16 border-t border-cyan-500 border-opacity-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-lg font-semibold">© 2026 SportsConnect</p>
            <p className="mt-2">Built with ❤️ for sports fans worldwide</p>
            <p className="text-sm mt-3 text-gray-500">Where passion meets community</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
