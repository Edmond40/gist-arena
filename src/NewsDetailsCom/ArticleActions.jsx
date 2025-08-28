import React from 'react';
import { Heart, Bookmark, Printer, Mail, Eye, Share2, Clock } from 'lucide-react';

const ArticleActions = ({ 
  isLiked, 
  setIsLiked, 
  likeCount, 
  isBookmarked, 
  setIsBookmarked, 
  handlePrint, 
  setShowEmailModal, 
  viewCount, 
  article,
  shareCount,
}) => {
  const handleLike = () => {
    // Use the parent component's setIsLiked which handles API calls
    setIsLiked(!isLiked);
  };
  
  const handleBookmark = () => {
    // Use the parent component's setIsBookmarked which handles API calls
    setIsBookmarked(!isBookmarked);
  };

  const formattedUpdated = React.useMemo(() => {
    try {
      return article?.updatedAt ? new Date(article.updatedAt).toLocaleString() : '';
    } catch {
      return '';
    }
  }, [article?.updatedAt]);

  return (
    <>
      {/* Action Buttons */}
      <div className="md:flex grid grid-cols-4 md:justify-center items-center gap-4 mt-4">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 px-2 py-2 w-20 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          <span className="font-medium">{likeCount}</span>
        </button>
        
        <button 
          onClick={handleBookmark}
          className={`flex items-center gap-2 px-2 py-2 w-20 rounded-full transition-all duration-300 ${
            isBookmarked 
              ? 'bg-yellow-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600'
          }`}
        >
          <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
          <span className="font-medium">{isBookmarked ? 'Saved' : 'Save'}</span>
        </button>
        
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-2 py-2 w-20 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
        >
          <Printer size={20} />
          <span className="font-medium">Print</span>
        </button>
        
        <button 
          onClick={() => setShowEmailModal(true)}
          className="flex items-center gap-2 px-2 py-2 w-20 rounded-full bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
        >
          <Mail size={20} />
          <span className="font-medium">Email</span>
        </button>
      </div>
      
      {/* View Count and Share Stats */}
      <div className="md:flex grid grid-cols-1 md:justify-center items-center gap-4 mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Eye size={16} />
          <span>{viewCount.toLocaleString()} views</span>
        </div>
        <div className="flex items-center gap-1">
          <Share2 size={16} />
          <span>Shared {(shareCount ?? article?.shareCount ?? 0)} times</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>Updated {formattedUpdated || article?.date}</span>
        </div>
      </div>
    </>
  );
};

export default ArticleActions;
