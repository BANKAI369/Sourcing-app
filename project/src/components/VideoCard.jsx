import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, MoreVertical, Play, Pause, Volume2, VolumeX, MapPin, Verified } from 'lucide-react';

const VideoCard = ({ video, isActive, currentUser }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'fashion_lover23',
      text: 'This is absolutely beautiful! Where can I source this?',
      time: '2h'
    },
    {
      id: 2,
      user: 'textile_expert',
      text: 'Amazing quality! Traditional craftsmanship at its finest 👏',
      time: '1h'
    },
    {
      id: 3,
      user: 'artisan_supporter',
      text: 'Supporting local artisans is so important. Thank you for sharing! 🙏',
      time: '45m'
    }
  ]);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ClothSource India',
          text: video.caption,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const addComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: currentUser.username,
        text: comment,
        time: 'now'
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={video.thumbnail}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        
        {/* Play/Pause Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          {!isPlaying && (
            <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1\" fill="white" />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={toggleMute}
          className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
        <button className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
          <MoreVertical className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* User Info & Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={video.user.avatar}
            alt={video.user.username}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-white">@{video.user.username}</span>
              {video.user.verified && (
                <Verified className="w-4 h-4 text-blue-400" fill="currentColor" />
              )}
            </div>
            {video.location && (
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="w-3 h-3 text-gray-300" />
                <span className="text-sm text-gray-300">{video.location}</span>
              </div>
            )}
          </div>
          <button className="px-4 py-1 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
            Follow
          </button>
        </div>
        
        <p className="text-white text-sm mb-3 leading-relaxed">
          {video.caption}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 bottom-20 flex flex-col space-y-4">
        <button
          onClick={handleLike}
          className="flex flex-col items-center space-y-1"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${
            liked ? 'bg-red-500' : 'bg-black/50'
          }`}>
            <Heart
              className={`w-6 h-6 ${liked ? 'text-white' : 'text-white'}`}
              fill={liked ? 'white' : 'none'}
            />
          </div>
          <span className="text-white text-xs font-medium">
            {likeCount > 999 ? `${(likeCount / 1000).toFixed(1)}K` : likeCount}
          </span>
        </button>

        <button
          onClick={() => setShowComments(true)}
          className="flex flex-col items-center space-y-1"
        >
          <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{video.comments}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center space-y-1"
        >
          <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Share className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{video.shares}</span>
        </button>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="absolute inset-0 bg-black/80 flex items-end z-50">
          <div className="w-full bg-white rounded-t-3xl max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Comments</h3>
              <button
                onClick={() => setShowComments(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((commentItem) => (
                <div key={commentItem.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {commentItem.user[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{commentItem.user}</span>
                      <span className="text-gray-500 text-xs">{commentItem.time}</span>
                    </div>
                    <p className="text-gray-800 text-sm mt-1">{commentItem.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addComment()}
                  />
                  <button
                    onClick={addComment}
                    disabled={!comment.trim()}
                    className={`px-4 py-2 rounded-full font-semibold ${
                      comment.trim()
                        ? 'bg-gradient-to-r from-orange-500 to-green-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;