import React, { useState, useRef } from 'react';
import { Upload, Video, Camera, X, MapPin, Hash, Users } from 'lucide-react';

const VideoUpload = ({ currentUser }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !caption.trim()) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Reset form
          setSelectedFile(null);
          setCaption('');
          setLocation('');
          setTags('');
          // Show success message or redirect
          alert('Video uploaded successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-800">Share Your Content</h1>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !caption.trim() || isUploading}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
              selectedFile && caption.trim() && !isUploading
                ? 'bg-gradient-to-r from-orange-500 to-green-600 text-white hover:from-orange-600 hover:to-green-700 transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Share'}
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-6 bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-800">Uploading your video...</span>
              <span className="text-sm text-orange-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* User Info */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{currentUser.fullName}</h3>
            <p className="text-sm text-gray-500">@{currentUser.username}</p>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="mb-6">
          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload a video</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Share your clothing and material sourcing content
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Upload className="w-4 h-4" />
                      <span>MP4, MOV up to 100MB</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Camera className="w-4 h-4" />
                      <span>Max 60 seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative bg-gray-100 rounded-2xl p-4">
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 truncate">{selectedFile.name}</h4>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Caption */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption for your video... Use #hashtags to reach more people!"
            className="w-full h-24 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Hash className="w-4 h-4" />
              <span>Add hashtags to increase visibility</span>
            </div>
            <span className="text-sm text-gray-400">{caption.length}/500</span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location (Optional)
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location (e.g., Mumbai, India)"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Optional)
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="silk, cotton, handwoven, traditional"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
        </div>

        {/* Privacy Settings */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Who can see this post?
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="privacy"
                value="public"
                defaultChecked
                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              />
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-800">Everyone</div>
                  <div className="text-sm text-gray-500">Anyone can see your post</div>
                </div>
              </div>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="privacy"
                value="friends"
                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              />
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-800">Friends only</div>
                  <div className="text-sm text-gray-500">Only people you follow can see</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Community Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Focus on clothing, textiles, and fashion content</li>
            <li>• Give credit to artisans and craftspeople</li>
            <li>• Be respectful and supportive of the community</li>
            <li>• Use appropriate hashtags for better discovery</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;