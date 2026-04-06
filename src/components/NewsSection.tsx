import React, { useState, useEffect } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  sport: string;
  category: string;
  date: string;
  emoji: string;
  image?: string;
  source: string;
  readTime: number;
  url: string;
}

interface NewsSectionProps {
  onSelectArticle?: (article: NewsArticle) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectArticle }) => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'breaking', 'transfers', 'analysis', 'interviews', 'highlights'];

  useEffect(() => {
    // Fetch news from backend API
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/news?category=sports&limit=20');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNewsArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to mock data if API fails
        const mockNews: NewsArticle[] = [
      {
        id: 1,
        title: 'Historic Victory: Underdog Team Wins Championship Title',
        description: 'In an unprecedented upset, the underdog team defeats the defending champions in a thrilling final match.',
        content: 'In an unprecedented upset that shocked the sports world, the underdog team defeated the defending champions 3-2 in a thrilling final match. The victory marks their first championship title in 25 years. The team showed exceptional skill and determination throughout the tournament.',
        sport: 'football',
        category: 'breaking',
        date: '2 hours ago',
        emoji: '🏈',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
        source: 'ESPN',
        readTime: 5,
        url: 'https://www.espn.com/nfl/',
      },
      {
        id: 2,
        title: 'Star Player Announces Transfer to Premium League',
        description: 'One of the sport\'s biggest names signs a record-breaking contract with a top-tier team.',
        content: 'In a move that shocked the sports community, the star player has announced their transfer to one of the premium leagues. The deal is reportedly worth over $100 million, making it one of the biggest transfers in sports history. The player expressed excitement about the new chapter in their career.',
        sport: 'soccer',
        category: 'transfers',
        date: '4 hours ago',
        emoji: '⚽',
        image: 'https://images.unsplash.com/photo-1517747231723-46341504e3e1?w=500&h=300&fit=crop',
        source: 'Sky Sports',
        readTime: 4,
        url: 'https://www.skysports.com/football/news/transfers',
      },
      {
        id: 3,
        title: 'In-Depth Analysis: Season Performance Review',
        description: 'Sports experts break down the best and worst performances from this season.',
        content: 'In our comprehensive season review, we analyze the performances of all major players and teams. This season has been marked by surprising upsets, record-breaking achievements, and intense rivalries. Our analysis covers the standout moments and turning points that defined the season.',
        sport: 'basketball',
        category: 'analysis',
        date: '6 hours ago',
        emoji: '🏀',
        image: 'https://images.unsplash.com/photo-1546519638-68711109d298?w=500&h=300&fit=crop',
        source: 'NBA.com',
        readTime: 8,
        url: 'https://www.nba.com/news',
      },
      {
        id: 4,
        title: 'Exclusive Interview: Championship MVP Reflects on Victory',
        description: 'The Most Valuable Player shares their thoughts on winning the championship and future goals.',
        content: 'In an exclusive interview, the championship MVP discusses the journey to winning the title, the team dynamics, and their vision for the future. They talk about the challenges faced, the support from fans, and their commitment to maintaining excellence.',
        sport: 'basketball',
        category: 'interviews',
        date: '8 hours ago',
        emoji: '🏀',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&h=300&fit=crop',
        source: 'The Athletic',
        readTime: 6,
        url: 'https://theathletic.com/',
      },
      {
        id: 5,
        title: 'Best Highlights: Top 10 Plays This Week',
        description: 'Check out the most exciting and skillful plays from across all sports this week.',
        content: 'This week has been filled with amazing plays and incredible moments. From stunning goals to jaw-dropping defensive plays, athletes have provided fans with memorable highlights. Watch as we countdown the top 10 plays that defined this week\'s action.',
        sport: 'soccer',
        category: 'highlights',
        date: '10 hours ago',
        emoji: '⚽',
        image: 'https://images.unsplash.com/photo-1493177871519-735854fef039?w=500&h=300&fit=crop',
        source: 'BBC Sport',
        readTime: 3,
        url: 'https://www.bbc.com/sport/football',
      },
      {
        id: 6,
        title: 'Breaking: New Tournament Announced for Next Season',
        description: 'League officials announce an exciting new tournament format for the upcoming season.',
        content: 'In a major announcement, league officials have revealed plans for a new tournament that will feature teams from around the world. The new format promises increased competition and more engaging matches for fans. Details about the schedule and participants will be revealed next month.',
        sport: 'tennis',
        category: 'breaking',
        date: '12 hours ago',
        emoji: '🎾',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=300&fit=crop',
        source: 'ATP Tour',
        readTime: 5,
        url: 'https://www.atptour.com/',
      },
    ];

        setNewsArticles(mockNews);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = selectedCategory === 'all'
    ? newsArticles
    : newsArticles.filter(article => article.category === selectedCategory);

  if (selectedArticle && !onSelectArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-cyan-400 hover:text-cyan-300 font-bold text-lg transition flex items-center gap-2"
          >
            ← Back to News
          </button>

          {/* Article Header */}
          <article className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl shadow-2xl overflow-hidden border border-cyan-500 border-opacity-30">
            {/* Featured Image */}
            {selectedArticle.image && (
              <div className="w-full h-96 overflow-hidden bg-slate-700">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{selectedArticle.emoji}</span>
                <div>
                  <span className="text-sm bg-cyan-500 bg-opacity-20 text-cyan-300 px-3 py-1 rounded-full font-semibold capitalize">
                    {selectedArticle.category}
                  </span>
                  <p className="text-gray-400 text-sm mt-2">{selectedArticle.source} • {selectedArticle.date}</p>
                </div>
              </div>

              <h1 className="text-4xl font-black text-white mb-4">{selectedArticle.title}</h1>
              
              <div className="flex items-center gap-4 mb-6 text-gray-400 text-sm">
                <span className="capitalize font-semibold text-cyan-300">{selectedArticle.sport}</span>
                <span>•</span>
                <span>⏱️ {selectedArticle.readTime} min read</span>
              </div>

              <div className="border-t border-slate-600 pt-6">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{selectedArticle.content}</p>
                
                <div className="mt-8 pt-6 border-t border-slate-600">
                  <div className="flex gap-3 mb-6">
                    <a
                      href={selectedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition text-center"
                    >
                      🔗 Read Full Article on {selectedArticle.source}
                    </a>
                  </div>

                  <p className="text-gray-400 text-sm mb-3">
                    Share this article on social media or discuss it in our forums!
                  </p>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex-1">
                      Share on Twitter
                    </button>
                    <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition flex-1">
                      Share on Facebook
                    </button>
                  </div>
                </div>
              </div>
              </div>
              </article>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-12 text-cyan-400">Loading news...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">📰 Latest Sports News</h1>
          <p className="text-gray-400 text-lg">Stay updated with breaking news and stories from around the sports world</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition duration-300 capitalize ${
               selectedCategory === cat
                 ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                 : 'bg-slate-700 text-gray-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => {
                if (onSelectArticle) {
                  onSelectArticle(article);
                } else {
                  setSelectedArticle(article);
                }
              }}
              className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-xl shadow-2xl overflow-hidden border border-cyan-500 border-opacity-30 hover:border-cyan-400 transition duration-300 cursor-pointer transform hover:scale-105"
            >
              {/* Image */}
              {article.image && (
                <div className="relative w-full h-48 overflow-hidden bg-slate-700">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Emoji & Category */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{article.emoji}</span>
                  <span className="text-xs bg-cyan-500 bg-opacity-20 text-cyan-300 px-3 py-1 rounded-full font-semibold capitalize">
                    {article.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">{article.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-2">{article.description}</p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-slate-600 pt-4">
                  <span className="capitalize font-semibold text-cyan-300">{article.sport}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>⏱️ {article.readTime} min</span>
                  <span className="ml-auto text-cyan-400 hover:text-cyan-300 font-semibold">
                    Read →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
         {filteredNews.length === 0 && (
           <div className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-xl shadow-2xl p-12 border border-cyan-500 border-opacity-30 text-center">
            <span className="text-5xl block mb-4">📭</span>
            <h2 className="text-2xl font-black text-white mb-3">No News Found</h2>
            <p className="text-gray-400">Try selecting a different category to see more articles</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredNews.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105">
              Load More News →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
