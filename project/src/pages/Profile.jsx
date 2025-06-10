import React, { useState } from 'react';
import { Settings, Grid, Play, Users, LogOut, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';

const Profile = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('posts');

  const userPosts = [
    {
      id: 1,
      thumbnail: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      views: '12.3K',
      isVideo: true
    },
    {
      id: 2,
      thumbnail: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      views: '8.7K',
      isVideo: true
    },
    {
      id: 3,
      thumbnail: 'https://images.pexels.com/photos/7679717/pexels-photo-7679717.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      views: '15.2K',
      isVideo: true
    },
    {
      id: 4,
      thumbnail: 'https://images.pexels.com/photos/7679719/pexels-photo-7679719.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      views: '6.4K',
      isVideo: true
    },
    {
      id: 5,
      thumbnail: 'https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      views: '9.8K',
      isVideo: true
    },
    {
      id: 6,
      thumbnail: 'https://images.pexels.com/photos/6069111/pexels-photo-6069111.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      views: '11.1K',
      isVideo: true
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-800">{currentUser.username}</h1>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200 text-red-600"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-24 h-24 rounded-full object-cover border-4 border-gradient-to-r from-orange-400 to-green-500"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-xl font-bold text-gray-800">{currentUser.fullName}</h2>
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="text-center">
                <div className="font-bold text-gray-800">{currentUser.posts}</div>
                <div className="text-xs text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">{currentUser.followers.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-800">{currentUser.following}</div>
                <div className="text-xs text-gray-500">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <p className="text-gray-800 mb-2">
            🧵 Textile & Fashion Enthusiast | Connecting Indian Artisans
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Showcasing the finest handwoven fabrics from across India 🇮🇳
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Mumbai, India</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Joined March 2023</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <LinkIcon className="w-4 h-4 text-blue-500" />
            <a href="#" className="text-blue-500 text-sm hover:underline">
              www.clothsourceindia.com
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-6">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all duration-200">
            Edit Profile
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            <Users className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 flex items-center justify-center space-x-1 border-b-2 transition-colors duration-200 ${
              activeTab === 'posts'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="font-medium">Posts</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 py-3 flex items-center justify-center space-x-1 border-b-2 transition-colors duration-200 ${
              activeTab === 'videos'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            <Play className="w-5 h-5" />
            <span className="font-medium">Videos</span>
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 px-4">
        {userPosts.map((post) => (
          <div key={post.id} className="relative aspect-square">
            <img
              src={post.thumbnail}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover rounded-lg"
            />
            {post.isVideo && (
              <div className="absolute top-2 right-2">
                <Play className="w-4 h-4 text-white\" fill="white" />
              </div>
            )}
            <div className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
              {post.views}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;