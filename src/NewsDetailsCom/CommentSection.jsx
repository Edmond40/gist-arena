import React from 'react';
import { Heart } from 'lucide-react';

const CommentSection = () => {
  return (
    <div className="md:w-[80%] mx-auto mt-8">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl font-bold text-gray-800">Comments</h3>
        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">12</span>
      </div>
      
      {/* Comment Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            U
          </div>
          <div className="flex-1">
            <textarea 
              placeholder="Share your thoughts..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              rows="3"
            ></textarea>
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-gray-700 text-sm">😊</button>
                <button className="text-gray-500 hover:text-gray-700 text-sm">📷</button>
                <button className="text-gray-500 hover:text-gray-700 text-sm">🔗</button>
              </div>
              <button className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments List */}
      <div className="space-y-4">
        {/* Comment 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-800">Kwame Asante</h4>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </div>
              <p className="text-gray-700 mb-3">
                This is a very insightful article. The analysis of the current situation is spot on. Looking forward to more updates on this topic.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <button className="text-gray-500 hover:text-red-500 flex items-center gap-1">
                  <Heart size={14} />
                  <span>5</span>
                </button>
                <button className="text-gray-500 hover:text-blue-500">Reply</button>
                <button className="text-gray-500 hover:text-gray-700">Share</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comment 2 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-800">Ama Osei</h4>
                <span className="text-gray-500 text-sm">1 hour ago</span>
              </div>
              <p className="text-gray-700 mb-3">
                I appreciate the detailed coverage. However, I think there are some aspects that could have been explored further. Great work overall!
              </p>
              <div className="flex items-center gap-4 text-sm">
                <button className="text-gray-500 hover:text-red-500 flex items-center gap-1">
                  <Heart size={14} />
                  <span>3</span>
                </button>
                <button className="text-gray-500 hover:text-blue-500">Reply</button>
                <button className="text-gray-500 hover:text-gray-700">Share</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comment 3 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              E
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-800">Efua Mensah</h4>
                <span className="text-gray-500 text-sm">30 minutes ago</span>
              </div>
              <p className="text-gray-700 mb-3">
                Excellent reporting! This kind of journalism is exactly what we need in Ghana. Keep up the good work! 🇬🇭
              </p>
              <div className="flex items-center gap-4 text-sm">
                <button className="text-gray-500 hover:text-red-500 flex items-center gap-1">
                  <Heart size={14} />
                  <span>8</span>
                </button>
                <button className="text-gray-500 hover:text-blue-500">Reply</button>
                <button className="text-gray-500 hover:text-gray-700">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Load More Comments */}
      <div className="text-center mt-6">
        <button className="text-blue-600 hover:text-blue-800 font-medium underline">
          Load More Comments
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
