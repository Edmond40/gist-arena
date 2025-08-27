import React from 'react';
import { Facebook, Twitter, Linkedin, MessageCircle, Copy, Check, GripVertical, Youtube } from 'lucide-react';
import { PostsAPI } from '../lib/api';

const SocialShareButtons = ({ isOpen, setIsOpen, article, copied, setCopied, onShared }) => {
  const shareUrl = window.location.href;
  const shareText = `${article.title} - Read more on Gist Arena`;
  
  const notifyShare = async () => {
    if (!article?.id) return;
    try { await PostsAPI.share(article.id); } catch { void 0; }
    try { if (typeof onShared === 'function') onShared(); } catch { /* noop */ }
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    notifyShare();
  };
  
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    notifyShare();
  };
  
  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    notifyShare();
  };
  
  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    notifyShare();
  };
  
  const shareToYouTube = () => {
    window.open(`https://www.youtube.com/upload?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    notifyShare();
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      notifyShare();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className='flex mb-3 relative z-10' data-aos="fade-down">
      <GripVertical 
        size={35} 
        className={`${isOpen ? 'rotate-180' : 'scale-90'} absolute z-10 text-white md:top-60 top-50 left-2 bg-blue-400 rounded-full p-1 duration-300 cursor-pointer animate-pulse`} 
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={`${isOpen ? 'translate-x-10' : 'scale-50'} absolute lg:top-50 left-0 md:top-60 top-50 duration-500`}>
        {isOpen && (
          <div className="w-7 flex flex-col gap-3">
            <button onClick={shareToYouTube} title="Share on YouTube">
              <Youtube size={40} className="bg-red-600 text-white hover:bg-red-700 hover:scale-110 duration-300 p-1"/>
            </button>
            <button onClick={shareToFacebook} title="Share on Facebook">
              <Facebook size={40} className="bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 duration-300 p-1"/>
            </button>
            <button onClick={shareToTwitter} title="Share on Twitter">
              <Twitter size={40} className="bg-blue-400 text-white hover:bg-blue-500 hover:scale-110 duration-300 p-1"/>
            </button>
            <button onClick={shareToLinkedIn} title="Share on LinkedIn">
              <Linkedin size={40} className="bg-blue-700 text-white hover:bg-blue-800 hover:scale-110 duration-300 p-1"/>
            </button>
            <button onClick={shareToWhatsApp} title="Share on WhatsApp">
              <MessageCircle size={40} className="bg-green-500 text-white hover:bg-green-600 hover:scale-110 duration-300 p-1"/>
            </button>
            <button onClick={copyToClipboard} title="Copy link">
              {copied ? 
                <Check size={40} className="bg-green-500 text-white p-1"/> : 
                <Copy size={40} className="bg-gray-500 text-white hover:bg-gray-600 hover:scale-110 duration-300 p-1"/>
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialShareButtons;
