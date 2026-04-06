import React, { useEffect, useState, useCallback } from 'react';

interface Comment {
  id: number;
  forumId: number;
  text: string;
  author: string;
  timestamp: string;
  likes: number;
  mentions?: string[];
}

export const Comments: React.FC<{ forumId: number }> = ({ forumId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showMentions, setShowMentions] = useState(false);

  // Render comment with highlighted mentions
  const renderCommentWithMentions = (text: string) => {
    const mentionRegex = /(@\w+)/g;
    const parts = text.split(mentionRegex);
    
    return (
      <>
        {parts.map((part, idx) => 
          part.startsWith('@') ? 
            <span key={idx} className="text-cyan-400 font-semibold bg-cyan-500 bg-opacity-10 px-1 rounded">{part}</span>
            : part
        )}
      </>
    );
  };

  // Get list of mentioned users to show suggestions
  const mentionedUsers = Array.from(new Set(comments.map(c => c.author)));

  // Fetch comments - refetch whenever forumId changes or after posting
  const fetchComments = useCallback(() => {
    fetch(`http://localhost:3001/api/forums/${forumId}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching comments:', err);
        setComments([]);
        setLoading(false);
      });
  }, [forumId]);

  useEffect(() => {
    fetchComments();

    // Refresh comments every 3 seconds to see new comments from others
    const interval = setInterval(fetchComments, 3000);

    return () => clearInterval(interval);
  }, [forumId, fetchComments]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !authorName.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/forums/${forumId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newComment,
          author: authorName
        })
      });

      if (response.ok) {
        const comment = await response.json();
        setComments([...comments, comment]);
        setNewComment('');
        setAuthorName('');
        setShowMentions(false);
        
        // Show success message
        alert('✅ Comment posted! Everyone can see it now.');
        
        // Refresh comments to sync with server
        setTimeout(fetchComments, 500);
      }
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment');
    }
  };

  const handleLike = async (commentId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/comments/${commentId}/like`, {
        method: 'POST'
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setComments(comments.map(c => c.id === commentId ? updatedComment : c));
      }
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  if (loading) return <div className="text-center py-8 text-cyan-400">Loading comments...</div>;

  return (
    <div className="mt-8 bg-slate-800 rounded-xl shadow-2xl border border-cyan-500 border-opacity-20 p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">💬</span>
        <h3 className="text-2xl font-black text-white">Comments & Discussion</h3>
      </div>

      {/* New Comment Form */}
      <div className="mb-6 p-5 bg-gradient-to-br from-blue-900 to-slate-700 rounded-lg border border-cyan-400 border-opacity-30">
        <label className="block text-cyan-300 font-semibold mb-2">Your Name</label>
        <input
          type="text"
          placeholder="Enter your name..."
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full p-3 border border-cyan-400 border-opacity-50 rounded-lg mb-4 bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        />
        <label className="block text-cyan-300 font-semibold mb-2">Your Thoughts</label>
        <p className="text-xs text-gray-400 mb-2">💡 Tip: Type @ to mention a user</p>
        <textarea
          placeholder="Share your thoughts about this forum... (Type @ to mention someone)"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            setShowMentions(e.target.value.includes('@'));
          }}
          className="w-full p-3 border border-cyan-400 border-opacity-50 rounded-lg mb-4 bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
          rows={3}
        />
        
        {/* Mention suggestions */}
        {showMentions && newComment.includes('@') && (
          <div className="mb-4 p-3 bg-slate-700 rounded-lg border border-cyan-400 border-opacity-40">
            <p className="text-xs text-cyan-300 mb-2 font-semibold">🔔 Mention someone:</p>
            <div className="flex flex-wrap gap-2">
              {mentionedUsers.map(user => (
                <button
                  key={user}
                  onClick={() => {
                    if (!newComment.includes(`@${user}`)) {
                      setNewComment(newComment + `@${user} `);
                    }
                  }}
                  className="px-3 py-1 bg-cyan-500 bg-opacity-20 text-cyan-300 rounded-full text-sm hover:bg-opacity-30 transition"
                >
                  @{user}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleAddComment}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105"
        >
          ✨ Post Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-l-4 border-cyan-500 pl-5 py-3 bg-gradient-to-r from-blue-900 to-slate-700 rounded-r-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-bold text-cyan-300 text-lg">{comment.author}</p>
                  <p className="text-gray-200 mt-2 leading-relaxed">{renderCommentWithMentions(comment.text)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition"
                >
                  ❤️ {comment.likes} Likes
                </button>
                <span className="text-xs text-gray-400">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
