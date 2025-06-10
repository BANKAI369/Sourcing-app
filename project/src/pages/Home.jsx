import React, { useState, useRef, useEffect } from 'react';
import VideoCard from '../components/VideoCard.jsx';
import { Shirt } from 'lucide-react';

const Home = ({ currentUser }) => {
  const [videos] = useState([
    {
      id: 1,
      user: {
        username: 'silk_artisan_mumbai',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true
      },
      video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      caption: 'Pure Banarasi silk weaving process! 🧵✨ #BanarasiSilk #HandWoven #TraditionalCrafts',
      likes: 2341,
      comments: 89,
      shares: 145,
      location: 'Varanasi, Uttar Pradesh'
    },
    {
      id: 2,
      user: {
        username: 'cotton_kings_rajasthan',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: false
      },
      video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      caption: 'Premium organic cotton from Gujarat farms 🌾 Perfect for summer wear! #OrganicCotton #SustainableFashion',
      likes: 1876,
      comments: 63,
      shares: 92,
      location: 'Ahmedabad, Gujarat'
    },
    {
      id: 3,
      user: {
        username: 'block_print_master',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true
      },
      video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/7679717/pexels-photo-7679717.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      caption: 'Hand block printing on pure cotton fabric 🎨 Traditional Rajasthani art at its finest! #BlockPrint #Rajasthani',
      likes: 3210,
      comments: 156,
      shares: 203,
      location: 'Jaipur, Rajasthan'
    },
    {
      id: 4,
      user: {
        username: 'khadi_collective',
        avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true
      },
      video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/7679719/pexels-photo-7679719.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      caption: 'Handspun Khadi making process 🧶 Supporting local artisans and sustainable fashion! #Khadi #MadeInIndia',
      likes: 1654,
      comments: 78,
      shares: 134,
      location: 'Pondicherry'
    }
  ]);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);
      if (newIndex !== currentVideoIndex && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentVideoIndex]);

  return (
    <div className="relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <Shirt className="w-6 h-6 text-orange-600" />
            <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              ClothSource
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">LIVE</span>
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory pt-16 pb-20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {videos.map((video, index) => (
          <div key={video.id} className="h-screen w-full snap-start relative">
            <VideoCard
              video={video}
              isActive={index === currentVideoIndex}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;